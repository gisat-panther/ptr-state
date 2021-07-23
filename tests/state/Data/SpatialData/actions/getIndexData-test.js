import {assert} from 'chai';
import actions from '../../../../../src/state/Data/SpatialData/actions';

describe('state/Data/SpatialData/actions/getIndexData', function () {
	it('Create index for one datasource', function () {
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

		const index = actions.getIndexData(spatialData);

		assert.deepEqual(
			index,

			{
				'85e35be5-1706-402a-86ad-851397bae7aa': ['1'],
			}
		);
	});

	it('Create index for two datasource', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					1: {
						type: 'Point',
						coordinates: [0, 0],
					},
					2: {
						type: 'Point',
						coordinates: [3, 3],
					},
				},
			},
			'd8e72383-d72e-4a62-b23b-cc240e198d2e': {
				data: {
					BBB: {
						type: 'Point',
						coordinates: [1, 1],
					},
				},
			},
		};

		const index = actions.getIndexData(spatialData);

		assert.deepEqual(
			index,

			{
				'85e35be5-1706-402a-86ad-851397bae7aa': ['1', '2'],
				'd8e72383-d72e-4a62-b23b-cc240e198d2e': ['BBB'],
			}
		);
	});
});
