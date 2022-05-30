import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should left only models with get permissions for guest',
		action: {},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					key1: {
						key: 'key1',
						data: {
							nameDisplay: 'Albi',
							nameInternal: 'Albert',
						},
						permissions: {
							guest: {
								get: true,
								update: true,
								delete: true,
							},
						},
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.cleanupOnLogout(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not modify the state, if no models present',
		action: {},
		test: (action, reducers) => {
			const state2 = {
				...state,
				byKey: null,
			};
			const returnedState = reducers
				? reducers(state2, action)
				: commonReducers.cleanupOnLogout(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
];

describe('cleanupOnLogout', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
