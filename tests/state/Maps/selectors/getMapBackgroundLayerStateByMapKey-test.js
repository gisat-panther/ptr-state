import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapBackgroundLayerStateByMapKey', function () {
	it('should return backgroundLayer data', () => {
		const expectedResult = {
			layerTemplateKey: 'layerTemplateBackground',
		};
		const output = Select.maps.getMapBackgroundLayerStateByMapKey(
			state,
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no background layer data exist', () => {
		const output = Select.maps.getMapBackgroundLayerStateByMapKey(
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
