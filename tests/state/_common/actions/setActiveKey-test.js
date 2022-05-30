import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch setActiveKey.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				let action;
				// for common testing
				if (actionTypes && options) {
					action = actions.setActiveKey(actionTypes);
				} else {
					action = actions.setActiveKey;
				}
				const key = 'k1';
				return action(key);
			};
		},
		getState: dataType => () => ({
			[dataType]: {activeKey: 'k2'},
		}),
		dispatchedActions: [
			{
				type: 'SET_ACTIVE_KEY',
				key: 'k1',
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'setActiveKey',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
