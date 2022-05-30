import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialData/selectors';

describe('getIndexesObserver', function () {
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

	it('Should select all indexes', function () {
		const expectedResult = [...state.data.spatialData.indexes];
		assert.deepStrictEqual(selectors.getIndexesObserver(), expectedResult);
	});

	it('Should select empty object, if indexes are empty', function () {
		setState({data: {spatialData: {indexes: []}}});
		assert.deepStrictEqual(selectors.getIndexesObserver(), []);
	});

	after(function () {
		setState(null);
	});
});
