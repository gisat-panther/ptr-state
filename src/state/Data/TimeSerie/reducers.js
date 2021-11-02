import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import commonHelpers from '../../_common/helpers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
	byDataSourceKey: {},
};

/**
 * Transform timeSerie data to the index
 * @param {Object} data
 * @param {Number} start
 * @returns {Object} Index
 */
const getTimeSerieIndexFromData = (data = {}, start) => {
	const indexUpdate = {};
	for (const [dsKey, values] of Object.entries(data)) {
		indexUpdate[dsKey] = {};
		const valuesKeys = Object.keys(values);
		for (let i = 0; i < valuesKeys.length; i++) {
			indexUpdate[dsKey][i + start] = valuesKeys[i];
		}
	}
	return indexUpdate;
};

/**
 * Add data and index in one step to save more mutating state
 * @param state {Object}
 * @param data {Object} Object with data
 * @param filter {Array}
 * @param order {Array}
 * @param start {Array}
 * @param total {Array}
 * @param changedOn {string}
 * @return {Object} state
 */
const addWithIndex = (state, data, filter, order, start, total, changedOn) => {
	// TODO test commonHelpers.getUpdatedByDataSourceKey properly
	const byDataSourceKey = commonHelpers.getUpdatedByDataSourceKey(
		state.byDataSourceKey,
		data
	);

	const indexUpdate = getTimeSerieIndexFromData(data, start);
	const stateWithUpdatedIndexes = commonHelpers.getUpdatedIndexesByKeys(
		state,
		filter,
		order,
		indexUpdate,
		changedOn,
		total,
		'timeSerieIndexes'
	);

	return {...state, byDataSourceKey, timeSerieIndexes: stateWithUpdatedIndexes};
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.filter
 * @param {Array} action.order
 * @param {Object} action.data Index update
 * @param {String} action.changedOn
 * @param {Number} action.total
 * @returns {Object} state
 */
const addTimeSerieIndexPerEachDS = (state, action) => {
	const stateWithUpdatedIndexes = commonHelpers.getUpdatedIndexesByKeys(
		state,
		action.filter,
		action.order,
		action.data,
		action.changedOn,
		action.total,
		'timeSerieIndexes'
	);
	return {...state, timeSerieIndexes: stateWithUpdatedIndexes};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.TIMESERIE.ADD_WITH_INDEX:
			return addWithIndex(
				state,
				action.data,
				action.filter,
				action.order,
				action.start,
				action.total,
				action.changedOn
			);
		case ActionTypes.DATA.TIMESERIE.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS:
			return addTimeSerieIndexPerEachDS(state, action);
		default:
			return state;
	}
};
