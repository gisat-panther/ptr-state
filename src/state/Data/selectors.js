import {createSelector as createRecomputeSelector} from '@jvitela/recompute';
import {
	map as _map,
	forIn as _forIn,
	forEach as _forEach,
	isEmpty as _isEmpty,
} from 'lodash';
import stringify from 'fast-stringify';
import {CacheFifo} from '@gisatcz/ptr-utils';
import {utils} from '@gisatcz/ptr-tile-grid';

import attributeRelations from './AttributeRelations/selectors';
import attributeDataSources from './AttributeDataSources/selectors';
import attributeData from './AttributeData/selectors';
import components from './Components/selectors';
import spatialRelations from './SpatialRelations/selectors';
import spatialDataSources from './SpatialDataSources/selectors';
import spatialData from './SpatialData/selectors';
import {filterNearestTiles} from './helpers';
import {utils as tileGridUtils} from '@gisatcz/ptr-tile-grid';
import {recomputeSelectorOptions} from '../_common/recomputeHelpers';

let tilesCache = new CacheFifo(1000);

/**
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 */
const getFeatures = createRecomputeSelector(
	(dataSourceKey, fidColumnName, attributeDataSourceKeyAttributeKeyPairs) => {
		const data = spatialData.getByDataSourceKeyObserver(dataSourceKey);
		let attributesByDataSourceKey = null;
		if (attributeDataSourceKeyAttributeKeyPairs) {
			attributesByDataSourceKey = attributeData.getDataByDataSourceKeys(
				Object.keys(attributeDataSourceKeyAttributeKeyPairs)
			);
		}

		if (data) {
			return _map(data, (feature, key) => {
				let properties = {
					[fidColumnName]: key, // TODO fix dependency on this in ptr-maps
				};

				if (attributesByDataSourceKey) {
					_forIn(
						attributesByDataSourceKey,
						(features, attributeDataSourceKey) => {
							const attributeValue = features[key];
							if (attributeValue !== undefined) {
								properties[
									attributeDataSourceKeyAttributeKeyPairs[
										attributeDataSourceKey
									]
								] = attributeValue;
							}
						}
					);
				}

				return {
					type: 'Feature',
					key,
					geometry: feature.geometry,
					properties,
				};
			});
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

/**
 * Assemble vector data for single tile
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param level {number}
 * @param tile {Array} tile definition point
 * @param spatialRelationsFilter {Object} getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} getAttributeRelationsFilterFromLayerState
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param styleKey {string} uuid
 * @param attributeDataFilter {Object} Filter object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {Object} populated tile (with feature's geometries and attributes)
 */
const getTile = createRecomputeSelector(
	(
		spatialDataSourceKey,
		fidColumnName,
		level,
		tile,
		spatialRelationsFilter,
		attributeRelationsFilter,
		attributeDataSourceKeyAttributeKeyPairs,
		styleKey,
		attributeDataFilter
	) => {
		// Get all data for given key. It caused performance issues when the data was passed as a parameter
		const spatialDataForDataSource =
			spatialData.getByDataSourceKeyObserver(spatialDataSourceKey);

		if (spatialDataForDataSource) {
			const tileString = tileGridUtils.tileAsString(tile);
			const cacheParams = {
				attributeRelationsFilter,
				attributeDataFilter,
				spatialRelationsFilter,
				level,
				tileString,
				spatialDataSourceKey,
				styleKey,
			};
			const indexedFeatureKeys = spatialData.getIndexedFeatureKeys(
				spatialRelationsFilter,
				level,
				tileString,
				spatialDataSourceKey
			);
			const indexedFeatureKeysByAttributeDataSourceKeys =
				attributeData.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
					attributeDataFilter,
					level,
					tileString
				);
			const cacheKey = stringify({
				cacheParams,
				indexedFeatureKeys,
				indexedFeatureKeysByAttributeDataSourceKeys,
			});
			const cache = tilesCache.findByKey(cacheKey);
			if (cache) {
				return cache.data;
			} else {
				if (indexedFeatureKeys?.length) {
					let features = [];

					indexedFeatureKeys.forEach(key => {
						let properties = {
							[fidColumnName]: key,
						};

						// TODO what if some geometries is missing
						const geometry =
							spatialDataForDataSource[key]?.geometry ||
							spatialDataForDataSource[key]?.geometries?.[level];

						if (attributeDataSourceKeyAttributeKeyPairs) {
							const attributes =
								attributeData.getAttributesByDataSourceKeysForFeatureKey(
									attributeDataSourceKeyAttributeKeyPairs,
									key
								);
							if (attributes) {
								properties = {...properties, ...attributes};
							}
						}

						if (geometry) {
							features.push({
								type: 'Feature',
								key,
								geometry,
								properties,
							});
						}
					});

					const data = {
						features: features.length ? features : null,
						tile: tileString,
						level,
					};

					tilesCache.addOrUpdate({
						cacheKey,
						data,
					});

					return data;
				} else {
					return null;
				}
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

/**
 * Assemble vector data for all tiles
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param level {number}
 * @param previousLevel {number}
 * @param tiles {Array} list of tiles definition points
 * @param spatialRelationsFilter {Object} getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} getAttributeRelationsFilterFromLayerState
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param styleKey {string} uuid
 * @param attributeDataFilter {Object} Filter object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {Array} a collection of populated tiles (with feature's geometries and attributes)
 */
const getTiles = createRecomputeSelector(
	(
		dataSourceKey,
		fidColumnName,
		level,
		previousLevel,
		tiles,
		spatialRelationsFilter,
		attributeRelationsFilter,
		attributeDataSourceKeyAttributeKeyPairs,
		styleKey,
		attributeDataFilter
	) => {
		if (tiles?.length) {
			let populatedTiles = [];
			let previousPopulatedTiles = [];
			const missingTiles = [];

			_forEach(tiles, tile => {
				const populatedTile = getTile(
					dataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				);
				if (populatedTile) {
					populatedTiles.push(populatedTile);
				} else {
					missingTiles.push(tile);
				}
			});

			if (missingTiles.length > 0) {
				const index = spatialData.getIndex_recompute(
					spatialRelationsFilter,
					null
				);
				const loadedIndex = index.index || {};
				const loaded = {};
				for (const [level, tilesData] of Object.entries(loadedIndex)) {
					const loadedTileKeys = [];
					for (const [tileKey, tileData] of Object.entries(tilesData)) {
						if (tileData !== true) {
							loadedTileKeys.push(tileKey);
						}
					}
					loaded[level] = loadedTileKeys;
				}
				const loadedHigher =
					utils.getLoadedTiles(level, missingTiles, loaded, 'HIGHER', 25) || {};
				const loadedLower =
					utils.getLoadedTiles(level, missingTiles, loaded, 'LOWER', 3) || {};

				if (!_isEmpty(loadedHigher) || !_isEmpty(loadedLower)) {
					const preferedLevelsDirection =
						level < previousLevel ? 'HIGHER' : 'LOWER';
					const uniqueByLevels = filterNearestTiles(
						level,
						loadedHigher,
						loadedLower,
						preferedLevelsDirection
					);

					for (const [, tileData] of Object.entries(uniqueByLevels)) {
						for (const tile of [...tileData.tiles]) {
							if (
								!previousPopulatedTiles.some(
									t =>
										t.tile === tile &&
										t.level === Number.parseInt(tileData.level)
								)
							) {
								const previousPopulatedTile = getTile(
									dataSourceKey,
									fidColumnName,
									Number.parseInt(tileData.level),
									tile,
									spatialRelationsFilter,
									attributeRelationsFilter,
									attributeDataSourceKeyAttributeKeyPairs,
									styleKey,
									attributeDataFilter
								);
								if (previousPopulatedTile) {
									previousPopulatedTiles.push(previousPopulatedTile);
								}
							}
						}
					}
				}
			}

			if (populatedTiles.length && previousPopulatedTiles.length) {
				return [...previousPopulatedTiles, ...populatedTiles];
			} else if (populatedTiles.length) {
				return populatedTiles;
			} else if (previousPopulatedTiles.length) {
				return previousPopulatedTiles;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

export default {
	getFeatures,
	getTile,
	getTiles,

	attributeData,
	attributeDataSources,
	attributeRelations,
	components,
	spatialData,
	spatialDataSources,
	spatialRelations,
};
