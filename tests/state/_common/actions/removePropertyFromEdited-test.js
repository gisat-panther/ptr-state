import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "USE.KEYS.CLEAR".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.removePropertyFromEdited(actionTypes);
			} else {
				action = actions.removePropertyFromEdited;
			}

			const model = 'view';
			const key = '11';
			return action(model, key);
		},
		dispatchedActions: [
			{type: 'EDITED.REMOVE_PROPERTY', key: 'view', property: '11'},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'removePropertyFromEdited',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
