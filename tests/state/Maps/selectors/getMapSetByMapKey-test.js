import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetByMapKey', function () {
	it('should return data of the map set for given mapKey, if map exists', () => {
		const expectedResult = state.maps.sets.set1;
		const output = Select.maps.getMapSetByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no sets exist', () => {
		const output = Select.maps.getMapSetByMapKey(
			{...state, maps: {...state.maps, sets: null}},
			'map1'
		);
		assert.isNull(output);
	});

	it('should return null, if map set for given map key does not exist', () => {
		const output = Select.maps.getMapSetByMapKey(state, 'mapXYZ');
		assert.isNull(output);
	});
});
