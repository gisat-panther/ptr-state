import ActionTypes from '../../../constants/ActionTypes';
import Select from '../../Select';
import {isObject as _isObject, isEmpty as _isEmpty} from 'lodash';

const actionTypes = ActionTypes.DATA.TIMESERIE;

/**
 * Ensure adding index and adding or updating received timeSerie data from BE.
 * @param {Object} timeSerieData
 * @param {Array} timeSerieData.index
 * @param {Object} timeSerieData.timeSerieData
 * @param {Object} timeSerieDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for timeSerieDataFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Array?} start
 * @param {Array?} total
 * @param {string?} changedOn
 */
const receiveIndexed = (
	timeSerieData,
	timeSerieDataFilter,
	order,
	start,
	total,
	changedOn
) => {
	return actionAddDataAndIndex(
		timeSerieDataFilter,
		order,
		total,
		start,
		timeSerieData.index,
		timeSerieData.timeSerieData,
		changedOn
	);
};

/**
 * Create new index with loading indicator based on pagination.
 * @param {Object} pagination
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, featureKeys, dataSourceKeys or spatialFilter
 * @param {Array?} order
 */
function addLoadingIndex(pagination, filter, order) {
	return (dispatch, getState) => {
		// Fake new data object for common action of size same like pagination.limit
		// Action "common.addIndex" needs array of data objects with key to create new index.
		// "data" is a Array of the minimal data for construct index in common actoin.
		// Use key = true as a loading identificator
		const data = new Array(pagination.limit).fill({key: true});
		const changedOn = null;

		//get index
		const timeSerieDataIndex =
			Select.data.timeSerie.getIndex_recompute(filter, order) || {};

		if (!_isEmpty(timeSerieDataIndex)) {
			//some index exist
			const firstEntry =
				timeSerieDataIndex?.index[Object.keys(timeSerieDataIndex.index)[0]];

			if (_isObject(firstEntry)) {
				//if first entry is object, then index is structurized by tsDSkeys
				// add loading indicator to each tsDSkey in index
				return actionAddTimeSerieIndexPerEachDS(
					filter,
					order,
					data,
					pagination.offset + 1,
					null,
					changedOn
				);
			} else {
				// index is still unstructuralized and reflects only loading state

				return actionAddIndex(
					filter,
					order,
					data,
					pagination.offset + 1,
					null,
					changedOn
				);
			}
		} else {
			//on index created yet
			return actionAddIndex(
				filter,
				order,
				data,
				pagination.offset + 1,
				null,
				changedOn
			);
		}
	};
}

// ============ actions ============

function actionAddTimeSerieIndexPerEachDS(
	filter,
	order,
	data,
	start,
	count,
	changedOn
) {
	return {
		type: actionTypes.INDEX.ADD_FOR_EACH_DS,
		filter,
		order,
		data,
		start,
		count,
		changedOn,
	};
}

function actionAddIndex(filter, order, data, start, count, changedOn) {
	return {
		type: actionTypes.INDEX.ADD,
		filter,
		order,
		data,
		start,
		count,
		changedOn,
	};
}

/**
 * @param {Object} timeSerieDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for timeSerieFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total For how many features data relates.
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 */
function actionAddDataAndIndex(
	timeSerieDataFilter,
	order,
	total,
	start,
	index,
	data,
	changedOn
) {
	return {
		type: actionTypes.ADD_WITH_INDEX,
		filter: timeSerieDataFilter,
		order,
		total,
		start,
		index,
		data,
		changedOn,
	};
}

// ============ export ===========

export default {
	addLoadingIndex,
	receiveIndexed,
};
