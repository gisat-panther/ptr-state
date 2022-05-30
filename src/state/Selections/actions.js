import common from '../_common/actions';
import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';

const add = common.add(ActionTypes.SELECTIONS);
const setActiveKey = common.setActiveKey(ActionTypes.SELECTIONS);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.SELECTIONS
);

const setActiveSelectionFeatureKeysFilterKeys = selectionKeys => {
	return (dispatch, getState) => {
		let activeSelectionKey = Select.selections.getActiveKey(getState());
		if (activeSelectionKey && selectionKeys) {
			dispatch(setFeatureKeysFilterKeys(activeSelectionKey, selectionKeys));
		}
	};
};

const updateStateFromViewWithData = view => {
	return (dispatch, getState) => {
		dispatch(updateStateFromView(view));
		if (view.data) {
			dispatch(add(view.data));
		}
	};
};

// ============ actions ===========
function clearFeatureKeysFilter(key) {
	return {
		type: ActionTypes.SELECTIONS.CLEAR.FEATURE_KEYS_FILTER,
		key,
	};
}

function setFeatureKeysFilterKeys(key, featureKeys) {
	return {
		type: ActionTypes.SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS,
		key,
		featureKeys,
	};
}

export default {
	add,
	clearFeatureKeysFilter,
	setActiveSelectionFeatureKeysFilterKeys,
	setActiveKey,
	setFeatureKeysFilterKeys,
	updateStateFromView,
	updateStateFromViewWithData,
};
