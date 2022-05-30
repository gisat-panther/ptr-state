import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetMaps', function () {
	it('should return maps for given map set key', () => {
		const expectedResult = [state.maps.maps.map1, state.maps.maps.map2];
		const output = Select.maps.getMapSetMaps(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if set has no maps', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					set1: {
						...state.maps.sets.set1,
						maps: [],
					},
				},
			},
		};
		const output = Select.maps.getMapSetMaps(updatedState, 'set1');
		assert.isNull(output);
	});

	it('should return null, if there are no maps', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				maps: {},
			},
		};
		const output = Select.maps.getMapSetMaps(updatedState, 'set1');
		assert.isNull(output);
	});

	it('should return null, if there is no set for give map set key', () => {
		const output = Select.maps.getMapSetMaps(state, 'setXYZ');
		assert.isNull(output);
	});
});
