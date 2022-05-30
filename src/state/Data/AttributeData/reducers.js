import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import commonHelpers from '../../_common/helpers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
	byDataSourceKey: {},
};

/**
 * Add attribute data
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const add = (state, attributeDataSourceKey, data) => {
	if (attributeDataSourceKey && data) {
		return {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				[attributeDataSourceKey]: data,
			},
		};
	} else {
		return state;
	}
};

/**
 * Update attribute data for given data source
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const update = (state, attributeDataSourceKey, data) => {
	if (attributeDataSourceKey && data) {
		return {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				[attributeDataSourceKey]: state.byDataSourceKey[attributeDataSourceKey]
					? {...state.byDataSourceKey[attributeDataSourceKey], ...data}
					: data,
			},
		};
	} else {
		return state;
	}
};

/**
 * @param state {Object}
 * @param attributeDataSourceKey {string} uuid
 * @param data {Object} attribute data
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {Object}
 */
const addWithSpatialIndex = (
	state,
	attributeDataSourceKey,
	data,
	filter,
	order,
	indexData,
	changedOn
) => {
	const byDataSourceKey = {
		...state.byDataSourceKey,
		[attributeDataSourceKey]: state.byDataSourceKey[attributeDataSourceKey]
			? {
					...state.byDataSourceKey[attributeDataSourceKey],
					...data,
			  }
			: data,
	};

	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		filter,
		order,
		indexData,
		changedOn,
		'spatialIndexes'
	);

	return {...state, byDataSourceKey, spatialIndexes: updatedIndexes};
};

/**
 * Add data and index in one step to save more mutating state
 * @param state {Object}
 * @param index {Array} ordered index
 * @param data {Object} Object with data
 * @param filter {Array}
 * @param order {Array}
 * @param start {Array}
 * @param total {Array}
 * @param changedOn {string}
 * @param limit {Number} Limitation for loading data
 * @return {Object}
 */
const addWithIndex = (
	state,
	index,
	data,
	filter,
	order,
	start,
	total,
	changedOn,
	limit
) => {
	// TODO test commonHelpers.getUpdatedByDataSourceKey properly
	const byDataSourceKey = commonHelpers.getUpdatedByDataSourceKey(
		state.byDataSourceKey,
		data
	);

	// Fake new data object for common action
	// Action "common.addIndex" needs array of data objects with key to create new index.
	// "newData" is a Array of the minimal data for construct index in common actoin.
	const newData = index.map(val => ({key: val}));

	const addIndexAction = {
		filter,
		order,
		data: newData,
		start,
		count: total,
		changedOn,
		...(limit && {limit: limit}),
	};

	const stateWithUpdatedIndexes = common.addIndex(state, addIndexAction);

	return {...state, byDataSourceKey, indexes: stateWithUpdatedIndexes.indexes};
};

/**
 * Add spatial index
 * @param state {Object}
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {*&{spatialIndexes: []}}
 */
const addSpatialIndex = (state, filter, order, indexData, changedOn) => {
	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		filter,
		order,
		indexData,
		changedOn,
		'spatialIndexes'
	);

	return {
		...state,
		spatialIndexes: updatedIndexes,
	};
};

/**
 * Remove spatial index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} filter
 * @param {Object} order
 * @return {Object}
 */
const removeSpatialIndex = (state, filter, order) => {
	const updatedIndexes = commonHelpers.removeIndex(
		state.spatialIndexes,
		filter,
		order
	);

	return {
		...state,
		spatialIndexes: updatedIndexes,
	};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD:
			return add(state, action.key, action.data);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX:
			return addWithSpatialIndex(
				state,
				action.attributeDataSourceKey,
				action.data,
				action.filter,
				action.order,
				action.indexData,
				action.changedOn
			);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX:
			return addWithIndex(
				state,
				action.index,
				action.data,
				action.filter,
				action.order,
				action.start,
				action.total,
				action.changedOn,
				action.limit
			);
		case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE:
			return update(state, action.key, action.data);
		case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD:
			return addSpatialIndex(
				state,
				action.filter,
				action.order,
				action.indexData,
				action.changedOn
			);
		case ActionTypes.DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE:
			return removeSpatialIndex(state, action.filter, action.order);
		case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE_STORE:
			return common.updateStore(state, action.data);
		default:
			return state;
	}
};
