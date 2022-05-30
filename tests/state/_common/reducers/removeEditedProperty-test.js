import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'remove edited property',
		action: {
			key: 'key201',
			property: 'nameDisplay',
		},
		test: (action, reducers) => {
			const {nameDisplay, ...restData} = state.editedByKey.key201.data;

			const expectedState = {
				...state,
				editedByKey: {
					...state.editedByKey,
					key201: {
						...state.editedByKey.key201,
						data: restData,
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedProperty(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'remove edited model if no property in data left',
		action: {
			key: 'key1',
			property: 'nameDisplay',
		},
		test: (action, reducers) => {
			const {key1, ...restModels} = state.editedByKey;

			const expectedState = {
				...state,
				editedByKey: restModels,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedProperty(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no property found',
		action: {
			key: 'key1',
			property: 'nameX',
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedProperty(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no property given',
		action: {
			key: 'key1',
			property: null,
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedProperty(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no key given',
		action: {
			key: null,
			property: 'nameDisplay',
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedProperty(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no key found',
		action: {
			key: 'keyXY',
			property: 'nameDisplay',
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.removeEditedProperty(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no models present',
		action: {
			key: 'key1',
			property: 'nameDisplay',
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				editedByKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEditedProperty(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
	{
		name: 'should return null for editedByKey, if last model removed',
		action: {
			key: 'key7',
			property: 'nameDisplay',
		},
		test: (action, reducers) => {
			const state2 = {
				...state,
				editedByKey: {
					key7: {
						key: 'key7',
						data: {
							nameDisplay: 'A',
						},
					},
				},
			};
			const expectedState = {
				...state2,
				editedByKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.removeEditedProperty(state2, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('removeEditedProperty', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
