import {utils} from '@gisatcz/ptr-utils';
import {isMatch as _isMatch} from 'lodash';
import {forEachPeriodAndLayerInLayerRow} from './helpers';
import mapTimelineSelectors from './selectors';
import mapsSelectors from '../../Maps/selectors';
import commonSelectors from '../../_common/selectors';
import mapsActions from '../../Maps/actions';
import periodsActions from '../../Periods/actions';
import dataSpatialRelationsActions from '../../Data/SpatialRelations/actions';
// ============ creators ===========

/**
 * Remove all map layers  defined in timeline layerRow
 * @param {string} mapKey
 * @param {Object} layerRow LayerRow definition
 * @returns
 */
const removeLayerRow = (mapKey, layerRow) => {
	return (dispatch, getState) => {
		const state = getState();
		const mapLayers = mapsSelectors.getLayersStateByMapKey(state, mapKey);

		const removeLayerIfInMap = (
			timelineLayer,
			timelineMapLayerDefinition,
			period
		) => {
			const mapLayer = mapLayers?.find(l =>
				_isMatch(l, timelineMapLayerDefinition)
			);
			const isInMap = !!mapLayer;

			if (isInMap) {
				dispatch(
					mapsActions.removeMapLayersByFilter(
						mapKey,
						timelineMapLayerDefinition
					)
				);
			}
		};

		forEachPeriodAndLayerInLayerRow(state, layerRow, removeLayerIfInMap);
	};
};

/**
 * Change layer state in map state depends on defined behavior on layerRow.
 * Each layerRow in MapTimeline could have defined how or if layer state in Map should be controlled.
 * If layerRow.controlMapState is false, then nothing happens on click.
 * If layerRow.controlMapState is true, then layer visibility in map is changing on each click.
 * If layerRow.controlMapState is 'toggle', only one layer in row could be in Map. So other layers are removed.
 *
 * Separate property "layerRow.allowNonActiveLayer" define if it is possible to remove all layers from row.
 *
 * @param {Object} timelineLayerPeriodItem Timeline period with data about origin period.
 * @param {Object} timelineLayer Timeline Layer definition
 * @param {string} mapKey
 * @param {Object} layerRow MapTimeline row definition
 * @param {Array} layers Timeline Layers definitions
 * @returns
 */
const toggleTimelineLayer = (
	timelineLayerPeriodItem,
	timelineLayer,
	mapKey,
	layerRow,
	layers
) => {
	return (dispatch, getState) => {
		const state = getState();
		const activeKeys = commonSelectors.getAllActiveKeys(state);
		const period = {
			...(timelineLayerPeriodItem?.origin?.originPeriod
				? {key: timelineLayerPeriodItem?.origin?.originPeriod?.key}
				: {}),
		};
		const timelineMapLayerDefinition =
			mapTimelineSelectors.getTimelineMapLayerPeriodDefinition(
				timelineLayer?.layerState,
				period?.key,
				activeKeys
			);
		const mapLayer = mapTimelineSelectors.getMapLayerByTimelineLayerAndPeriod(
			state,
			mapKey,
			timelineLayer,
			period
		);
		const isInMap = !!mapLayer;
		const mapLayers = mapsSelectors.getLayersStateByMapKey(state, mapKey);

		const expectedLayerZIndex = timelineLayer.mapZIndex;

		const newLayerZIndex = getMapZIndexForLayer(
			state,
			mapLayers,
			layers,
			expectedLayerZIndex
		);

		if (layerRow.controlMapState === false) {
			return;
		} else if (layerRow.controlMapState === 'toggle') {
			if (isInMap) {
				// click on active layer
				const preventRemoveLayer = layerRow.allowNonActiveLayer === false;
				if (!preventRemoveLayer) {
					dispatch(removeLayerRow(mapKey, layerRow));
				}
			} else {
				// click on non-active layer
				dispatch(removeLayerRow(mapKey, layerRow));
				dispatch(
					mapsActions.addMapLayerToIndex(
						mapKey,
						{
							...timelineLayer.layerState,
							...timelineMapLayerDefinition,
							key: utils.uuid(),
						},
						newLayerZIndex
					)
				);
			}
		} else if (layerRow.controlMapState === true) {
			if (isInMap) {
				const layerIsLastInMap =
					getActiveLayersCountInRow(state, mapKey, layerRow) === 1;
				const preventRemoveLayer =
					layerRow.allowNonActiveLayer === false && layerIsLastInMap;
				if (!preventRemoveLayer) {
					dispatch(
						mapsActions.removeMapLayersByFilter(
							mapKey,
							timelineMapLayerDefinition
						)
					);
				}
			} else {
				dispatch(
					mapsActions.addMapLayerToIndex(
						mapKey,
						{
							...timelineLayer.layerState,
							...timelineMapLayerDefinition,
							key: utils.uuid(),
						},
						newLayerZIndex
					)
				);
			}
		} else {
			return;
		}
	};
};

