import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getViewportByMapKey', function () {
	it('should return viewport for given map key', () => {
		const expectedResult = {
			width: 800,
			height: 600,
		};
		const output = Select.maps.getViewportByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no viewport for given map key', () => {
		const output = Select.maps.getViewportByMapKey(state, 'map2');
		assert.isNull(output);
	});
});
