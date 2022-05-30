import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';

describe('getMapLayersStateWithModifiersByMapKey', function () {
	const expectedResult = [
		{
			key: 'layer1',
			name: 'Layer 1',
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
			metadataModifiers: {
				placeKey: 'place1',
				scopeKey: 'scope1',
				scenarioKeys: ['scenario1', 'scenario2'],
			},
			filterByActive: {
				place: true,
				period: true,
				layerTemplateKey: true,
				applicationKey: true,
			},
		},
		{
			key: 'layerDefinition1',
			name: 'Layer with definitions',
			type: 'vector',
			options: {
				features: [],
				style: {
					styles: [
						{
							fill: '#ff0000',
						},
					],
				},
			},
			filterByActive: {
				period: true,
			},
			metadataModifiers: {
				scopeKey: 'scope1',
			},
		},
	];

	it('should return map layers for map 1', () => {
		const output = Select.maps.getMapLayersStateWithModifiersByMapKey(
			state,
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	testHelpers.testCache(
		Select.maps.getMapLayersStateWithModifiersByMapKey,
		[state, 'map1'],
		expectedResult
	);
});
