import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapFilterByActiveByMapKey', function () {
	it('should return filter by active', () => {
		const expectedResult = {
			period: true,
		};
		const output = Select.maps.getMapFilterByActiveByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no filter by active exists', () => {
		const output = Select.maps.getMapFilterByActiveByMapKey(state, 'map2');
		assert.isNull(output);
	});
});
