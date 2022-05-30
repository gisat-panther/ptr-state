import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';

describe('getActiveSetKey-test', function () {
	it('should return active set key', () => {
		const expectedResult = 'set1';

		assert.deepStrictEqual(selectors.getActiveSetKey(state), expectedResult);
	});
});
