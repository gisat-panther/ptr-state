import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'clear registered usage',
		action: {
			componentId: 'ComponentA',
		},
		test: (action, reducers) => {
			const {ComponentA, ...restInUseIndexes} = state.inUse.indexes;

			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					indexes: restInUseIndexes,
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useIndexedClear(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no component given',
		action: {},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useIndexedClear(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no usage found',
		action: {
			componentId: 'ComponentXY',
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useIndexedClear(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no usages registered',
		action: {
			componentId: 'ComponentA',
		},
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
				: commonReducers.useIndexedClear(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should return null for indexed, if last usage was removed',
		action: {
			componentId: 'ComponentA',
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				inUse: {
					...state.inUse,
					indexes: {
						ComponentA: {
							a: 'A',
						},
					},
				},
			};
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					indexes: null,
				},
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.useIndexedClear(state2, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('useIndexedClear', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
