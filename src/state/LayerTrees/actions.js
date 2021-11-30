import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';

import common from '../_common/actions';

// ============ creators ===========
const add = common.add(ActionTypes.LAYER_TREES);
const create = common.create(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'application'
);
const deleteItem = common.delete(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'application'
);
const saveEdited = common.saveEdited(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'application'
);
const updateEdited = common.updateEdited(
	Select.layerTrees.getSubstate,
	ActionTypes.LAYER_TREES
);
const useKeys = common.useKeys(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'application'
);
const useKeysClear = common.useKeysClear(ActionTypes.LAYER_TREES);
const useIndexedClear = common.useIndexedClear(ActionTypes.LAYER_TREES);
const clearIndex = common.clearIndex(ActionTypes.LAYER_TREES);
const useIndexed = common.useIndexed(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'application'
);
const refreshUses = common.refreshUses(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'application'
);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.LAYER_TREES
);

// ============ actions ===========
function ensureData(filter, componentId) {
	return dispatch => {
		return dispatch(useIndexed(null, filter, null, 1, 100, componentId)).then();
	};
}

// ============ export ===========

export default {
	add,
	create,
	delete: deleteItem,

	ensureData,

	refreshUses,

	saveEdited,
	updateEdited,

	updateStateFromView,
	useIndexed,
	useIndexedClear,
	clearIndex,
	useKeys,
	useKeysClear,
};
