import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapLayerStateByMapKeyAndLayerKey', function () {
	it('should return map layer state', () => {
		const expectedResult = state.maps.maps.map1.data.layers[0];
		const output = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
			state,
			'map1',
			'layer1'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no layer found', () => {
		const output = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
			state,
			'map1',
			'layerXY'
		);
		assert.isNull(output);
	});

	it('should return null, if no map kound', () => {
		const output = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
			state,
			'mapXY',
			'layer1'
		);
		assert.isNull(output);
	});

	it('should return null, if no layer key given', () => {
		const output = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
			state,
			'map1'
		);
		assert.isNull(output);
	});

	it('should return null, if no layers exist', () => {
		const output = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
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
			'map1',
			'layer1'
		);
		assert.isNull(output);
	});
});
