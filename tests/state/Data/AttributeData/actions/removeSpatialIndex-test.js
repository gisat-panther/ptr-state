import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeData/actions';
import getStoreSet from '../../../../store';

describe('state/Data/AttributeData/actions/removeSpatialIndex', function () {
	it('Dispatch removeSpatialIndex action.', function () {
		const filter = {appKey: 'testKey'};
		const order = null;

		const action = actions.removeSpatialIndex(filter, order);
		assert.deepEqual(action, {
			type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE',
			filter,
			order,
		});
	});
});
