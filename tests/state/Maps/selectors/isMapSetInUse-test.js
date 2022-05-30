import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';

describe('isMapSetInUse-test', function () {
	it('should return true, if map set is in use', () => {
		const setKey = 'set1';
		assert.isTrue(selectors.isMapSetInUse(state, setKey));
	});

	it('should return false, if map set is not use', () => {
		const setKey = 'set3';
		assert.isFalse(selectors.isMapSetInUse(state, setKey));
	});

	it('should return false, if no map set key given', () => {
		assert.isFalse(selectors.isMapSetInUse(state));
	});

	it('should return false, if there is no map set in use currently', () => {
		const state = {maps: {inUse: {sets: []}}};
		assert.isFalse(selectors.isMapSetInUse(state));
	});
});
