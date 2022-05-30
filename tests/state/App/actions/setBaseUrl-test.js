import actions from '../../../../src/state/App/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'setBaseUrl',
		action: (actions, actionTypes) => {
			return actions.setBaseUrl('http://localhost');
		},
		dispatchedActions: [
			{
				type: 'APP.SET_BASE_URL',
				url: 'http://localhost',
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
describe(
	'state/App/actions/setBaseUrl',
	testBatchRunner(dataType, categoryPath, tests, actions, actionTypes)
);

export default tests;
