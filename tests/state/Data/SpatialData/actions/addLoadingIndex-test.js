import {assert} from 'chai';
import actions from '../../../../../src/state/Data/SpatialData/actions';

describe('state/Data/SpatialData/actions/addLoadingIndex', function () {
	it('Dispatch action with LoadingIndex for empty tiles', function () {
		const spatialDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const level = 0;
		const tiles = [];

		const action = actions.addLoadingIndex(
			spatialDataFilter,
			order,
			level,
			tiles
		);
		assert.deepEqual(action, {
			type: 'DATA.SPATIAL_DATA.INDEX.ADD',
			filter: spatialDataFilter,
			order,
			indexData: [{0: {}}],
			changedOn,
		});
	});
	it('Dispatch action with LoadingIndex', function () {
		const spatialDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const level = 23;
		const tiles = [
			'0,0',
			[-180, 90],
			['180', '-90'],
			['45,45'],
			'0.1234567890987,-179.1234567890987',
		];

		const action = actions.addLoadingIndex(
			spatialDataFilter,
			order,
			level,
			tiles
		);
		assert.deepEqual(action, {
			type: 'DATA.SPATIAL_DATA.INDEX.ADD',
			filter: spatialDataFilter,
			order,
			indexData: [
				{
					23: {
						'0,0': true,
						'-180,90': true,
						'180,-90': true,
						'45,45': true,
						'0.1234567890987,-179.1234567890987': true,
					},
				},
			],
			changedOn,
		});
	});
});
