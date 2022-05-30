import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'set active keys',
		action: {
			keys: ['key10', 'key11'],
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				activeKeys: action.keys,
				activeKey: null,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.setActiveMultiple(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'set null as active keys',
		action: {
			keys: null,
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				activeKey: null,
				activeKeys: null,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.setActiveMultiple(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('setActiveMultiple', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
