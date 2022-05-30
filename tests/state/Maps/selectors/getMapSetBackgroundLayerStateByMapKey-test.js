import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetBackgroundLayerStateByMapKey', function () {
	it('should return backgroundLayer data', () => {
		const expectedResult = {
			type: 'wmts',
			options: {
				url: 'http://backgroundLayer.no',
			},
		};
		const output = Select.maps.getMapSetBackgroundLayerStateByMapKey(
			state,
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no background layer data exist', () => {
		const output = Select.maps.getMapSetBackgroundLayerStateByMapKey(
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
								backgroundLayer: null,
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
