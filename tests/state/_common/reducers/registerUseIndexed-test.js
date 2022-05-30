import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should register unregistered usage',
		action: {
			componentId: 'ComponentA',
			filter: {
				scopeKey: 'scope1',
			},
			filterByActive: {
				place: true,
			},
			order: [['nameInternal', 'descending']],
			start: 1,
			length: 10,
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					indexes: {
						...state.inUse.indexes,
						ComponentA: [
							...state.inUse.indexes.ComponentA,
							{
								filter: {
									scopeKey: 'scope1',
								},
								filterByActive: {
									place: true,
								},
								order: [['nameInternal', 'descending']],
								start: 1,
								length: 10,
							},
						],
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.registerUseIndexed(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not register already registered usage',
		action: {
			componentId: 'ComponentA',
			filter: {
				scopeKey: 'scope1',
			},
			filterByActive: {
				place: true,
			},
			order: null,
			start: 1,
			length: 10,
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.registerUseIndexed(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('registerUseIndexed', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
