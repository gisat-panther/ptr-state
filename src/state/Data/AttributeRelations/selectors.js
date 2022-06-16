import common from '../../_common/selectors';
import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import {forEach as _forEach, filter as _filter} from 'lodash';
import {recomputeSelectorOptions} from '../../_common/recomputeHelpers';

const getSubstate = state => state.data.attributeRelations;

const getIndex = common.getIndex(getSubstate);
const getIndex_recompute = common.getIndex_recompute(getSubstate);

/**
 * It returns relation model for given key, if exists
 * @param key {string} relation key
 * @return {Object} attribute relation
 */
const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byKey?.[key] || null;
});

/**
 * It returns relation models for given keys
 * @param keys {Array} relation keys
 * @return {Array} A collection of relations
 */
const getByKeys = createRecomputeSelector(keys => {
	if (keys?.length) {
		let relations = [];
		keys.forEach(key => {
			const relation = getByKeyObserver(key);
			if (relation) {
				relations.push(relation);
			}
		});
		return relations.length ? relations : null;
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns a collection of indexed relations for given filter
 * @param filter {Object}
 * @return {Array}
 */
const getIndexed = createRecomputeSelector(filter => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		// filter only uuids (not true or false values of index)
		const keys = _filter(
			Object.values(index.index),
			key => typeof key === 'string'
		);
		if (keys?.length) {
			return getByKeys(keys);
		} else {
			return null;
		}
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns key-value pairs, where the key is attribute data source key and the value is attribute key
 * @param filter {Object} attribute relation filter
 * @return {Object}
 */
const getFilteredAttributeDataSourceKeyAttributeKeyPairs =
	createRecomputeSelector(filter => {
		const relations = getIndexed(filter);
		if (relations) {
			const pairs = {};
			_forEach(relations, relation => {
				pairs[relation.data.attributeDataSourceKey] =
					relation.data.attributeKey;
			});
			return pairs;
		} else {
			return null;
		}
	}, recomputeSelectorOptions);

export default {
	getSubstate,
	getByKeyObserver,
	getByKeys,
	getFilteredAttributeDataSourceKeyAttributeKeyPairs,
	getIndexed,
	getIndex,
};
