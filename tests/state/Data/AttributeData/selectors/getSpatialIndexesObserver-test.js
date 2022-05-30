import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getSpatialIndexesObserver', function () {
	const state = {
		data: {
			attributeData: {
				byDataSourceKey: {
					dataSourceKey1: {
						featureKey1: 'A',
						featureKey2: 'B',
					},
					dataSourceKey2: {
						featureKey1: 17.12,
						featureKey2: 10,
						featureKey3: 11.17,
					},
				},
				spatialIndexes: [
					{
						filter: {
							modifiers: {
								scopeKey: 'scope1',
							},
						},
						index: {
							7: {
								'2.815,15.125': {
									dataSourceKey1: ['featureKey1', 'featureKey2'],
								},
							},
						},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select all indexes', function () {
		const expectedResult = [...state.data.attributeData.spatialIndexes];

		assert.deepStrictEqual(
			selectors.getSpatialIndexesObserver(),
			expectedResult
		);
	});

	it('Should select empty array, if indexes is empty', function () {
		setState({data: {attributeData: {spatialIndexes: []}}});
		assert.deepStrictEqual(selectors.getSpatialIndexesObserver(), []);
	});

	after(function () {
		setState(null);
	});
});
