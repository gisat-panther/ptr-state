import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getActiveMap', function () {
	it('should return data for active map, if exists', () => {
		const expectedResult = state.maps.maps.map1;
		const output = Select.maps.getActiveMap(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no active map', () => {
		const state2 = {...state, maps: {...state.maps, activeMapKey: null}};
		const output = Select.maps.getActiveMap(state2);
		assert.isNull(output);
	});

	it('should return null, if no maps', () => {
		const state3 = {...state, maps: {...state.maps, maps: null}};
		const output = Select.maps.getActiveMap(state3);
		assert.isNull(output);
	});
});
