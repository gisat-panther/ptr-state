import {assert} from 'chai';
import selectors from '../../../../src/state/Maps/selectors';
import {MapsSelectorsState as state} from './_state';

describe('isMapInUse-test', function () {
	it('should return true, if map is in use', () => {
		const mapKey = 'map1';
		assert.isTrue(selectors.isMapInUse(state, mapKey));
	});

	it('should return false, if map is not use', () => {
		const mapKey = 'map3';
		assert.isFalse(selectors.isMapInUse(state, mapKey));
	});

	it('should return false, if no map key given', () => {
		assert.isFalse(selectors.isMapInUse(state));
	});

	it('should return false, if there is no map in use currently', () => {
		const state = {maps: {inUse: {maps: []}}};
		assert.isFalse(selectors.isMapInUse(state));
	});
});
