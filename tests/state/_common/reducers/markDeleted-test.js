import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'mark a model as deleted',
		action: {
			key: 'key1',
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					...state.byKey,
					key1: {
						...state.byKey.key1,
						removed: true,
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.markDeleted(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not change state if no key given',
		action: {},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.markDeleted(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
	{
		name: 'should not change state if no model found',
		action: {
			key: 'keyXY',
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.markDeleted(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('markDeleted', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
