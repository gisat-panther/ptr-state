import {assert} from 'chai';
import {findIndex as _findIndex, isEqual as _isEqual} from 'lodash';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should add new index',
		action: {
			data: [
				{
					key: 'K',
					data: {
						nameInternal: 'Karlos',
					},
				},
				{
					key: 'L',
					data: {
						nameInternal: 'Lucas',
					},
				},
			],
			filter: {
				scopeKey: 'scope101',
			},
			start: 3,
			limit: 2,
			count: 4,
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				indexes: [
					...state.indexes,
					{
						filter: {
							scopeKey: 'scope101',
						},
						order: null,
						changedOn: null,
						count: 4,
						index: {3: 'K', 4: 'L'},
					},
				],
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should update existing index',
		action: {
			data: [
				{
					key: 'K',
					data: {
						nameInternal: 'Karlos',
					},
				},
				{
					key: 'L',
					data: {
						nameInternal: 'Lucas',
					},
				},
			],
			filter: {
				scopeKey: 'scope1',
			},
			order: null,
			start: 3,
			limit: 2,
			count: 4,
		},
		test: (action, reducers) => {
			const filter = {
				scopeKey: 'scope1',
			};
			const order = null;

			const indexes = [...state.indexes];
			const indexOfIndex = _findIndex(state.indexes, index => {
				return _isEqual(index.filter, filter) && _isEqual(index.order, order);
			});

			indexes[indexOfIndex] = {
				filter: {
					scopeKey: 'scope1',
				},
				order: null,
				changedOn: null,
				count: 4,
				index: {1: 'A', 2: 'C', 3: 'K', 4: 'L'},
			};

			const expectedState = {
				...state,
				indexes: indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should remove loading indicator if data did not come',
		action: {
			data: [],
			filter: {
				scopeKey: 'scope2',
			},
			order: null,
			start: 4,
			limit: 3,
			count: 6,
		},
		test: (action, reducers) => {
			const filter = {
				scopeKey: 'scope2',
			};
			const order = null;

			const indexes = [...state.indexes];
			const indexOfIndex = _findIndex(state.indexes, index => {
				return _isEqual(index.filter, filter) && _isEqual(index.order, order);
			});

			indexes[indexOfIndex] = {
				filter: {
					scopeKey: 'scope2',
				},
				order: null,
				changedOn: null,
				count: 6,
				index: {1: 'A', 2: 'B', 3: 'C'},
			};

			const expectedState = {
				...state,
				indexes: indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should remove just part of loading indicators',
		action: {
			data: [],
			filter: {
				scopeKey: 'scope2',
			},
			order: null,
			start: 4,
			limit: 2,
			count: 6,
		},
		test: (action, reducers) => {
			const filter = {
				scopeKey: 'scope2',
			};
			const order = null;

			const indexes = [...state.indexes];
			const indexOfIndex = _findIndex(state.indexes, index => {
				return _isEqual(index.filter, filter) && _isEqual(index.order, order);
			});

			indexes[indexOfIndex] = {
				filter: {
					scopeKey: 'scope2',
				},
				order: null,
				changedOn: null,
				count: 6,
				index: {1: 'A', 2: 'B', 3: 'C', 6: true},
			};

			const expectedState = {
				...state,
				indexes: indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'do not mutate state if no data',
		action: {
			data: null,
			filter: {
				scopeKey: 'scope2',
			},
			order: null,
			start: 4,
			limit: 3,
			count: 6,
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'Create new index with count 0',
		action: {
			data: [],
			filter: {
				scopeKey: 'scope88',
			},
			order: null,
			start: 4,
			limit: 2,
			count: 0,
		},
		test: (action, reducers) => {
			const indexes = [
				...state.indexes,
				{
					filter: {
						scopeKey: 'scope88',
					},
					order: null,
					count: 0,
					index: {},
					changedOn: null,
				},
			];

			const expectedState = {
				...state,
				indexes: indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'Modify index with count 0',
		action: {
			data: [],
			filter: {
				scopeKey: 'scope4',
			},
			order: null,
			start: 4,
			limit: 2,
			count: 0,
		},
		test: (action, reducers) => {
			const filter = {
				scopeKey: 'scope4',
			};
			const order = null;
			const indexes = [...state.indexes];
			const indexOfIndex = _findIndex(state.indexes, index => {
				return _isEqual(index.filter, filter) && _isEqual(index.order, order);
			});

			indexes[indexOfIndex] = {
				filter: {
					scopeKey: 'scope4',
				},
				order: null,
				count: 0,
				index: {},
				changedOn: null,
			};

			const expectedState = {
				...state,
				indexes: indexes,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addIndex(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('addIndex', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
