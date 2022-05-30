import {
	isEmpty as _isEmpty,
	forEach as _forEach,
	forIn as _forIn,
	isNumber as _isNumber,
} from 'lodash';

import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import common from '../../_common/selectors';
import commonHelpers from '../../_common/helpers';
import {recomputeSelectorOptions} from '../../_common/recomputeHelpers';

const getSubstate = state => state.data.attributeData;

const getIndex = common.getIndexByPath(getSubstate);

// Recompute observers ---------------------------------------------------------

const getAllAsObjectObserver = createRecomputeObserver(
	state => getSubstate(state).byDataSourceKey
);
const getIndexesObserver = createRecomputeObserver(
	state => getSubstate(state).indexes
);
const getSpatialIndexesObserver = createRecomputeObserver(
	state => getSubstate(state).spatialIndexes
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
	if (indexes && !_isEmpty(indexes)) {
		return commonHelpers.getIndex(indexes, filter, order);
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns whole spatial index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */
const getSpatialIndex_recompute = createRecomputeSelector((filter, order) => {
	const indexes = getSpatialIndexesObserver();
	if (indexes && !_isEmpty(indexes)) {
		return commonHelpers.getIndex(indexes, filter, order);
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns attributes data (an object containing featureKey-attributeValue pairs) grouped by data source key
 * @param dataSourceKeys {Array}
 * @return {Object}
 */
const getDataByDataSourceKeys = createRecomputeSelector(dataSourceKeys => {
	if (dataSourceKeys) {
		let data = {};
		_forEach(dataSourceKeys, key => {
			const attributes = getByDataSourceKeyObserver(key);
			if (attributes && !_isEmpty(attributes)) {
				data[key] = attributes;
			}
		});

		return !_isEmpty(data) ? data : null;
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns attribute values for given feature key grouped by data source key
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where the key is attribute data source key and the value is matching attribute key
 * @param featureKey {string | number}
 * @return {Object} attributeDataSource key - attribute value pairs
 */
const getAttributesByDataSourceKeysForFeatureKey = createRecomputeSelector(
	(attributeDataSourceKeyAttributeKeyPairs, featureKey) => {
		if (attributeDataSourceKeyAttributeKeyPairs && featureKey) {
			const dataSourceKeys = Object.keys(
				attributeDataSourceKeyAttributeKeyPairs
			);
			const dataByDataSourceKey = getDataByDataSourceKeys(dataSourceKeys);
			if (dataByDataSourceKey) {
				let attributes = {};
				_forIn(dataByDataSourceKey, (dataSourceData, dataSourceKey) => {
					if (dataSourceData.hasOwnProperty(featureKey)) {
						const value = dataSourceData[featureKey];
						const attributeKey =
							attributeDataSourceKeyAttributeKeyPairs[dataSourceKey];

						if (attributeKey) {
							attributes[attributeKey] = value;
						}
					}
				});

				return !_isEmpty(attributes) ? attributes : null;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

/**
 * It returns indexed feature keys grouped by attribute data source keys
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @return {Object}
 */
const getSpatiallyIndexedFeatureKeysByDataSourceKeys = createRecomputeSelector(
	(filter, level, tile) => {
		const spatialIndex = getSpatialIndex_recompute(filter, null);
		if (spatialIndex?.index && !_isEmpty(spatialIndex)) {
			const featureKeysByDataSourceKeys = spatialIndex.index[level]?.[tile];
			return featureKeysByDataSourceKeys || null;
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
		const index = getSpatialIndex_recompute(filter, null);
		if (index) {
			const tileIndex = index?.index[level]?.[tile];
			return tileIndex === true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}, recomputeSelectorOptions);

export default {
	getAllAsObjectObserver,
	getByDataSourceKeyObserver,
	getIndex,
	getIndex_recompute,
	getIndexesObserver,
	getSpatialIndex_recompute,
	getSpatialIndexesObserver,
	getDataByDataSourceKeys,
	getAttributesByDataSourceKeysForFeatureKey,
	getSpatiallyIndexedFeatureKeysByDataSourceKeys,
	isTileLoading,

	getSubstate,
};
