import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetActiveMapKey', function () {
	it('should return data active map key, if it is defined in map set', () => {
		const expectedResult = state.maps.sets.set1.activeMapKey;
		const output = Select.maps.getMapSetActiveMapKey(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return global map key, if map set does not have active key, but map exists in given map set', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				activeMapKey: 'map2',
				sets: {
					...state.maps.sets,
					set1: {
						...state.maps.sets.set1,
						activeMapKey: null,
					},
				},
			},
		};
		const output = Select.maps.getMapSetActiveMapKey(updatedState, 'set1');
		assert.deepStrictEqual(output, 'map2');
	});

	it('should return null if map set does not exist', () => {
		const output = Select.maps.getMapSetActiveMapKey(state, 'setXYZ');
		assert.isNull(output);
	});
});
