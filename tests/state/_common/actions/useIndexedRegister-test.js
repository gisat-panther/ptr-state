import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "USE.INDEXED.REGISTER".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useIndexedRegister(actionTypes);
			} else {
				action = actions.useIndexedRegister;
			}

			const componentId = 'placeSelect';
			const filterByActive = {
				place: true,
			};
			const filter = {};
			const order = null;
			const start = 10;
			const length = 5;
			return action(componentId, filterByActive, filter, order, start, length);
		},
		dispatchedActions: [
			{
				type: 'USE.INDEXED.REGISTER',
				componentId: 'placeSelect',
				filterByActive: {
					place: true,
				},
				filter: {},
				order: null,
				start: 10,
				length: 5,
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'useIndexedRegister',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
