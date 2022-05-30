import actions from '../../../../src/state/App/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'updateLocalConfiguration',
		action: (actions, actionTypes) => {
			return actions.updateLocalConfiguration('update');
		},
		dispatchedActions: [
			{
				type: 'APP.UPDATE_LOCAL_CONFIGURATION',
				update: 'update',
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
describe(
	'state/App/actions/updateLocalConfiguration',
	testBatchRunner(dataType, categoryPath, tests, actions, actionTypes)
);

export default tests;
