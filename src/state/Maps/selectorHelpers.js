import createCachedSelector from 're-reselect';
import _ from 'lodash';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import {mapConstants} from '@gisatcz/ptr-core';
import {grid} from '@gisatcz/ptr-tile-grid';

/* === HELPERS ======================================================================= */

/**
 * Get background layer in 'layer' format
 */
const getBackgroundLayerAsLayer = createCachedSelector(
	[backgroundLayer => backgroundLayer],
	backgroundLayer => {
		if (backgroundLayer) {
			return {...backgroundLayer, key: 'pantherBackgroundLayer'};
		} else {
			return null;
		}
	}
)(backgroundLayer => JSON.stringify(backgroundLayer));

/**
 * Merge background layer definition with layers to one collection
 */
const mergeBackgroundLayerWithLayers = createCachedSelector(
	[
		backgroundLayer => getBackgroundLayerAsLayer(backgroundLayer),
		(backgroundLayer, layers) => layers,
	],
	(backgroundLayer, layers) => {
		let finalLayers = layers || [];

		if (backgroundLayer) {
			finalLayers = [backgroundLayer, ...finalLayers];
		}

		return finalLayers.length ? finalLayers : null;
	}
)(
	(backgroundLayer, layers) =>
		`${JSON.stringify(backgroundLayer)}_${JSON.stringify(layers)}`
);

/**
 * Merge given modifiers with layer's modifiers & given filterByActive with layer's filter by active and add it to the layer state
 *
 * @param layers {Object} layers state
 * @param metadataModifiers {Object} modifiers like scopeKey, placeKey
 * @param filterByActive {{scope: bool, place: bool, period: bool,  scenario: bool, case: bool}}
 * @return {Object} Final layer state definition
 */
const mergeModifiersAndFilterByActiveToLayerStructure = (
	layers,
	metadataModifiers,
	filterByActive
) => {
	return layers.map(layer => {
		let layerMetadataModifiers =
			layer.metadataModifiers && metadataModifiers
				? {...metadataModifiers, ...layer.metadataModifiers}
				: metadataModifiers || layer.metadataModifiers || null;
		let layerFilterByActive =
			layer.filterByActive && filterByActive
				? {...filterByActive, ...layer.filterByActive}
				: filterByActive || layer.filterByActive || null;

		return {
			...layer,
			metadataModifiers: layerMetadataModifiers,
			filterByActive: layerFilterByActive,
		};
	});
};

/**
 * It returns merged view from map and associated map set based on synced params
 * @param map {Object}
 * @param set {Object}
 * @return {Object|unknown} final map view
 */
const getView = (map, set) => {
	if (map) {
		if (set) {
			let mapView = map.data?.view;

			// omit synced view params from map
			if (set.sync && !_.isEmpty(set.sync)) {
				mapView = _.omitBy(mapView, (viewValue, viewKey) => {
					return set.sync[viewKey];
				});
			}

			let mapSetView = set.data?.view;
			return mapUtils.view.mergeViews(
				mapConstants.defaultMapView,
				mapSetView,
				mapView
			);
		} else {
			let view = map.data?.view;
			return mapUtils.view.mergeViews(mapConstants.defaultMapView, view);
		}
	} else {
		return null;
	}
};

/**
 * It returns merged previous view from map and associated map set based on synced params
 * @param map {Object}
 * @param set {Object}
 * @return {Object|unknown} final map view
 */
const getPreviousView = (map, set) => {
	if (map) {
		if (set) {
			let mapPreviousView = map.data?.previousView;

			// omit synced view params from map
			if (set.sync && !_.isEmpty(set.sync)) {
				mapPreviousView = _.omitBy(mapPreviousView, (viewValue, viewKey) => {
					return set.sync[viewKey];
				});
			}

			let mapSetPreviousView = set.data?.previousView;
			return mapUtils.view.mergeViews(mapSetPreviousView, mapPreviousView);
		} else {
			return map.data?.previousView;
		}
	} else {
		return null;
	}
};

/**
 * Get zoom level of current view represented by mapWidth, mapHeight and boxRange.
 */
const getZoomLevel = createCachedSelector(
	[
		mapWidth => mapWidth,
		(mapWidth, mapHeight) => mapHeight,
		(mapWidth, mapHeight, boxRange) => boxRange,
	],
	(mapWidth, mapHeight, boxRange) => {
		const viewportRange = mapUtils.view.getMapViewportRange(
			mapWidth,
			mapHeight
		);
		const levelBoxRange = mapUtils.view.getNearestZoomLevelBoxRange(
			mapWidth,
			mapHeight,
			boxRange
		);
		return grid.getLevelByViewport(levelBoxRange, viewportRange);
	}
)((mapWidth, mapHeight, boxRange) => `${mapWidth}${mapHeight}${boxRange}`);

/**
 * Get tiles intersected by map extent.
 * Map extent is represented by mapWidth, mapHeight, center and boxRange.
 */
const getTiles = createCachedSelector(
	[
		mapWidth => mapWidth,
		(mapWidth, mapHeight) => mapHeight,
		(mapWidth, mapHeight, center) => center,
		(mapWidth, mapHeight, center, boxRange) => boxRange,
	],
	(mapWidth, mapHeight, center, boxRange) => {
		if (mapWidth && mapHeight && center && boxRange) {
			const levelBoxRange = mapUtils.view.getNearestZoomLevelBoxRange(
				mapWidth,
				mapHeight,
				boxRange
			);
			const tileGrid = grid.getTileGrid(
				mapWidth,
				mapHeight,
				levelBoxRange,
				center,
				true
			);
			return tileGrid.flat(1);
		} else {
			return null;
		}
	}
)(
	(mapWidth, mapHeight, center, boxRange) =>
		`${mapWidth}${mapHeight}${center?.lon}${center?.lat}${boxRange}`
);

export default {
	getBackgroundLayerAsLayer,
	getTiles,
	getPreviousView,
	getView,
	getZoomLevel,
	mergeBackgroundLayerWithLayers,
	mergeModifiersAndFilterByActiveToLayerStructure,
};
