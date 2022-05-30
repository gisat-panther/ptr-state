import common from '../../_common/selectors';
import {
	createSelector as createRecomputeSelector,
	createObserver as createRecomputeObserver,
} from '@jvitela/recompute';
import commonHelpers from '../../_common/helpers';
import {recomputeSelectorOptions} from '../../_common/recomputeHelpers';
import {isNumber as _isNumber} from 'lodash';
const getSubstate = state => state.data.spatialData;

const getIndex = common.getIndex(getSubstate);

const getIndexesObserver = createRecomputeObserver(state =>
	common.getIndexes(getSubstate)(state)
);

/**
 * It returns all data for given datasource key
 * @param key {string} data source key
 * @returns {Object} Features as object (by feature key)
 */
const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byDataSourceKey?.[key] || null;
});

/**
 * It returns whole index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */
const getIndex_recompute = createRecomputeSelector((filter, order) => {
	const indexes = getIndexesObserver();
	if (indexes) {
		return commonHelpers.getIndex(indexes, filter, order);
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */
const getIndexedFeatureKeys = createRecomputeSelector(
	(filter, level, tile, dataSourceKey) => {
		if (_isNumber(level) && tile && dataSourceKey) {
			const index = getIndex_recompute(filter, null);
			const featureKeys = index?.index[level]?.[tile]?.[dataSourceKey];
			return featureKeys && featureKeys.length ? featureKeys : null;
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);
/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */
const isTileLoading = createRecomputeSelector((filter, level, tile) => {
	if (_isNumber(level) && tile) {
		const index = getIndex_recompute(filter, null);
		if (index) {
			const loading = index.index?.[level]?.[tile];
			return loading === true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}, recomputeSelectorOptions);

export default {
	getByDataSourceKeyObserver,
	getIndex,
	getIndex_recompute,
	getIndexesObserver,
	getIndexedFeatureKeys,
	isTileLoading,
};
