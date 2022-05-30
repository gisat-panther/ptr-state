import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'Dispatch creator.',
		action: (actions, actionTypes) => {
			const action = (...args) => ({
				type: 'action',
				args,
			});

			return actions.creator(action)(actionTypes)('arg1');
		},
		dispatchedActions: [{type: 'action', args: [actionTypes, 'arg1']}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'creator',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
