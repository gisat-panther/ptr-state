import {isPlainObject as _isPlainObject} from 'lodash';
import timelineSelectors from './selectors';
import common from '../../_common/selectors';

/**
 * TODO tests
 * For each layer defined in layerRow.items and its periods execute callback with parameters [layer, mapLayerDefinition, period||periodKey]
 * @param {Object} state
 * @param {Object} layerRow
 * @param {function} callback
 */
export const forEachPeriodAndLayerInLayerRow = (state, layerRow, callback) => {
	const activeKeys = common.getAllActiveKeys(state);
	layerRow?.items?.forEach(timelineLayer => {
		//iterate over layer periods defined in array
		if (timelineLayer?.periods?.length > 0) {
			timelineLayer?.periods.forEach(timelineLayerPeriodItem => {
				const timelineMapLayerDefinition =
					timelineSelectors.getTimelineMapLayerPeriodDefinition(
						timelineLayer.layerState,
						timelineLayerPeriodItem?.key,
						activeKeys
					);

				callback(
					timelineLayer,
					timelineMapLayerDefinition,
					timelineLayerPeriodItem
				);
			});
		} else if (_isPlainObject(timelineLayer?.periods)) {
			// iterate over layer periods defined by period filter
			const periodsConfig = timelineLayer.periods;
			// fixme
			// should be shared variable also for selector
			const order = null;
			const periodKeys =
				timelineSelectors.getPeriodKeysForFilteredSpatialRelations(
					state,
					periodsConfig.filter,
					order
				) || [];

			periodKeys.forEach(periodKey => {
				const timelineMapLayerDefinition =
					timelineSelectors.getTimelineMapLayerPeriodDefinition(
						timelineLayer.layerState,
						periodKey,
						activeKeys
					);

				callback(timelineLayer, timelineMapLayerDefinition, periodKey);
			});
		}
	});
};
