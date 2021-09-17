import {assert} from 'chai';
import helpers from '../../../../../src/state/Data/SpatialData/helpers';

describe('state/Data/SpatialData/actions/helpers/isSpatialDataTiled', function () {
	it('Spatial data are not tiled', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					1: {
						type: 'Point',
						coordinates: [0, 0],
					},
				},
			},
		};

		const isTiled = helpers.isSpatialDataTiled(spatialData);

		assert.deepEqual(isTiled, false);
	});
	it('Spatial data are tiled', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
			'd8e72383-d72e-4a62-b23b-cc240e198d2e': {
				spatialIndex: {
					7: {
						'0,1': [18503],
					},
				},
			},
		};

		const isTiled = helpers.isSpatialDataTiled(spatialData);

		assert.deepEqual(isTiled, true);
	});
});
