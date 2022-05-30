import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

const tests = [
	{
		name: 'should update whole store',
		action: {
			byKey: {
				a: {
					key: 'A',
				},
			},
			indexes: null,
			inUse: null,
			editedByKey: null,
		},
		test: (action, reducers) => {
			const {type, ...rest} = action;
			const expectedState = {
				...state,
				...rest,
			};
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.updateStore(state, action);
			assert.deepStrictEqual(returnedState, expectedState);
		},
	},
	{
		name: 'should not modify state, if no data given',
		action: {},
		test: (action, reducers) => {
			const returnedState = reducers
				? reducers(state, action)
				: commonReducers.updateStore(state, action);
			assert.deepStrictEqual(returnedState, state);
		},
	},
];

describe('updateStore', () => {
	tests.forEach(test => {
		it(test.name, () => test.test(test.action));
	});
});

export default tests;
