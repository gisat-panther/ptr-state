import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getSpatialIndex_recompute', function () {
	const state = {
		data: {
			attributeData: {
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

	it('Should select index for given filter', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const order = null;
		const expectedResult = {
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
		};

		assert.deepStrictEqual(
			selectors.getSpatialIndex_recompute(filter, order),
			expectedResult
		);
	});

	it('Should return null if there is no indexes', function () {
		setState({data: {attributeData: {spatialIndexes: []}}});
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const order = null;
		assert.isNull(selectors.getSpatialIndex_recompute(filter, order));
	});

	it('Should return null if there is no match', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		assert.isNull(selectors.getSpatialIndex_recompute(filter, null));
	});

	after(function () {
		setState(null);
	});
});
