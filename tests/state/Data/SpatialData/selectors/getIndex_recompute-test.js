import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialData/selectors';

describe('getIndex_recompute', function () {
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

	it('Should return index', function () {
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
					'15.5,20.1': {
						dataSource1: ['featureKey1'],
						dataSource2: ['featureKey2'],
					},
					'10,14': {
						dataSource1: ['featureKey3'],
					},
				},
			},
		};

		assert.deepStrictEqual(
			selectors.getIndex_recompute(filter, order),
			expectedResult
		);
	});

	it('Should return null, if no matching index', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scopeXY',
			},
		};

		const order = null;
		assert.isNull(selectors.getIndex_recompute(filter, order));
	});

	it('Should return null, if no indexes present', function () {
		setState({data: {spatialData: {indexes: null}}});
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const order = null;
		assert.isNull(selectors.getIndex_recompute(filter, order));
	});

	after(function () {
		setState(null);
	});
});
