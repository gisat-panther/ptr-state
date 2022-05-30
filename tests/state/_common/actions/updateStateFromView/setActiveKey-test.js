import commonActions from '../../../../../src/state/_common/actions';
import testBatchRunner from '../../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../../constants';

const tests = [
	{
		name: 'It dispatch "SET_ACTIVE_KEY",',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				// common action calls updateSubstateFromView, but action in store has name updateStateFromView
				action = actions.updateSubstateFromView(actionTypes);
			} else {
				action = actions.updateStateFromView;
			}
			return action({activeKey: 'ak'});
		},
		dispatchedActions: [{type: 'SET_ACTIVE_KEY', key: 'ak'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'updateStateFromView/setActiveKey',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
