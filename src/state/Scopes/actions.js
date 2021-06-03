import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';
import common from '../_common/actions';
import _ from 'lodash';

// ============ creators ===========

const add = common.add(ActionTypes.SCOPES);
const create = common.create(
	Select.scopes.getSubstate,
	'scopes',
	ActionTypes.SCOPES
);
const deleteItem = common.delete(
	Select.scopes.getSubstate,
	'scopes',
	ActionTypes.SCOPES
);
const saveEdited = common.saveEdited(
	Select.scopes.getSubstate,
	'scopes',
	ActionTypes.SCOPES
);
const setActiveKey = common.setActiveKey(ActionTypes.SCOPES);
const setActiveKeys = common.setActiveKeys(ActionTypes.SCOPES);
const updateEdited = common.updateEdited(
	Select.scopes.getSubstate,
	ActionTypes.SCOPES
);
const useKeys = common.useKeys(
	Select.scopes.getSubstate,
	'scopes',
	ActionTypes.SCOPES
);
const useKeysClear = common.useKeysClear(ActionTypes.SCOPES);
const useIndexedClear = common.useIndexedClear(ActionTypes.SCOPES);
const useIndexed = common.useIndexed(
	Select.scopes.getSubstate,
	'scopes',
	ActionTypes.SCOPES
);
const clearIndex = common.clearIndex(ActionTypes.SCOPES);
const refreshUses = common.refreshUses(
	Select.scopes.getSubstate,
	`scopes`,
	ActionTypes.SCOPES
);

const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('scope'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('scope'));
		}
	};
};

function updateStateFromView(data) {
	return dispatch => {
		if (data) {
			if (data && data.byKey) {
				dispatch(add(_.values(data.byKey)));
			}

			if (data && data.activeKey) {
				dispatch(setActiveKeyAndEnsureDependencies(data.activeKey));
			} else if (data && data.activeKeys) {
				dispatch(setActiveKeysAndEnsureDependencies(data.activeKeys));
			}
		}
	};
}

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
