import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "UPDATE_STORE" with data.',
		action: (actions, actionTypes, options) => {
			let action;
			if (actionTypes) {
				action = actions.updateStore(options.getSubstate, actionTypes);
			} else {
				action = actions.updateStore;
			}
			return action({activeKey: '33'});
		},
		dispatchedActions: [{type: 'UPDATE_STORE', activeKey: '33'}],
	},
	{
		name: 'It dispatch "UPDATE_STORE" with data _2.',
		action: (actions, actionTypes, options) => {
			let action;
			if (actionTypes) {
				action = actions.updateStore(options.getSubstate, actionTypes);
			} else {
				action = actions.updateStore;
			}
			return action({data: {activeKey: '33'}});
		},
		dispatchedActions: [{type: 'UPDATE_STORE', data: {activeKey: '33'}}],
	},
	{
		name: 'It dispatch "UPDATE_STORE" with null data.',
		action: (actions, actionTypes, options) => {
			let action;
			if (actionTypes) {
				action = actions.updateStore(options.getSubstate, actionTypes);
			} else {
				action = actions.updateStore;
			}
			return action(null);
		},
		dispatchedActions: [{type: 'UPDATE_STORE'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'updateStore',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
