import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapLayersStateByMapKey', function () {
	it('should return layers data', () => {
		const expectedResult = state.maps.maps.map1.data.layers;
		const output = Select.maps.getMapLayersStateByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no layers exist', () => {
		const output = Select.maps.getMapLayersStateByMapKey(
			{
				...state,
				maps: {
					...state.maps,
					maps: {
						...state.maps.maps,
						map1: {
							...state.maps.maps.map1,
							data: {
								...state.maps.maps.map1.data,
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
