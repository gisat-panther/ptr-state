import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';

describe('getAllMapSetsInUse-test', function () {
	it('should return map sets in use', () => {
		const expectedResult = ['set1'];

		assert.deepStrictEqual(selectors.getAllMapSetsInUse(state), expectedResult);
	});
});
