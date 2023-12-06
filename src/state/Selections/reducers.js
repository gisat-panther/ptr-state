import ActionTypes from '../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

const clearFeatureKeysFilter = (state, key) => {
	let updatedByKey = {
		...state.byKey,
		[key]: {
			...state.byKey[key],
			data: {
				...state.byKey[key].data,
				featureKeysFilter: null,
			},
		},
	};

	return {...state, byKey: updatedByKey};
};

const setFeatureKeysFilter = (state, key, featureKeysFilter) => {
	return {
		...state,
		byKey: {
			...state.byKey,
			[key]: {
				...state.byKey[key],
				data: {
					...state.byKey[key].data,
					featureKeysFilter,
				},
			},
		},
	};
};

const setFeatureKeysFilterKeys = (state, key, featureKeys) => {
	let updatedByKey = {
		...state.byKey,
		[key]: {
			...state.byKey[key],
			data: {
				...state.byKey[key].data,
				featureKeysFilter: {
					...state.byKey[key].data.featureKeysFilter,
					keys: featureKeys,
				},
			},
		},
	};

	return {...state, byKey: updatedByKey};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.SELECTIONS.ADD:
			return common.add(state, action);
		case ActionTypes.SELECTIONS.CLEAR.FEATURE_KEYS_FILTER:
			return clearFeatureKeysFilter(state, action.key);
		case ActionTypes.SELECTIONS.SET_ACTIVE_KEY:
			return common.setActive(state, action);
		case ActionTypes.SELECTIONS.SET.FEATURE_KEYS_FILTER.SET:
			return setFeatureKeysFilter(state, action.key, action.featureKeysFilter);
		case ActionTypes.SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS:
			return setFeatureKeysFilterKeys(state, action.key, action.featureKeys);
		default:
			return state;
	}
};
