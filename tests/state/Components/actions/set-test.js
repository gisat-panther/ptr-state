import componentsActions from '../../../../src/state/Components/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'set',
		action: (actions, actionTypes) => {
			return actions.set('cmp', 'k', 'v');
		},
		dispatchedActions: [
			{
				component: 'cmp',
				type: 'COMPONENTS.SET',
				path: 'k',
				value: 'v',
			},
		],
	},
];

const dataType = 'components';
const categoryPath = 'metadata';
describe(
	'state/Components/actions',
	testBatchRunner(dataType, categoryPath, tests, componentsActions, actionTypes)
);

export default tests;
