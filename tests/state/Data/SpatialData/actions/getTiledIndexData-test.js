import {assert} from 'chai';
import actions from '../../../../../src/state/Data/SpatialData/actions';

describe('state/Data/SpatialData/actions/getTiledIndexData', function () {
	it('Create index for one datasource', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
		};

		const index = actions.getTiledIndexData(spatialData);

		assert.deepEqual(
			index,

			{
				7: {
					'0,1': {
						'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
					},
				},
			}
		);
	});

	it('Dispatch ADD_WITH_SPATIAL_INDEX two datasource on same tile', function () {
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

		const index = actions.getTiledIndexData(spatialData);

		assert.deepEqual(index, {
			7: {
				'0,1': {
					'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
					'd8e72383-d72e-4a62-b23b-cc240e198d2e': [18503],
				},
			},
		});
	});

	it('Dispatch ADD_WITH_SPATIAL_INDEX two datasource on different tiles', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				spatialIndex: {
					7: {
						'0,-45.999999': [18502],
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

		const index = actions.getTiledIndexData(spatialData);

		assert.deepEqual(index, {
			7: {
				'0,-45.999999': {
					'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
				},
				'0,1': {
					'd8e72383-d72e-4a62-b23b-cc240e198d2e': [18503],
				},
			},
		});
	});

	it('Dispatch ADD_WITH_SPATIAL_INDEX two datasource on different tiles and zoom levels', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				spatialIndex: {
					7: {
						'0,-45.999999': [18502],
						'0,1': [18505],
					},
				},
			},

			'd8e72383-d72e-4a62-b23b-cc240e198d2e': {
				spatialIndex: {
					7: {
						'0,-45.999999': [18504],
					},
					8: {
						'0,1': [18503],
					},
				},
			},
		};

		const index = actions.getTiledIndexData(spatialData);

		assert.deepEqual(index, {
			7: {
				'0,-45.999999': {
					'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
					'd8e72383-d72e-4a62-b23b-cc240e198d2e': [18504],
				},
				'0,1': {
					'85e35be5-1706-402a-86ad-851397bae7aa': [18505],
				},
			},
			8: {
				'0,1': {
					'd8e72383-d72e-4a62-b23b-cc240e198d2e': [18503],
				},
			},
		});
	});
});
