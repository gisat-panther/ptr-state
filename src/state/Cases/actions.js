import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

// ============ creators ===========

const add = common.add(ActionTypes.CASES);
const create = common.create(
	Select.cases.getSubstate,
	'cases',
	ActionTypes.CASES
);
const deleteItem = common.delete(
	Select.cases.getSubstate,
	'cases',
	ActionTypes.CASES
);
const saveEdited = common.saveEdited(
	Select.cases.getSubstate,
	'cases',
	ActionTypes.CASES
);
const setActiveKey = common.setActiveKey(ActionTypes.CASES);
const setActiveKeys = common.setActiveKeys(ActionTypes.CASES);
const updateEdited = common.updateEdited(
	Select.cases.getSubstate,
	ActionTypes.CASES
);
const updateStateFromView = common.updateSubstateFromView(ActionTypes.CASES);
const useKeys = common.useKeys(
	Select.cases.getSubstate,
	'cases',
	ActionTypes.CASES
);
const useKeysClear = common.useKeysClear(ActionTypes.CASES);
const useIndexed = common.useIndexed(
	Select.cases.getSubstate,
	'cases',
	ActionTypes.CASES
);
const useIndexedClear = common.useIndexedClear(ActionTypes.CASES);
const clearIndex = common.clearIndex(ActionTypes.CASES);
const refreshUses = common.refreshUses(
	Select.cases.getSubstate,
	`cases`,
	ActionTypes.CASES
);

const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('case'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('case'));
		}
	};
};

// ============ actions ===========

// ============ export ===========

export default {
	add,
	create,
	delete: deleteItem,

	refreshUses,

	saveEdited,
	setActiveKey: setActiveKeyAndEnsureDependencies,
	setActiveKeys: setActiveKeysAndEnsureDependencies,

	updateEdited,
	updateStateFromView,
	useIndexed,
	useIndexedClear,
	clearIndex,
	useKeys,
	useKeysClear,
};
