import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapByKey', function () {
	it('should return data for given mapKey, if map exists', () => {
		const expectedResult = state.maps.maps.map1;
		const output = Select.maps.getMapByKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if map does not exist', () => {
		const output = Select.maps.getMapByKey(state, 'mapXYZ');
		assert.isNull(output);
	});
});
