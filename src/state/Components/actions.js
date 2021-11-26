import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

const updateStore = common.updateStore(
	Select.components.getSubstate,
	ActionTypes.COMPONENTS
);

// ============ creators ===========
function update(component, data) {
	return dispatch => {
		dispatch(actionUpdate(component, data));
	};
}

/**
 * Remove whole component state or if path is defined, remove just everything on path.
 * @param {string} component Component property from state.components
 * @param {string} path Dot separated path or "" or null. If path is not defined whole component will be removed.
 * @returns
 */
function remove(component, path) {
	return actionRemove(component, path);
}

// ============ actions ===========
function actionUpdate(component, data) {
	return {
		type: ActionTypes.COMPONENTS.UPDATE,
		component: component,
		update: data,
	};
}

function actionSet(component, path, value) {
	return {
		type: ActionTypes.COMPONENTS.SET,
		component,
		path,
		value,
	};
}

function actionRemove(component, path) {
	return {
		type: ActionTypes.COMPONENTS.REMOVE,
		component,
		...(path ? {path} : {}),
	};
}

// ============ export ===========

export default {
	update,
	updateStateFromView: updateStore,
	updateStore,
	set: actionSet,
	remove,
};
