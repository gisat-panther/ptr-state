import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialData/reducers';

describe('addWithIndex-test', function () {
	const state = {
		...INITIAL_STATE,
		indexes: [
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
			indexes: [],
		};

		const action = {
			type: 'DATA.SPATIAL_DATA.INDEX.REMOVE',
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
});
