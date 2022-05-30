import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'set active key',
		action: {
			key: 'key10',
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				activeKey: action.key,
				activeKeys: null,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.setActive(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'set null as active key',
		action: {
			key: null,
		},
		test: (action, reducers) => {
			const expectedState = {
				...state,
				activeKey: null,
				activeKeys: null,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.setActive(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
];

describe('setActive', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
