import {createSelector} from 'reselect';
import {createSelector as createRecomputeSelector} from '@jvitela/recompute';
import {isMatch as _isMatch, isEmpty as _isEmpty} from 'lodash';

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
			...(timelineLayerState?.layerKey
				? {layerKey: timelineLayerState.layerKey}
				: {}),
			...(timelineLayerOriginPeriodKey || timelineLayerState?.metadataModifiers
				? {
						metadataModifiers: commonHelpers.mergeFilters(
							activeKeys,
							timelineLayerState.filterByActive || {},
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

		if (_isEmpty(timelineMapLayerDefinition.metadataModifiers)) {
			timelineMapLayerDefinition.metadataModifiers = {};
		}

		// put original period to metadataModifiers
		if (timelineLayerOriginPeriodKey) {
			timelineMapLayerDefinition.metadataModifiers.periodKey =
				timelineLayerOriginPeriodKey;
		}

		if (_isEmpty(timelineMapLayerDefinition.metadataModifiers)) {
			delete timelineMapLayerDefinition.metadataModifiers;
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
const getMapLayerByTimelineLayerAndPeriod = createRecomputeSelector(
	(mapKey, timelineLayer, timelineLayerPeriodItem) => {
		if (mapKey && timelineLayer && timelineLayerPeriodItem) {
			const activeKeys = common.getAllActiveKeysObserver();
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
const getTimelineLayerPeriodActive = createRecomputeSelector(
	(mapKey, timelineLayer, timelineLayerPeriodItem) => {
		const mapLayer = getMapLayerByTimelineLayerAndPeriod(
			mapKey,
			timelineLayer,
			timelineLayerPeriodItem
		);
		return !!mapLayer;
	}
);

const getPeriodKeysForFilteredSpatialRelations = createSelector(
	[dataSpatialRelationsSelectors.getIndexed],
	spatialRelationsIndex => {
		if (!_isEmpty(spatialRelationsIndex)) {
			const periodKeysFromRelations = spatialRelationsIndex
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
