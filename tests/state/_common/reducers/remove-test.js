import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'remove models',
		action: {
			keys: ['key1'],
		},
		test: (action, reducers) => {
			const {key1, ...restByKey} = state.byKey;

			const expectedState = {
				...state,
				byKey: restByKey,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.remove(state, action);
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
				: commonReducers.remove(state, action);
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
				: commonReducers.remove(state, action);
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
				byKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.remove(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should return null for byKey, if last model removed',
		action: {
			keys: ['key1', 'key2'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: null,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.remove(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('remove', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
