import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetMapKeys', function () {
	it('should return map set keys for given setKey, if set exists', () => {
		const expectedResult = state.maps.sets.set1.maps;
		const output = Select.maps.getMapSetMapKeys(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, maps is empty array', () => {
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
		const output = Select.maps.getMapSetMapKeys(updatedState, 'set1');
		assert.isNull(output);
	});

	it('should return null, map set does not exist', () => {
		const output = Select.maps.getMapSetMapKeys(state, 'setXYZ');
		assert.isNull(output);
	});
});
