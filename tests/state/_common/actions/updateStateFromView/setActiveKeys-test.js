import commonActions from '../../../../../src/state/_common/actions';
import testBatchRunner from '../../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../../constants';

const tests = [
	{
		name: 'It dispatch "SET_ACTIVE_KEYS",',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				// common action calls updateSubstateFromView, but action in store has name updateStateFromView
				action = actions.updateSubstateFromView(actionTypes);
			} else {
				action = actions.updateStateFromView;
			}
			return action({activeKeys: ['ak1', 'ak2']});
		},
		dispatchedActions: [{type: 'SET_ACTIVE_KEYS', keys: ['ak1', 'ak2']}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'updateStateFromView/setActiveKeys',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
