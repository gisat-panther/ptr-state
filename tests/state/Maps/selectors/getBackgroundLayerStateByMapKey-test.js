import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getBackgroundLayerStateByMapKey', function () {
	it('should return map background layer', () => {
		const expectedResult = {
			layerTemplateKey: 'layerTemplateBackground',
		};
		const output = Select.maps.getBackgroundLayerStateByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return map set background layer', () => {
		const expectedResult = {
			type: 'wmts',
			options: {
				url: 'http://backgroundLayer.no',
			},
		};
		const output = Select.maps.getBackgroundLayerStateByMapKey(state, 'map2');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null', () => {
		const output = Select.maps.getBackgroundLayerStateByMapKey(state, 'mapXY');
		assert.isNull(output);
	});
});
