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
import commonHelpers from '../../_common/helpers';
import {recomputeSelectorOptions} from '../../_common/recomputeHelpers';

const getSubstate = state => state.data.timeSerie;

// Recompute observers ---------------------------------------------------------
const getIndexesObserver = createRecomputeObserver(
	state => getSubstate(state).timeSerieIndexes
);

const getAllAsObjectObserver = createRecomputeObserver(
	state => getSubstate(state).byDataSourceKey
);

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

export default {
	getAllAsObjectObserver,
	getIndex_recompute,
	getSubstate,
};
