import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';

describe('getLayerStateByLayerKeyAndMapKey', function () {
	it('should return layer state', () => {
		const expectedResult = {
			key: 'layer2',
			layerTemplateKey: 'layerTemplate2',
			metadataModifiers: {
				periodKey: 'period1',
				scopeKey: 'scope1',
			},
			filterByActive: null,
		};
		const output = Select.maps.getLayerStateByLayerKeyAndMapKey(
			state,
			'map1',
			'layer2'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if layer does not exists', () => {
		const output = Select.maps.getLayerStateByLayerKeyAndMapKey(
			state,
			'map1',
			'layerXY'
		);
		assert.isNull(output);
	});

	it('should return null, if there are no layers for map', () => {
		const output = Select.maps.getLayerStateByLayerKeyAndMapKey(
			state,
			'map3',
			'layer3'
		);
		assert.isNull(output);
	});
});
