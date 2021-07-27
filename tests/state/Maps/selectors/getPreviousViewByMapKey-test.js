import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getPreviousViewByMapKey', function () {
	it('should return view for given map key', () => {
		const expectedResult = {
			boxRange: 1000000,
		};
		const output = Select.maps.getPreviousViewByMapKey(state, 'map3');
		assert.deepStrictEqual(output, expectedResult);
	});
});
