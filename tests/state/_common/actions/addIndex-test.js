import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch addIndex.',
		action: (actions, actionTypes, options) => {
			let action;
			// for common testing
			if (actionTypes && options) {
				action = actions.addIndex(actionTypes);
			} else {
				action = actions.addIndex;
			}

			const filter = {};
			const order = null;
			const count = 5;
			const start = 1;
			const data = [{key: 'k1'}];
			const changedOn = '2020-01-01';
			const limit = 9;

			return action(filter, order, count, start, data, changedOn, limit);
		},
		dispatchedActions: [
			{
				type: 'INDEX.ADD',
				count: 5,
				limit: 9,
				changedOn: '2020-01-01',
				filter: {},
				order: null,
				start: 1,
				data: [{key: 'k1'}],
			},
		],
	},
	{
		name: 'It dispatch addIndex without limit.',
		action: (actions, actionTypes, options) => {
			let action;
			// for common testing
			if (actionTypes && options) {
				action = actions.addIndex(actionTypes);
			} else {
				action = actions.addIndex;
			}

			const filter = {};
			const order = null;
			const count = 5;
			const start = 1;
			const data = [{key: 'k1'}];
			const changedOn = '2020-01-01';

			return action(filter, order, count, start, data, changedOn);
		},
		dispatchedActions: [
			{
				type: 'INDEX.ADD',
				count: 5,
				changedOn: '2020-01-01',
				filter: {},
				order: null,
				start: 1,
				data: [{key: 'k1'}],
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'addIndex',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
