import {
	createSelector as createRecomputeSelector,
	createObserver as createRecomputeObserver,
} from '@jvitela/recompute';
import common from '../../_common/selectors';
import {recomputeSelectorOptions} from '../../_common/recomputeHelpers';

const getSubstate = state => state.data.attributeDataSources;

const getIndex = common.getIndex(getSubstate);
const getIndex_recompute = common.getIndex_recompute(getSubstate);

/**
 * It returns data source model for given key, if exists
 * @param key {string} data source key
 * @return {Object} attribute data source model
 */
const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byKey?.[key] || null;
});

/**
 * It returns data source models for given keys
 * @param keys {Array} data source keys
 * @return {Array} A collection of data source models
 */
const getByKeys = createRecomputeSelector(keys => {
	if (keys?.length) {
		let dataSources = [];
		keys.forEach(key => {
			const dataSource = getByKeyObserver(key);
			if (dataSource) {
				dataSources.push(dataSource);
			}
		});
		return dataSources.length ? dataSources : null;
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns a collection of indexed data sources for given filter
 * @param filter {Object}
 * @return {Array}
 */
const getIndexed = createRecomputeSelector(filter => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		let keys = Object.values(index.index);
		if (keys?.length) {
			return getByKeys(keys);
		} else {
			return null;
		}
	} else {
		return null;
	}
}, recomputeSelectorOptions);

export default {
	getByKeyObserver,
	getByKeys,
	getIndexed,
	getIndex,
	getIndex_recompute,
};
