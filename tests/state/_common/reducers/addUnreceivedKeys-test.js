import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should add unreceived models',
		action: {
			keys: ['keyA', 'keyB'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					...state.byKey,
					keyA: {
						key: 'keyA',
						unreceived: true,
					},
					keyB: {
						key: 'keyB',
						unreceived: true,
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addUnreceivedKeys(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should rewrite existing models',
		action: {
			keys: ['key1'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				byKey: {
					...state.byKey,
					key1: {
						key: 'key1',
						unreceived: true,
					},
				},
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addUnreceivedKeys(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should return original state if no keys given',
		action: {
			keys: [],
		},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.addUnreceivedKeys(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('addUnreceivedKeys', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
