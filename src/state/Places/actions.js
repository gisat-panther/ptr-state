import ActionTypes from '../../constants/ActionTypes';

import common from '../_common/actions';
import Select from '../Select';

// ============ creators ===========

const add = common.add(ActionTypes.PLACES);
const create = common.create(
	Select.places.getSubstate,
	'places',
	ActionTypes.PLACES
);
const deleteItem = common.delete(
	Select.places.getSubstate,
	'places',
	ActionTypes.PLACES
);
const saveEdited = common.saveEdited(
	Select.places.getSubstate,
	'places',
	ActionTypes.PLACES
);
const setActiveKey = common.setActiveKey(ActionTypes.PLACES);
const setActiveKeys = common.setActiveKeys(ActionTypes.PLACES);
const updateEdited = common.updateEdited(
	Select.places.getSubstate,
	ActionTypes.PLACES
);
const updateStateFromView = common.updateSubstateFromView(ActionTypes.PLACES);
const useIndexed = common.useIndexed(
	Select.places.getSubstate,
	'places',
	ActionTypes.PLACES
);
const useIndexedClear = common.useIndexedClear(ActionTypes.PLACES);
const clearIndex = common.clearIndex(ActionTypes.PLACES);
const useKeys = common.useKeys(
	Select.places.getSubstate,
	'places',
	ActionTypes.PLACES
);
const useKeysClear = common.useKeysClear(ActionTypes.PLACES);
const refreshUses = common.refreshUses(
	Select.places.getSubstate,
	`places`,
	ActionTypes.PLACES
);
const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('place'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('place'));
		}
	};
};

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
