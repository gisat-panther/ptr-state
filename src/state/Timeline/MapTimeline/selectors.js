import {createSelector} from 'reselect';
import {isMatch as _isMatch, isEmpty as _isEmpty} from 'lodash';

import mapsSelectors from '../../Maps/selectors';
import dataSpatialRelationsSelectors from '../../Data/SpatialRelations/selectors';

/**
 * Creates standartizet controlled map layer definition object.
 * @param {Object} timelineLayerState Map Layer definition that corresponds with deffinition for map
 * @param {string} timelineLayerOriginPeriodKey optional periodKey
 */
const getTimelineMapLayerPeriodDefinition = createSelector(
	[
		timelineLayerState => timelineLayerState,
		(timelineLayerState, timelineLayerOriginPeriodKey) =>
			timelineLayerOriginPeriodKey,
	],
	(timelineLayerState, timelineLayerOriginPeriodKey) => {
		const timelineMapLayerDefinition = {
			...(timelineLayerState?.key ? {key: timelineLayerState.key} : {}),
			...(timelineLayerOriginPeriodKey || timelineLayerState?.metadataModifiers
				? {
						metadataModifiers: {
							...(timelineLayerState?.metadataModifiers
								? timelineLayerState.metadataModifiers
								: {}),
							...(timelineLayerOriginPeriodKey
								? {periodKey: timelineLayerOriginPeriodKey}
								: {}),
						},
				  }
				: {}),
			...(timelineLayerState?.filterByActive
				? {filterByActive: timelineLayerState.filterByActive}
				: {}),
			...(timelineLayerState?.layerTemplateKey
				? {layerTemplateKey: timelineLayerState.layerTemplateKey}
				: {}),
			...(timelineLayerState?.styleKey
				? {styleKey: timelineLayerState.styleKey}
				: {}),
		};

		return timelineMapLayerDefinition;
	}
);

/**
 * Find corresponding map layer by timeline layer definition.
 * @param {string} mapKey
 * @param {Object} timelineLayer
 * @param {Object} timelineLayerPeriodItem
 * @returns {Object|null} Map layer definition if any exists in map
 */
const getMapLayerByTimelineLayerAndPeriod = createSelector(
	[
		mapKey => mapKey,
		(mapKey, timelineLayer) => timelineLayer,
		(mapKey, timelineLayer, timelineLayerPeriodItem) => timelineLayerPeriodItem,
	],
	(mapKey, timelineLayer, timelineLayerPeriodItem) => {
		if (mapKey && timelineLayer && timelineLayerPeriodItem) {
			// const mapLayers = mapsSelectors.getMapLayers(mapKey);
			const mapLayers = mapsSelectors.getLayersStateByMapKeyObserver(mapKey);

			const timelineMapLayerDefinition = getTimelineMapLayerPeriodDefinition(
				timelineLayer?.layerState,
				timelineLayerPeriodItem?.key
			);
			const mapLayer = mapLayers?.find(l =>
				_isMatch(l, timelineMapLayerDefinition)
			);

			return mapLayer;
		} else {
			return null;
		}
	}
);

/**
 * Find corresponding map layer by timeline layer definition. If layer does not exists, return false, else return true.
 * @param {string} mapKey
 * @param {Object} timelineLayer
 * @param {Object} timelineLayerPeriodItem
 * @returns {Boolean} Whether layer exists in map
 */
const getTimelineLayerPeriodActive = createSelector(
	[getMapLayerByTimelineLayerAndPeriod],
	mapLayer => {
		return !!mapLayer;
	}
);

const getPeriodKeysForFilteredSpatialRelations = createSelector(
	[
		dataSpatialRelationsSelectors.getIndex,
		dataSpatialRelationsSelectors.getAll,
		filter => filter,
		(filter, order) => order,
	],
	(spatialRelationsIndex, allSpatialRelations = [], filter, order) => {
		if (!_isEmpty(spatialRelationsIndex) && !_isEmpty(allSpatialRelations)) {
			const spatialRelationsKeysForLayer = Object.values(
				spatialRelationsIndex?.index
			);
			const spatialRelationsForLayer = allSpatialRelations.filter(r =>
				spatialRelationsKeysForLayer.includes(r?.key)
			);
			const periodKeysFromRelations = spatialRelationsForLayer
				?.map(r => r?.data?.periodKey)
				.filter(a => a);
			return periodKeysFromRelations;
		} else {
			return null;
		}
	}
);

export default {
	getTimelineLayerPeriodActive,
	getTimelineMapLayerPeriodDefinition,
	getMapLayerByTimelineLayerAndPeriod,
	getPeriodKeysForFilteredSpatialRelations,
};
