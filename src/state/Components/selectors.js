import {createSelector} from 'reselect';
import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import {isEmpty as _isEmpty, get as _get} from 'lodash';

const getAllByKey = state => state.components;
const getAllByKeyObserver = createRecomputeObserver(getAllByKey);

/**
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} component data
 */
const getByComponentKey = createSelector(
	[getAllByKey, (state, key) => key],
	(components, key) => {
		if (components && key && components[key]) {
			return components[key];
		} else {
			return null;
		}
	}
);

/**
 * @param componentKey {string}
 * @return {Object} component data
 */
const getByComponentKey_recompute = createRecomputeSelector(componentKey => {
	if (componentKey) {
		const components = getAllByKeyObserver();
		if (!_isEmpty(components)) {
			return components[componentKey] || null;
		} else {
			return null;
		}
	} else {
		return null;
	}
});

/**
 * Get value from given path
 * @param state {Object}
 * @param componentKey {string}
 * @param path {string}
 * @return {*} value
 */
const get = createSelector(
	[getByComponentKey, (state, key, path) => path],
	(componentState, path) => _get(componentState, path, null)
);

export default {
	get,
	getAllByKeyObserver,
	getByComponentKey,
	getByComponentKey_recompute,

	getStateToSave: getAllByKey,
	getSubstate: getAllByKey,
};
