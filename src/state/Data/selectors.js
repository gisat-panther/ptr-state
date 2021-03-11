import {createSelector as createRecomputeSelector} from '@jvitela/recompute';
import _ from 'lodash';
import stringify from 'fast-stringify';

import attributeRelations from './AttributeRelations/selectors';
import attributeDataSources from './AttributeDataSources/selectors';
import attributeData from './AttributeData/selectors';
import components from './Components/selectors';
import spatialRelations from './SpatialRelations/selectors';
import spatialDataSources from './SpatialDataSources/selectors';
import spatialData from './SpatialData/selectors';
import {CacheFifo} from '@gisatcz/ptr-utils';
import {tileAsString} from './helpers';
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
			return _.map(data, (feature, key) => {
				let properties = {
					[fidColumnName]: key, // TODO fix dependency on this in ptr-maps
				};

				if (attributesByDataSourceKey) {
					_.forIn(
						attributesByDataSourceKey,
						(features, attributeDataSourceKey) => {
							const attributeValue = features[key];
							if (attributeValue) {
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
		const spatialDataForDataSource = spatialData.getByDataSourceKeyObserver(
			spatialDataSourceKey
		);

		if (spatialDataForDataSource) {
			const tileString = tileAsString(tile);
			const cacheParams = {
				attributeRelationsFilter,
				attributeDataFilter,
				spatialRelationsFilter,
				level,
				tileAsString: tileString,
				spatialDataSourceKey,
				styleKey,
			};
			const indexedFeatureKeys = spatialData.getIndexedFeatureKeys(
				spatialRelationsFilter,
				level,
				tileString,
				spatialDataSourceKey
			);
			const indexedFeatureKeysByAttributeDataSourceKeys = attributeData.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
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
							const attributes = attributeData.getAttributesByDataSourceKeysForFeatureKey(
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
		tiles,
		spatialRelationsFilter,
		attributeRelationsFilter,
		attributeDataSourceKeyAttributeKeyPairs,
		styleKey,
		attributeDataFilter
	) => {
		if (tiles?.length) {
			let populatedTiles = [];
			_.forEach(tiles, tile => {
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
				}
			});
			return populatedTiles.length ? populatedTiles : null;
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
