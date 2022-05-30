import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "INDEX.CLEAR_INDEX".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.clearIndex(actionTypes);
			} else {
				action = actions.clearIndex;
			}
			return action({key: {in: ['123']}}, null);
		},
		dispatchedActions: [
			{type: 'INDEX.CLEAR_INDEX', filter: {key: {in: ['123']}}, order: null},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'clearIndex',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
