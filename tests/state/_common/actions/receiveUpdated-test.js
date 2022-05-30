import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch receiveUpdated without any updates.',
		action: (actions, actionTypes, options) => {
			const result = {data: {[options.dataType]: []}};

			const action = actions.receiveUpdated(
				options.getSubstate,
				actionTypes,
				result,
				[options.dataType],
				options.categoryPath
			);

			return action;
		},
		getState: dataType => () => ({
			[dataType]: {},
		}),
		dispatchedActions: [],
	},
	{
		name: 'It dispatch receiveUpdated with some updates.',
		action: (actions, actionTypes, options) => {
			const result = {
				data: {
					[options.dataType]: [
						{
							key: 'k1',
							data: {
								propScalarSame: 'propScalarSame',
								propScalarChanged: 'propScalarChanged2',
								propObjSame: {same: 'same'},
								propObjChanged: {changed: 'changed2'},
								propArrSame: ['same'],
								propArrChanged: ['changed2'],
							},
						},
					],
				},
			};

			const action = actions.receiveUpdated(
				options.getSubstate,
				actionTypes,
				result,
				[options.dataType],
				options.categoryPath
			);

			return action;
		},
		getState: dataType => () => ({
			[dataType]: {
				editedByKey: {
					k1: {
						key: 'k1',
						data: {
							propScalarSame: 'propScalarSame',
							propScalarChanged: 'propScalarChanged',
							propObjSame: {same: 'same'},
							propObjChanged: {changed: 'changed'},
							propArrSame: ['same'],
							propArrChanged: ['changed'],
						},
					},
				},
			},
		}),
		dispatchedActions: [
			{
				type: 'ADD',
				filter: undefined,
				data: [
					{
						key: 'k1',
						data: {
							propScalarSame: 'propScalarSame',
							propScalarChanged: 'propScalarChanged2',
							propObjSame: {same: 'same'},
							propObjChanged: {changed: 'changed2'},
							propArrSame: ['same'],
							propArrChanged: ['changed2'],
						},
					},
				],
			},
			{
				key: 'k1',
				property: 'propScalarSame',
				type: 'EDITED.REMOVE_PROPERTY',
			},
			{key: 'k1', property: 'propObjSame', type: 'EDITED.REMOVE_PROPERTY'},
			{key: 'k1', property: 'propArrSame', type: 'EDITED.REMOVE_PROPERTY'},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'receiveUpdated',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
