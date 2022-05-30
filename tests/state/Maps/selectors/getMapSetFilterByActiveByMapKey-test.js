import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetFilterByActiveByMapKey', function () {
	it('should return filter by active', () => {
		const expectedResult = {
			period: true,
		};
		const output = Select.maps.getMapSetFilterByActiveByMapKey(
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
								filterByActive: {
									period: true,
								},
							},
						},
					},
				},
			},
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no filter by active exists', () => {
		const output = Select.maps.getMapSetFilterByActiveByMapKey(state, 'map2');
		assert.isNull(output);
	});
});
