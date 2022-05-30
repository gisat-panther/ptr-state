import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch setActiveKeys.',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.setActiveKeys(actionTypes);
			} else {
				action = actions.setActiveKeys;
			}
			const keys = ['k1', 'k2'];
			return action(keys);
		},
		getState: dataType => () => ({
			[dataType]: {activeKeys: null},
		}),
		dispatchedActions: [
			{
				type: 'SET_ACTIVE_KEYS',
				keys: ['k1', 'k2'],
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'setActiveKeys',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
