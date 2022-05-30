import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetActiveMapLayers', function () {
	it('should return layers data for active map key, if it is defined in map set', () => {
		const expectedResult = state.maps.maps.map1.data.layers;
		const output = Select.maps.getMapSetActiveMapLayers(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if map set does not exist', () => {
		const output = Select.maps.getMapSetActiveMapLayers(state, 'setXYZ');
		assert.isNull(output);
	});

	it('should return null if there is no activeMap for map', () => {
		const output = Select.maps.getMapSetActiveMapLayers(state, 'set2');
		assert.isNull(output);
	});
});
