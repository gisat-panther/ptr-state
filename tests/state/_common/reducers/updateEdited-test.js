import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'add new edited models',
		action: {
			data: [
				{
					key: 'key3',
					data: {
						nameDisplay: 'name',
					},
				},
			],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				editedByKey: {...state.editedByKey, key3: action.data[0]},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.updateEdited(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'add new edited models and update current',
		action: {
			data: [
				{
					key: 'key3',
					data: {
						nameDisplay: 'name',
					},
				},
				{
					key: 'key1',
					data: {
						nameDisplay: 'A',
					},
				},
			],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				editedByKey: {
					key1: {
						key: 'key1',
						data: {
							nameDisplay: 'A',
						},
					},
					key201: {
						key: 'key201',
						data: {
							nameInternal: 'Cyril',
							nameDisplay: 'Cyr',
						},
					},
					key3: {
						key: 'key3',
						data: {
							nameDisplay: 'name',
						},
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.updateEdited(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no data given',
		action: {
			data: [],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEdited(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('updateEdited', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
