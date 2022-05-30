import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "USE.INDEXED.CLEAR".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useIndexedClear(actionTypes);
			} else {
				action = actions.useIndexedClear;
			}
			return action('map-window');
		},
		dispatchedActions: [{type: 'USE.INDEXED.CLEAR', componentId: 'map-window'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'useIndexedClear',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
