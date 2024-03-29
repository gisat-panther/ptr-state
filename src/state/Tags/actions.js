import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';

import common from '../_common/actions';

// ============ creators ===========
const add = common.add(ActionTypes.TAGS);
const create = common.create(Select.tags.getSubstate, 'tags', ActionTypes.TAGS);
const deleteItem = common.delete(
	Select.tags.getSubstate,
	'tags',
	ActionTypes.TAGS
);
const saveEdited = common.saveEdited(
	Select.tags.getSubstate,
	'tags',
	ActionTypes.TAGS
);
const updateEdited = common.updateEdited(
	Select.tags.getSubstate,
	ActionTypes.TAGS
);
const useKeys = common.useKeys(
	Select.tags.getSubstate,
	'tags',
	ActionTypes.TAGS
);
const useKeysClear = common.useKeysClear(ActionTypes.TAGS);
const useIndexedClear = common.useIndexedClear(ActionTypes.TAGS);
const useIndexed = common.useIndexed(
	Select.tags.getSubstate,
	'tags',
	ActionTypes.TAGS
);
const clearIndex = common.clearIndex(ActionTypes.TAGS);
const refreshUses = common.refreshUses(
	Select.tags.getSubstate,
	`tags`,
	ActionTypes.TAGS
);
const updateStateFromView = common.updateSubstateFromView(ActionTypes.TAGS);

// ============ actions ===========

// ============ export ===========

export default {
	add,
	create,
	delete: deleteItem,
	saveEdited,
	updateEdited,
	useKeys,
	useKeysClear,
	refreshUses,
	useIndexed,
	useIndexedClear,
	clearIndex,
	updateStateFromView,
};
