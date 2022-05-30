import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

// ============ creators ===========
const add = common.add(ActionTypes.ATTRIBUTES);
const create = common.create(
	Select.attributes.getSubstate,
	'attributes',
	ActionTypes.ATTRIBUTES
);
const refreshUses = common.refreshUses(
	Select.attributes.getSubstate,
	`attributes`,
	ActionTypes.ATTRIBUTES
);
const deleteItem = common.delete(
	Select.attributes.getSubstate,
	'attributes',
	ActionTypes.ATTRIBUTES
);
const saveEdited = common.saveEdited(
	Select.attributes.getSubstate,
	'attributes',
	ActionTypes.ATTRIBUTES
);
const setActiveKey = common.setActiveKey(ActionTypes.ATTRIBUTES);
const setActiveKeys = common.setActiveKeys(ActionTypes.ATTRIBUTES);
const updateEdited = common.updateEdited(
	Select.attributes.getSubstate,
	ActionTypes.ATTRIBUTES
);
const updateStore = common.updateStore(
	Select.attributes.getSubstate,
	ActionTypes.ATTRIBUTES
);
const useIndexed = common.useIndexed(
	Select.attributes.getSubstate,
	'attributes',
	ActionTypes.ATTRIBUTES
);
const useIndexedClear = common.useIndexedClear(ActionTypes.ATTRIBUTES);
const clearIndex = common.clearIndex(ActionTypes.ATTRIBUTES);
const useKeys = common.useKeys(
	Select.attributes.getSubstate,
	'attributes',
	ActionTypes.ATTRIBUTES
);
const useKeysClear = common.useKeysClear(ActionTypes.ATTRIBUTES);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.ATTRIBUTES
);

const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('attribute'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('attribute'));
		}
	};
};

// ============ export ===========

export default {
	add,
	create,
	delete: deleteItem,
	updateStateFromView,

	refreshUses,

	saveEdited,
	setActiveKey: setActiveKeyAndEnsureDependencies,
	setActiveKeys: setActiveKeysAndEnsureDependencies,

	updateEdited,
	updateStore,
	useIndexed,
	useIndexedClear,
	clearIndex,
	useKeys,
	useKeysClear,
};
