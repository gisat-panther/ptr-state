import actions from '../../../../src/state/AreaRelations/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch receiveIndexed.',
		action: (actions, actionTypes, options) => {
			const action = actions.receiveIndexed(
				[
					{
						[options.dataType]: [{key: 'k1'}],
					},
				],
				'fil',
				'asc',
				1,
				1,
				'2020-01-01'
				// options.dataType,
			);

			return action;
		},
		dispatchedActions: [
			{
				type: 'AREA_RELATIONS.ADD',
				data: [{testStore: [{key: 'k1'}]}],
				filter: 'fil',
			},
			{
				type: 'AREA_RELATIONS.INDEX.ADD',
				count: 1,
				changedOn: '2020-01-01',
				filter: 'fil',
				order: 'asc',
				start: 1,
				data: [{testStore: [{key: 'k1'}]}],
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
const store = 'AREA_RELATIONS';
describe(
	'receiveIndexed',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		actionTypes,
		null,
		store
	)
);

export default tests;
