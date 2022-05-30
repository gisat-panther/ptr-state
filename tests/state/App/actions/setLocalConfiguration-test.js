import actions from '../../../../src/state/App/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'setLocalConfiguration',
		action: (actions, actionTypes) => {
			return actions.setLocalConfiguration('pth', 'val');
		},
		dispatchedActions: [
			{
				type: 'APP.SET_LOCAL_CONFIGURATION',
				path: 'pth',
				value: 'val',
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
describe(
	'state/App/actions/setLocalConfiguration',
	testBatchRunner(dataType, categoryPath, tests, actions, actionTypes)
);

export default tests;
