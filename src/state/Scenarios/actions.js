import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

// ============ creators ===========

const add = common.add(ActionTypes.SCENARIOS);
const create = common.create(
	Select.scenarios.getSubstate,
	'scenarios',
	ActionTypes.SCENARIOS
);
const deleteItem = common.delete(
	Select.scenarios.getSubstate,
	'scenarios',
	ActionTypes.SCENARIOS
);
const saveEdited = common.saveEdited(
	Select.scenarios.getSubstate,
	'scenarios',
	ActionTypes.SCENARIOS
);
const setActiveKey = common.setActiveKey(ActionTypes.SCENARIOS);
const setActiveKeys = common.setActiveKeys(ActionTypes.SCENARIOS);
const updateEdited = common.updateEdited(
	Select.scenarios.getSubstate,
	ActionTypes.SCENARIOS
);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.SCENARIOS
);
const useKeys = common.useKeys(
	Select.scenarios.getSubstate,
	'scenarios',
	ActionTypes.SCENARIOS
);
const useKeysClear = common.useKeysClear(ActionTypes.SCENARIOS);
const useIndexed = common.useIndexed(
	Select.scenarios.getSubstate,
	'scenarios',
	ActionTypes.SCENARIOS
);
const useIndexedClear = common.useIndexedClear(ActionTypes.SCENARIOS);
const refreshUses = common.refreshUses(
	Select.scenarios.getSubstate,
	`scenarios`,
	ActionTypes.SCENARIOS
);

const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
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
	useKeys,
	useKeysClear,
};
