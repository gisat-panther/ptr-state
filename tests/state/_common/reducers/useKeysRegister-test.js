import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should register unregistered keys for existing component',
		action: {
			componentId: 'ComponentA',
			keys: ['key3', 'key4'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					keys: {
						...state.inUse.keys,
						ComponentA: ['key1', 'key2', 'key3', 'key4'],
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysRegister(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should register unregistered keys and omit registered for existing component',
		action: {
			componentId: 'ComponentA',
			keys: ['key2', 'key4'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					keys: {
						...state.inUse.keys,
						ComponentA: ['key1', 'key2', 'key4'],
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysRegister(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should register unregistered keys for new component',
		action: {
			componentId: 'ComponentC',
			keys: ['key3', 'key4'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				inUse: {
					...state.inUse,
					keys: {
						...state.inUse.keys,
						ComponentC: ['key3', 'key4'],
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysRegister(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not update state in no componentId given',
		action: {
			keys: ['key3', 'key4'],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysRegister(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not update state in no keys given',
		action: {
			componentId: 'ComponentC',
			keys: [],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.useKeysRegister(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('useKeysRegister', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
