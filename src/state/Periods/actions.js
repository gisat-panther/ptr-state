import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

// ============ creators ===========

const add = common.add(ActionTypes.PERIODS);
const create = common.create(
	Select.periods.getSubstate,
	'periods',
	ActionTypes.PERIODS
);
const deleteItem = common.delete(
	Select.periods.getSubstate,
	'periods',
	ActionTypes.PERIODS
);
const saveEdited = common.saveEdited(
	Select.periods.getSubstate,
	'periods',
	ActionTypes.PERIODS
);
const setActiveKey = common.setActiveKey(ActionTypes.PERIODS);
const setActiveKeys = common.setActiveKeys(ActionTypes.PERIODS);
const updateEdited = common.updateEdited(
	Select.periods.getSubstate,
	ActionTypes.PERIODS
);
const updateStateFromView = common.updateSubstateFromView(ActionTypes.PERIODS);
const useKeys = common.useKeys(
	Select.periods.getSubstate,
	'periods',
	ActionTypes.PERIODS
);
const useKeysClear = common.useKeysClear(ActionTypes.PERIODS);
const useIndexed = common.useIndexed(
	Select.periods.getSubstate,
	'periods',
	ActionTypes.PERIODS
);
const useIndexedClear = common.useIndexedClear(ActionTypes.PERIODS);
const clearIndex = common.clearIndex(ActionTypes.PERIODS);
const refreshUses = common.refreshUses(
	Select.periods.getSubstate,
	`periods`,
	ActionTypes.PERIODS
);
const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('period'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('period'));
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
