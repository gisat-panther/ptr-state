import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should clear indexes by given filter and order',
		action: {
			filter: {
				scopeKey: 'scope1',
			},
			order: null,
		},
		test: (action, reducers) => {
			let index = {
				filter: {
					scopeKey: 'scope1',
				},
				order: null,
				count: null,
				index: null,
				changedOn: null,
				outdated: {1: 'A', 2: 'C', 3: 'B'},
				outdatedCount: 4,
			};

			let indexes = [...state.indexes];
			indexes[0] = index;

			const expectedState = {
				...state,
				indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.clearIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not modify state, if no index found for given filter & order',
		action: {
			filter: {
				scopeKey: 'scopeXY',
			},
			order: null,
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.clearIndex(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not modify state, if no indexes',
		action: {
			filter: {
				scopeKey: 'scope1',
			},
			order: null,
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				indexes: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.clearIndex(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
];

describe('clearIndex', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
