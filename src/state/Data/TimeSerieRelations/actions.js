import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.TIMESERIE_RELATIONS;

const add = common.add(actionTypes);
const addIndex = common.addIndex(actionTypes);

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add relations to state only when timeSerieRelations received, in case of empty timeSerieRelations it adds only index.
 * @param {Array} timeSerieRelations Array received from BE contains timeSerieRelations.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 * @param {Number?} limit Limitation for loading relations
 */
function receiveIndexed(
	timeSerieRelations,
	filter,
	order,
	start,
	total,
	changedOn,
	limit
) {
	return dispatch => {
		// add timeSerieRelations to store
		if (timeSerieRelations.length) {
			dispatch(add(timeSerieRelations, filter));
		}

		// add to index
		dispatch(
			addIndex(
				filter,
				order,
				total,
				start,
				timeSerieRelations,
				changedOn,
				limit
			)
		);
	};
}

/**
 * Create new index with loading indicator based on pagination.
 * @param {Object} pagination
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for timeSerieDataFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 */
function addLoadingIndex(pagination, filter, order) {
	return dispatch => {
		const changedOn = null;

		// Fake new data object for common action of size same like pagination.limit
		// Action "common.addIndex" needs array of data objects with key to create new index.
		// "data" is a Array of the minimal data for construct index in common actoin.
		// Use key = true as a loading identificator
		const data = new Array(pagination.limit).fill({key: true});

		return dispatch(
			addIndex(filter, order, null, pagination.offset + 1, data, changedOn)
		);
	};
}

// ============ actions ============
// ============ export ===========

export default {
	addLoadingIndex,
	receiveIndexed,
};
