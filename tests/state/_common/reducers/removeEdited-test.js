import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'remove edited models',
		action: {
			keys: ['key1'],
		},
		test: (action, reducers) => {
			const {key1, ...restEditedByKey} = state.editedByKey;

			const expectedState = {
				...state,
				editedByKey: restEditedByKey,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEdited(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no keys given',
		action: {
			keys: [],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEdited(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if keys not found',
		action: {
			keys: ['keyXY'],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEdited(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no models present',
		action: {
			keys: ['key1'],
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				editedByKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEdited(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should return null for byKey, if last model removed',
		action: {
			keys: ['key1', 'key201'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				editedByKey: null,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEdited(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('removeEdited', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
