import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "USE.KEYS.CLEAR".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useKeysClear(actionTypes);
			} else {
				action = actions.useKeysClear;
			}
			return action('map-window');
		},
		dispatchedActions: [{type: 'USE.KEYS.CLEAR', componentId: 'map-window'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'useKeysClear',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
