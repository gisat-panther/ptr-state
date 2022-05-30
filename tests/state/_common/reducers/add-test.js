import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should add models',
		action: {
			data: [
				{
					key: 'keyA',
					data: {
						nameInternal: 'Mili',
						nameDisplay: 'Milan',
					},
				},
				{
					key: 'keyB',
					data: {
						nameInternal: 'Tom',
						nameDisplay: 'Tomas',
					},
				},
			],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					...state.byKey,
					keyA: {
						key: 'keyA',
						data: {
							nameInternal: 'Mili',
							nameDisplay: 'Milan',
						},
					},
					keyB: {
						key: 'keyB',
						data: {
							nameInternal: 'Tom',
							nameDisplay: 'Tomas',
						},
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.add(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should update models',
		action: {
			data: [
				{
					key: 'key1',
					data: {
						nameInternal: 'Albicek',
					},
				},
				{
					key: 'key2',
					data: {
						nameInternal: 'Bertik',
					},
				},
			],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					...state.byKey,
					key1: {
						key: 'key1',
						data: {
							nameInternal: 'Albicek',
						},
						permissions: {
							guest: {
								get: true,
								update: true,
								delete: true,
							},
						},
					},
					key2: {
						key: 'key2',
						data: {
							nameInternal: 'Bertik',
						},
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.add(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should add models and delete outdated or unreceived',
		action: {
			data: [
				{
					key: 'keyA',
					data: {
						nameInternal: 'Mili',
						nameDisplay: 'Milan',
					},
					outdated: true,
				},
				{
					key: 'keyB',
					data: {
						nameInternal: 'Tom',
						nameDisplay: 'Tomas',
					},
					unreceived: true,
				},
			],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					...state.byKey,
					keyA: {
						key: 'keyA',
						data: {
							nameInternal: 'Mili',
							nameDisplay: 'Milan',
						},
					},
					keyB: {
						key: 'keyB',
						data: {
							nameInternal: 'Tom',
							nameDisplay: 'Tomas',
						},
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.add(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should return original state if no data given',
		action: {
			data: [],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.add(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('add', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
