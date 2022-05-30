import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialData/selectors';

describe('getIndexedFeatureKeys', function () {
	const state = {
		data: {
			spatialData: {
				byDataSourceKey: {
					dataSource1: {
						featureKey1: {
							geometries: {
								7: {
									type: 'Point',
									coordinates: [15.5, 20.1],
								},
							},
						},
						featureKey3: {
							geometries: {
								7: {
									type: 'Point',
									coordinates: [10.5, 14],
								},
							},
						},
					},
					dataSource2: {
						featureKey2: {
							geometries: {
								7: {
									type: 'Point',
									coordinates: [15.6, 20.2],
								},
							},
						},
					},
				},
				indexes: [
					{
						filter: {
							modifiers: {
								scopeKey: 'scope1',
							},
						},
						index: {
							7: {
								'15.5,20.1': {
									dataSource1: ['featureKey1'],
									dataSource2: ['featureKey2'],
									dataSource3: [],
								},
								'10,14': {
									dataSource1: ['featureKey3'],
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

	it('Should return indexed feature keys', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const level = 7;
		const tile = '15.5,20.1';
		const dataSourceKey = 'dataSource2';

		const expectedResult = ['featureKey2'];

		assert.deepStrictEqual(
			selectors.getIndexedFeatureKeys(filter, level, tile, dataSourceKey),
			expectedResult
		);
	});

	it('Should return null, if no matching index', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scopeXY',
			},
		};

		const level = 7;
		const tile = '15.5,20.1';
		const dataSourceKey = 'dataSource2';
		assert.isNull(
			selectors.getIndexedFeatureKeys(filter, level, tile, dataSourceKey)
		);
	});

	it('Should return null, if no feature keys for given params', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const level = 8;
		const tile = '15.5,20.1';
		const dataSourceKey = 'dataSource2';
		assert.isNull(
			selectors.getIndexedFeatureKeys(filter, level, tile, dataSourceKey)
		);
	});

	it('Should return null, if empty feature keys for given params', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const level = 8;
		const tile = '15.5,20.1';
		const dataSourceKey = 'dataSource3';
		assert.isNull(
			selectors.getIndexedFeatureKeys(filter, level, tile, dataSourceKey)
		);
	});

	after(function () {
		setState(null);
	});

	it('Should return null, if one of params is missing', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const level = 8;
		const tile = '15.5,20.1';
		const dataSourceKey = 'dataSource3';
		assert.isNull(
			selectors.getIndexedFeatureKeys(filter, null, tile, dataSourceKey)
		);
		assert.isNull(
			selectors.getIndexedFeatureKeys(filter, level, null, dataSourceKey)
		);
		assert.isNull(selectors.getIndexedFeatureKeys(filter, level, tile));
	});

	after(function () {
		setState(null);
	});
});
