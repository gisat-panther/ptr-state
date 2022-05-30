import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getViewLimitsByMapKey', function () {
	it('should return null, if map for given key does not exist', () => {
		const output = Select.maps.getViewLimitsByMapKey(state, 'mapXYZ');
		assert.isNull(output);
	});

	it('should return map view limits only, if a map is not in any set', () => {
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
				maps: {
					...state.maps.maps,
					map1: {
						...state.maps.maps.map1,
						data: {
							...state.maps.maps.map1.data,
							viewLimits: [500, 5000],
						},
					},
				},
			},
		};
		const expectedResult = [500, 5000];
		const output = Select.maps.getViewLimitsByMapKey(updatedState, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return set view limits', () => {
		const expectedResult = state.maps.sets.set1.data.viewLimits;
		const output = Select.maps.getViewLimitsByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if there are no view limits for map', () => {
		const output = Select.maps.getViewLimitsByMapKey(state, 'map3');
		assert.isNull(output);
	});

	it('should return null, if there are no view limits for set and map', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					set1: {
						...state.maps.sets.set1,
						data: {
							...state.maps.sets.set1.data,
							viewLimits: null,
						},
					},
				},
			},
		};
		const output = Select.maps.getViewLimitsByMapKey(updatedState, 'map1');
		assert.isNull(output);
	});
});
