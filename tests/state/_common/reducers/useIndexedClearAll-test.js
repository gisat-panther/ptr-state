import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'clear all registered usages',
		action: {},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					indexes: null,
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useIndexedClearAll(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no usages registered',
		action: {},
		test: (action, reducers) => {
			const state2 = {
				...state,
				inUse: {
					...state.inUse,
					indexes: null,
				},
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.useIndexedClearAll(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
];

describe('useIndexedClearAll', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
