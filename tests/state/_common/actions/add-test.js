import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'Dispatch add and wrap data by array',
		action: (actions, actionTypes, options) => {
			let action;
			// for common testing
			if (actionTypes && options) {
				action = actions.add(actionTypes);
			} else {
				action = actions.add;
			}

			return action('data', 'filter');
		},
		dispatchedActions: [{type: 'ADD', data: ['data'], filter: 'filter'}],
	},
	{
		name: 'Dispatch add',
		action: (actions, actionTypes, options) => {
			let action;
			// for common testing
			if (actionTypes && options) {
				action = actions.add(actionTypes);
			} else {
				action = actions.add;
			}

			return action([{data: 'key1'}], 'filter');
		},
		dispatchedActions: [
			{type: 'ADD', data: [{data: 'key1'}], filter: 'filter'},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'add',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
