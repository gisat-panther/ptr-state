import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should mark models as outdated',
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
						outdated: true,
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
							nameDisplay: 'Berty',
							nameInternal: 'Bert',
						},
						outdated: true,
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.dataSetOutdated(state, action);
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
				: commonReducers.dataSetOutdated(state2, action);
			assert.deepStrictEqual(returnedState, state2);
		},
	},
];

describe('dataSetOutdated', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
