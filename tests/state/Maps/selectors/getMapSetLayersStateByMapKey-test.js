import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetLayersStateByMapKey', function () {
	it('should return layers data', () => {
		const expectedResult = state.maps.sets.set1.data.layers;
		const output = Select.maps.getMapSetLayersStateByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no layers exist', () => {
		const output = Select.maps.getMapSetLayersStateByMapKey(
			{
				...state,
				maps: {
					...state.maps,
					sets: {
						...state.maps.sets,
						set1: {
							...state.maps.sets.set1,
							data: {
								...state.maps.sets.set1.data,
								layers: null,
							},
						},
					},
				},
			},
			'map1'
		);
		assert.isNull(output);
	});
});
