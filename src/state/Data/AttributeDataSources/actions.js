import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES;

const addIndex = common.addIndex(actionTypes);
const add = common.add(actionTypes);

// ============ creators ===========
/**
 * It ensure adding index and adding or updating received data from BE.
 * Add dataSources to state only when attributeDataSources received, in case of empty attributeDataSources it adds only index.
 * @param {Array} attributeDataSources Array received from BE contains attributeDataSource definitions.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */
function receiveIndexed(
	attributeDataSources,
	filter,
	order,
	start,
	total,
	changedOn
) {
	return dispatch => {
		// add attributeDataSources to store
		if (attributeDataSources.length) {
			dispatch(add(attributeDataSources, filter));
		}

		// add to index
		dispatch(
			addIndex(filter, order, total, start, attributeDataSources, changedOn)
		);
	};
}

// ============ actions ============
const actionUpdateStore = data => {
	return {
		type: ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE,
		data,
	};
};

// ============ export ===========

export default {
	add,
	receiveIndexed,
	updateStore: actionUpdateStore,
};
