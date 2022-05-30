import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch receiveIndexed.',
		action: (actions, actionTypes, options) => {
			const action = actions.receiveIndexed(
				actionTypes,
				{
					data: {[options.dataType]: [{key: 'k1'}]},
					total: 1,
					changes: {
						[options.dataType]: '2020-01-01',
					},
				},
				options.dataType,
				'fil',
				'asc',
				1
			);

			return action;
		},
		dispatchedActions: [
			{
				type: 'ADD',
				data: [{key: 'k1'}],
				filter: 'fil',
			},
			{
				type: 'INDEX.ADD',
				count: 1,
				changedOn: '2020-01-01',
				filter: 'fil',
				order: 'asc',
				start: 1,
				data: [{key: 'k1'}],
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'receiveIndexed',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
