import {assert} from 'chai';
import actions from '../../../../../src/state/Data/SpatialData/actions';

describe('state/Data/SpatialData/actions/removeIndexAction', function () {
	it('removeIndexAction', function () {
		const spatialDataFilter = {appKey: 'testKey'};
		const order = null;

		const action = actions.removeIndex(spatialDataFilter, order);

		assert.deepEqual(action, {
			type: 'DATA.SPATIAL_DATA.INDEX.REMOVE',
			filter: spatialDataFilter,
			order,
		});
	});
});
