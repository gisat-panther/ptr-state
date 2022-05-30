import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'Dispatch actionGeneralError.',
		action: (actions, actionTypes) => {
			const action = actions.actionGeneralError('All is wrong.');
			return action;
		},
		dispatchedActions: [{type: 'ERROR'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'actionGeneralError',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
