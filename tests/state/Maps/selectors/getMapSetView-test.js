import {mapConstants} from '@gisatcz/ptr-core';
import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetView', function () {
	it('should return map set view for given setKey, if set exists', () => {
		const expectedResult = {
			...mapConstants.defaultMapView,
			...state.maps.sets.set1.data.view,
		};
		const output = Select.maps.getMapSetView(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, map set does not exist', () => {
		const output = Select.maps.getMapSetView(state, 'setXYZ');
		assert.isNull(output);
	});
});
