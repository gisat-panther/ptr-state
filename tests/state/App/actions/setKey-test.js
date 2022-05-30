import actions from '../../../../src/state/App/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'setKey',
		action: (actions, actionTypes) => {
			return actions.setKey('k1');
		},
		dispatchedActions: [
			{
				type: 'APP.SET_KEY',
				key: 'k1',
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
describe(
	'state/App/actions/setKey',
	testBatchRunner(dataType, categoryPath, tests, actions, actionTypes)
);

export default tests;
