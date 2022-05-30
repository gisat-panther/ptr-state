import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'remove edited active model',
		test: (action, reducers) => {
			const {[state.activeKey]: key, ...restEditedByKey} = state.editedByKey;

			const expectedState = {
				...state,
				editedByKey: restEditedByKey,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedActive(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if there is no activeKey',
		test: (action, reducers) => {
			const state2 = {...state, activeKey: null};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEditedActive(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should not change state if active key is not part of editedByKey',
		test: (action, reducers) => {
			const state2 = {...state, activeKey: 'keyXY'};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEditedActive(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should not change state if no models present',
		test: (action, reducers) => {
			const state2 = {
				...state,
				editedByKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEditedActive(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should return null for editedByKey, if last model removed',
		action: {
			keys: ['key1', 'key201'],
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				editedByKey: {
					key1: {},
				},
			};

			const expectedState = {
				...state,
				editedByKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEditedActive(state2, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('removeEditedActive', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
