import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetByKey', function () {
	it('should return data for given setKey, if set exists', () => {
		const expectedResult = state.maps.sets.set1;
		const output = Select.maps.getMapSetByKey(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if map does not exist', () => {
		const output = Select.maps.getMapSetByKey(state, 'setXYZ');
		assert.isNull(output);
	});
});
