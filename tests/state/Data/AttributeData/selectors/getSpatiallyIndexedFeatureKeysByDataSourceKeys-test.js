import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getSpatiallyIndexedFeatureKeysByDataSourceKeys', function () {
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

	it('Should select feature keys by data source key', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const level = 7;
		const tile = '2.815,15.125';
		const expectedResult = {
			dataSourceKey1: ['featureKey1', 'featureKey2'],
		};

		assert.deepStrictEqual(
			selectors.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
				filter,
				level,
				tile
			),
			expectedResult
		);
	});

	it('Should return null, if there is matching index', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scopeXY',
			},
		};
		const level = 7;
		const tile = '2.815,15.125';

		assert.isNull(
			selectors.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
				filter,
				level,
				tile
			)
		);
	});

	it('Should return null, if there is no indexed data yet', function () {
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
							index: {},
						},
					],
				},
			},
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const level = 7;
		const tile = '2.815,15.125';

		setState(state);
		assert.isNull(
			selectors.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
				filter,
				level,
				tile
			)
		);
	});

	it('Should return null, if there is no indexed data for given level', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const level = 6;
		const tile = '2.815,15.125';

		assert.isNull(
			selectors.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
				filter,
				level,
				tile
			)
		);
	});

	it('Should return null, if there is no indexed data for given tile', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const level = 7;
		const tile = '3.815,15.125';

		assert.isNull(
			selectors.getSpatiallyIndexedFeatureKeysByDataSourceKeys(
				filter,
				level,
				tile
			)
		);
	});

	after(function () {
		setState(null);
	});
});
