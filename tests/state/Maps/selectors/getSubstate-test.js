import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';

describe('getSubstate-test', function () {
	it('should return the substate', () => {
		const expectedResult = {...state.maps};

		assert.deepStrictEqual(selectors.getSubstate(state), expectedResult);
	});
});
