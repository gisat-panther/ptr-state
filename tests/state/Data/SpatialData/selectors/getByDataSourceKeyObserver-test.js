import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialData/selectors';

describe('getByDataSourceKeyObserver', function () {
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

	it('Should select sata for given key', function () {
		const expectedResult = {
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
		};

		assert.deepStrictEqual(
			selectors.getByDataSourceKeyObserver('dataSource1'),
			expectedResult
		);
	});

	it('Should return null, if there is no record for given data source key', function () {
		assert.isNull(selectors.getByDataSourceKeyObserver('dataSourceXY'));
	});

	after(function () {
		setState(null);
	});
});
