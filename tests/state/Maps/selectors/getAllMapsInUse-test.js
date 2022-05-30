import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';

describe('getAllMapsInUse-test', function () {
	it('should return the maps in use', () => {
		const expectedResult = ['map1', 'map2'];

		assert.deepStrictEqual(selectors.getAllMapsInUse(state), expectedResult);
	});
});
