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
			const {ComponentA, ...restInUseKeys} = state.inUse.keys;

			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					keys: restInUseKeys,
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysClear(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no component given',
		action: {},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysClear(state, action);
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
				: commonReducers.useKeysClear(state, action);
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
					keys: null,
				},
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.useKeysClear(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should return null for keys, if last usage was removed',
		action: {
			componentId: 'ComponentA',
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				inUse: {
					...state.inUse,
					keys: {
						ComponentA: ['key1'],
					},
				},
			};
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					keys: null,
				},
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.useKeysClear(state2, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('useKeysClear', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
