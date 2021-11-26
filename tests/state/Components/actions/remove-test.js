import componentsActions from '../../../../src/state/Components/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'remove with path',
		action: (actions, actionTypes) => {
			return actions.remove('cmp', 'path');
		},
		dispatchedActions: [
			{
				type: 'COMPONENTS.REMOVE',
				component: 'cmp',
				path: 'path',
			},
		],
	},
	{
		name: 'remove without path',
		action: (actions, actionTypes) => {
			return actions.remove('cmp');
		},
		dispatchedActions: [
			{
				type: 'COMPONENTS.REMOVE',
				component: 'cmp',
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
