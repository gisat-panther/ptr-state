import actions from '../../../../src/state/App/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'add',
		action: (actions, actionTypes) => {
			return actions.add({p: 'v'});
		},
		dispatchedActions: [
			{
				type: 'APP.RECEIVE_CONFIGURATION',
				configuration: {p: 'v'},
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
describe(
	'state/App/actions/Add',
	testBatchRunner(dataType, categoryPath, tests, actions, actionTypes)
);

export default tests;