/**
 * Ensure spatialRelation and all linked periods by filter.
 * @param {Object} filterByActive
 * @param {Object} filter
 * @param {Array} order
 * @param {Number} start
 * @param {Number} length
 * @returns
 */
const useRelationsForLayerRowItem = (
	filterByActive,
	filter,
	order,
	start,
	length
) => {
	return (dispatch, getState) => {
		// TODO
		// compose filter by merging filterByActive and filter
		dispatch(
			dataSpatialRelationsActions.ensureIndexed(filter, order, start, length)
		).then(() => {
			const periodKeysFromRelations =
				mapTimelineSelectors.getPeriodKeysForFilteredSpatialRelations(
					getState(),
					filter,
					order
				);
			dispatch(periodsActions.useKeys(periodKeysFromRelations));
		});
	};
};

// ============ actions ===========

// ============ helpers ===========

/**
 * Calculate all layers that are in the map from given layerRow definition and mapKey.
 * @param {Object} state
 * @param {string} mapKey
 * @param {Object} layerRow
 * @returns
 */
function getActiveLayersCountInRow(state, mapKey, layerRow) {
	const mapLayers = mapsSelectors.getLayersStateByMapKey(state, mapKey);
	let activeLayers = 0;

	const countActiveLayer = (
		timelineLayer,
		timelineMapLayerDefinition,
		period
	) => {
		const mapLayer = mapLayers?.find(l =>
			_isMatch(l, timelineMapLayerDefinition)
		);

		const isInMap = !!mapLayer;

		if (isInMap) {
			activeLayers++;
		}
	};

	forEachPeriodAndLayerInLayerRow(state, layerRow, countActiveLayer);

	return activeLayers;
}

/**
 * Calculate new map zIndex on the base of wanted "expectedLayerZIndex" which respects layers in map and theirs "expectedLayerZIndex".
 * Compare map layers and theirs "expectedLayerZIndex" with wanted "expectedLayerZIndex".
 * @param {Object} state
 * @param {Array} mapLayers Map Layers definitions
 * @param {Array} timelineLayers Timeline Layers definitions
 * @param {Number} expectedLayerZIndex ZIndex value defined external of map. This value define wanted zIndex due to rest of layers in timeline.
 * @returns
 */
function getMapZIndexForLayer(
	state,
	mapLayers = [],
	timelineLayers = [],
	expectedLayerZIndex
) {
	const indexes = new Set();

	const findMapLayerIndexes = (
		timelineLayer,
		timelineMapLayerDefinition,
		timelineLayerPeriodItem
	) => {
		const mapLayer = mapLayers?.find(l =>
			_isMatch(l, timelineMapLayerDefinition)
		);
		const isInMap = !!mapLayer;

		if (isInMap) {
			indexes.add(timelineLayer?.mapZIndex);
		}
	};

	timelineLayers.forEach(timelineLayerRow => {
		forEachPeriodAndLayerInLayerRow(
			state,
			timelineLayerRow,
			findMapLayerIndexes
		);
	});

	const lowerIndexesArr = [...indexes]
		.sort((a, b) => a - b)
		.filter(i => i < expectedLayerZIndex);
	if (lowerIndexesArr.length === 0) {
		return 0;
	} else {
		return lowerIndexesArr.length;
	}
}

// ============ export ===========

export default {
	toggleTimelineLayer,
	useRelationsForLayerRowItem,
};
