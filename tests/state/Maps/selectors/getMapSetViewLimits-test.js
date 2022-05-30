import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetViewLimits', function () {
	it('should return map set view limits for given setKey, if set exists', () => {
		const expectedResult = state.maps.sets.set1.data.viewLimits;
		const output = Select.maps.getMapSetViewLimits(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, map set does not exist', () => {
		const output = Select.maps.getMapSetViewLimits(state, 'setXYZ');
		assert.isNull(output);
	});
});
