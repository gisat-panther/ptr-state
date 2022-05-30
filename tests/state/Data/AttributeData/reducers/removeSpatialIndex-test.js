import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('removeSpatialIndex-test', function () {
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

	it('Should remove spatial index', function () {
		const expectedState = {
			...state,
			spatialIndexes: [],
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should not remove spatial index', function () {
		const action = {
			type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE',
			filter: {
				modifiers: {
					scopeKey: 'scope2',
				},
			},
			order: null,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, state);
	});
});
