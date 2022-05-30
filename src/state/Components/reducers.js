import {isEmpty as _isEmpty} from 'lodash';
import utils from '@gisatcz/ptr-utils';
import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/reducers';
import helpers from './helpers';

export const INITIAL_STATE = {};

/**
 * Update component
 * @param state {Object}
 * @param componentKey {string}
 * @param update {Object}
 * @return {Object} state
 */
function update(state, componentKey, update) {
	if (!_isEmpty(update)) {
		return {
			...state,
			[componentKey]: state[componentKey]
				? {...state[componentKey], ...update}
				: update,
		};
	} else {
		return state;
	}
}

/**
 * Remove component
 * Remove whole component or if path is defined, remove just everything on path.
 * @param state {Object}
 * @param componentKey {string}
 * @param path {string} Dot separated path or "" or null.
 * @return {Object} state
 */
function remove(state, componentKey, path = '') {
	const pathForComponent = !path || path === null || path === '';
	if (componentKey && (pathForComponent || path)) {
		const pathParams = !pathForComponent && path.split('.');
		if (pathForComponent) {
			return utils.stateManagement.removeItemByKey(state, componentKey);
		} else {
			return {
				...state,
				[componentKey]: helpers.setHelper(
					state[componentKey],
					pathParams,
					undefined
				),
			};
		}
	} else {
		return state;
	}
}

/**
 * Set value in given path
 * @param state {Object}
 * @param componentKey {string}
 * @param path {string} data.property.something
 * @param value {*}
 * @return {Object} state
 */
function set(state, componentKey, path, value) {
	if (componentKey && path) {
		const pathParams = path.split('.');
		const componentState = state[componentKey] || {};
		return {
			...state,
			[componentKey]: helpers.setHelper(componentState, pathParams, value),
		};
	} else {
		return state;
	}
}

// helpers ---------------------------------------------------------------------

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.COMPONENTS.UPDATE:
			return update(state, action.component, action.update);
		case ActionTypes.COMPONENTS.UPDATE_STORE:
			return common.updateStore(state, action);
		case ActionTypes.COMPONENTS.SET:
			return set(state, action.component, action.path, action.value);
		case ActionTypes.COMPONENTS.REMOVE:
			return remove(state, action.component, action.path);
		default:
			return state;
	}
};
