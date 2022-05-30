import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';
import Select from '../../../../src/state/Select';

describe('getAllMapSetsMaps-test', function () {
	it('should return map set maps', () => {
		const expectedResult = ['map1', 'map2', 'map3'];

		assert.deepStrictEqual(selectors.getAllMapSetsMaps(state), expectedResult);
	});

	it('should return null, if there is no map set for given set key', () => {
		const state = {maps: {sets: {}}};
		const output = selectors.getAllMapSetsMaps(state);
		assert.isNull(output);
	});
});
