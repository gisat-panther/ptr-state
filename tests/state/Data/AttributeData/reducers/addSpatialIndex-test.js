import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('addSpatialIndex-test', function () {
	const state = {
		...INITIAL_STATE,
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

	it('Should add spatial index', function () {
		const expectedState = {
			...state,
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
			type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
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
			changedOn: null,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});
});
