import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "USE.INDEXED.CLEAR_ALL".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useIndexedClearAll(actionTypes);
			} else {
				action = actions.useIndexedClearAll;
			}
			return action();
		},
		dispatchedActions: [{type: 'USE.INDEXED.CLEAR_ALL'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'useIndexedClearAll',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
