import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should clear indexes',
		action: {},
		test: (action, reducers) => {
			let indexes = [...state.indexes].map(index => {
				return {
					...index,
					count: null,
					index: null,
					changedOn: null,
					outdated: index.index,
					outdatedCount: index.count,
				};
			});

			const expectedState = {
				...state,
				indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.clearIndexes(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not modify state, if no indexes',
		action: {},
		test: (action, reducers) => {
			const state2 = {
				...state,
				indexes: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.clearIndexes(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
];

describe('clearIndexes', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
