import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('addWithSpatialIndex-test', function () {
	const state = {
		...INITIAL_STATE,
		byDataSourceKey: {
			dataSourceKey1: {
				feature1: 2,
			},
		},
		spatialIndexes: [
			{
				filter: {
					modifiers: {
						scopeKey: 'scope1',
					},
				},
				order: null,
				changedOn: null,
				index: {
					7: {
						'2.8125, 50.625': {
							dataSourceKey1: ['feature1'],
						},
					},
				},
			},
		],
	};

	it('Should add data with spatial index', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				dataSourceKey3: {
					feature7: 'A',
				},
			},
			spatialIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
				{
					filter: {
						modifiers: {
							scopeKey: 'scope2',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey3: ['feature7'],
							},
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX',
			data: {
				feature7: 'A',
			},
			filter: {
				modifiers: {
					scopeKey: 'scope2',
				},
			},
			indexData: [
				{
					7: {
						'2.8125, 50.625': {
							dataSourceKey3: ['feature7'],
						},
					},
				},
			],
			order: null,
			attributeDataSourceKey: 'dataSourceKey3',
			changedOn: null,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});
});
