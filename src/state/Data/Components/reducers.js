import {indexOf as _indexOf, isEmpty as _isEmpty} from 'lodash';
import ActionTypes from '../../../constants/ActionTypes';
import {stateManagement} from '@gisatcz/ptr-utils';

export const INITIAL_STATE = {
	components: {
		byKey: {},
		inUse: [],
	},
	sets: {
		byKey: {},
	},
};

/**
 * Remove component key from the list of usages
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} updated state
 */
const componentUseClear = (state, componentKey) => {
	if (componentKey && !_isEmpty(state.components.inUse)) {
		const index = _indexOf(state.components.inUse, componentKey);
		if (index > -1) {
			let updatedInUse = stateManagement.removeItemByIndex(
				state.components.inUse,
				index
			);

			return {
				...state,
				components: {
					...state.components,
					inUse: updatedInUse,
				},
			};
		} else {
			return state;
		}
	} else {
		return state;
	}
};

/**
 * Add component key to the list of usages
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} updated state
 */
const componentUseRegister = (state, componentKey) => {
	if (componentKey) {
		return {
			...state,
			components: {
				...state.components,
				inUse: [...state.components.inUse, componentKey],
			},
		};
	} else {
		return state;
	}
};

/**
 * Set attribute keys for given component
 * @param state {Object}
 * @param componentKey {string}
 * @param attributeKeys {Array}
 * @return {Object} updated state
 */
const setComponentAttributeKeys = (state, componentKey, attributeKeys) => {
	if (componentKey && attributeKeys?.length) {
		return {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					[componentKey]: state.components.byKey[componentKey]
						? {
								...state.components.byKey[componentKey],
								attributeKeys,
						  }
						: {
								attributeKeys,
						  },
				},
			},
		};
	} else {
		return state;
	}
};

/**
 * Set attribute order for given component
 * @param state {Object}
 * @param componentKey {string}
 * @param attributeOrder {Array}
 * @return {Object} updated state
 */
const setComponentAttributeOrder = (state, componentKey, attributeOrder) => {
	if (componentKey && attributeOrder?.length) {
		return {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					[componentKey]: state.components.byKey[componentKey]
						? {
							...state.components.byKey[componentKey],
							attributeOrder,
						}
						: {
							attributeOrder,
						},
				},
			},
		};
	} else {
		return state;
	}
};

/**
 * Set feature keys for given component
 * @param state {Object}
 * @param componentKey {string}
 * @param featureKeys {Array}
 * @return {Object} updated state
 */
const setComponentFeatureKeys = (state, componentKey, featureKeys) => {
	if (componentKey && featureKeys?.length) {
		return {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					[componentKey]: state.components.byKey[componentKey]
						? {
								...state.components.byKey[componentKey],
								featureKeys,
						  }
						: {
								featureKeys,
						  },
				},
			},
		};
	} else {
		return state;
	}
};

/**
 * Add or replace components
 * @param state {Object}
 * @param componentsByKey {Object}
 * @return {Object}
 */
const addOrReplaceComponents = (state, componentsByKey) => {
	if (componentsByKey) {
		return {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					...componentsByKey,
				},
			},
		};
	} else {
		return state;
	}
};

/**
 * Add or replace sets
 * @param state {Object}
 * @param setsByKey {Object}
 * @return {Object}
 */
const addOrReplaceSets = (state, setsByKey) => {
	if (setsByKey) {
		return {
			...state,
			sets: {
				...state.sets,
				byKey: {
					...state.sets.byKey,
					...setsByKey,
				},
			},
		};
	} else {
		return state;
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS:
			return setComponentAttributeKeys(
				state,
				action.componentKey,
				action.attributeKeys
			);
		case ActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER:
			return setComponentAttributeOrder(
				state,
				action.componentKey,
				action.attributeOrder
			);
		case ActionTypes.DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS:
			return setComponentFeatureKeys(
				state,
				action.componentKey,
				action.featureKeys
			);
		case ActionTypes.DATA.COMPONENTS.COMPONENT.USE.CLEAR:
			return componentUseClear(state, action.componentKey);
		case ActionTypes.DATA.COMPONENTS.COMPONENT.USE.REGISTER:
			return componentUseRegister(state, action.componentKey);
		case ActionTypes.DATA.COMPONENTS.ADD_COMPONENTS:
			return addOrReplaceComponents(state, action.components);
		case ActionTypes.DATA.COMPONENTS.ADD_SETS:
			return addOrReplaceSets(state, action.sets);
		default:
			return state;
	}
};
