import {createSelector} from 'reselect';
import {isMatch as _isMatch, isEmpty as _isEmpty, isEmpty} from 'lodash';

import common from '../../_common/selectors';
import commonHelpers from '../../_common/helpers';
import mapsSelectors from '../../Maps/selectors';
import dataSpatialRelationsSelectors from '../../Data/SpatialRelations/selectors';

/**
 * Creates standartizet controlled map layer definition object.
 * @param {Object} timelineLayerState Map Layer definition that corresponds with deffinition for map
 * @param {string} timelineLayerOriginPeriodKey optional periodKey
 * @param {Object} activeKeys optional active app keys
 */
const getTimelineMapLayerPeriodDefinition = createSelector(
	[
		timelineLayerState => timelineLayerState,
		(timelineLayerState, timelineLayerOriginPeriodKey) =>
			timelineLayerOriginPeriodKey,
		(timelineLayerState, timelineLayerOriginPeriodKey, activeKeys) =>
			activeKeys,
	],
	(timelineLayerState, timelineLayerOriginPeriodKey, activeKeys = {}) => {
		const timelineMapLayerDefinition = {
			...(timelineLayerState?.key ? {key: timelineLayerState.key} : {}),
			...(timelineLayerOriginPeriodKey || timelineLayerState?.metadataModifiers
				? {
						metadataModifiers: commonHelpers.mergeFilters(
							activeKeys,
							timelineLayerState.filterByActive,
							{
								...(timelineLayerState?.metadataModifiers
									? timelineLayerState.metadataModifiers
									: {}),
							}
						),
				  }
				: {}),
			...(timelineLayerState?.layerTemplateKey
				? {layerTemplateKey: timelineLayerState.layerTemplateKey}
				: {}),
			...(timelineLayerState?.styleKey
				? {styleKey: timelineLayerState.styleKey}
				: {}),
		};

		// put original period to metadataModifiers
		if (timelineLayerOriginPeriodKey) {
			timelineMapLayerDefinition.metadataModifiers.periodKey =
				timelineLayerOriginPeriodKey;
		}

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
		common.getAllActiveKeys,
		(state, mapKey) => mapKey,
		(state, mapKey, timelineLayer) => timelineLayer,
		(state, mapKey, timelineLayer, timelineLayerPeriodItem) =>
			timelineLayerPeriodItem,
	],
	(activeKeys, mapKey, timelineLayer, timelineLayerPeriodItem) => {
		if (mapKey && timelineLayer && timelineLayerPeriodItem) {
			const mapLayers =
				mapsSelectors.getLayersStateWithMergedFiltersByMapKeyObserver(mapKey);

			const timelineMapLayerDefinition = getTimelineMapLayerPeriodDefinition(
				timelineLayer?.layerState,
				timelineLayerPeriodItem?.key,
				activeKeys
			);

			const mapLayer = mapLayers?.find(l =>
				_isMatch(l, timelineMapLayerDefinition)
			);
			if (mapLayer) {
				console.log('xxx mapLayer', mapLayer, timelineMapLayerDefinition);
			}
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
