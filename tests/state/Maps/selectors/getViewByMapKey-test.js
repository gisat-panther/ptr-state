import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getViewByMapKey', function () {
	it('should return view for given map key', () => {
		const expectedResult = {
			boxRange: 500000,
			center: {
				lat: 50,
				lon: 10,
			},
			heading: 0,
			tilt: 0,
			roll: 0,
		};
		const output = Select.maps.getViewByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});
});
