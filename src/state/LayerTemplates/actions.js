import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

// ============ creators ===========

const add = common.add(ActionTypes.LAYER_TEMPLATES);
const create = common.create(
	Select.layerTemplates.getSubstate,
	'layerTemplates',
	ActionTypes.LAYER_TEMPLATES
);
const deleteItem = common.delete(
	Select.layerTemplates.getSubstate,
	'layerTemplates',
	ActionTypes.LAYER_TEMPLATES
);
const saveEdited = common.saveEdited(
	Select.layerTemplates.getSubstate,
	'layerTemplates',
	ActionTypes.LAYER_TEMPLATES
);
const setActiveKey = common.setActiveKey(ActionTypes.LAYER_TEMPLATES);
const updateEdited = common.updateEdited(
	Select.layerTemplates.getSubstate,
	ActionTypes.LAYER_TEMPLATES
);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.LAYER_TEMPLATES
);
const setActiveKeys = common.setActiveKeys(ActionTypes.LAYER_TEMPLATES);
const useKeys = common.useKeys(
	Select.layerTemplates.getSubstate,
	'layerTemplates',
	ActionTypes.LAYER_TEMPLATES
);
const useKeysClear = common.useKeysClear(ActionTypes.LAYER_TEMPLATES);
const useIndexed = common.useIndexed(
	Select.layerTemplates.getSubstate,
	'layerTemplates',
	ActionTypes.LAYER_TEMPLATES
);
const refreshUses = common.refreshUses(
	Select.layerTemplates.getSubstate,
	`layerTemplates`,
	ActionTypes.LAYER_TEMPLATES
);
const useIndexedClear = common.useIndexedClear(ActionTypes.LAYER_TEMPLATES);
const clearIndex = common.clearIndex(ActionTypes.LAYER_TEMPLATES);

const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('layerTemplate'));
		}
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		if (options) {
			dispatch(options.ensureDependenciesOfActiveMetadataType('layerTemplate'));
		}
	};
};

// ============ export ===========

export default {
	add,
	clearIndex,
	create,
	delete: deleteItem,
	saveEdited,
	refreshUses,
	setActiveKey: setActiveKeyAndEnsureDependencies,
	setActiveKeys: setActiveKeysAndEnsureDependencies,

	updateEdited,
	updateStateFromView,
	useIndexed,
	useIndexedClear,
	useKeys,
	useKeysClear,
};
