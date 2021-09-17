import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetActiveMap', function () {
	it('should return data for active map key, if it is defined in map set', () => {
		const expectedResult = state.maps.maps.map1;
		const output = Select.maps.getMapSetActiveMap(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if map set does not exist', () => {
		const output = Select.maps.getMapSetActiveMap(state, 'setXYZ');
		assert.isNull(output);
	});

	it('should return null if there is no activeMap for map', () => {
		const output = Select.maps.getMapSetActiveMap(state, 'set2');
		assert.isNull(output);
	});
});
