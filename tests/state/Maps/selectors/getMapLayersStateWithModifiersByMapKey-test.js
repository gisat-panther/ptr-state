import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';
import {setState} from '@jvitela/recompute';

describe('getMapLayersStateWithModifiersByMapKey', function () {
	const expectedResult = [
		{
			key: 'layer1',
			name: 'Layer 1',
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
			metadataModifiers: {
				placeKey: 'place1',
				scenarioKeys: ['scenario1', 'scenario2'],
			},
			filterByActive: null,
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
			filterByActive: null,
			metadataModifiers: null,
		},
	];

	it('should return map layers for map 1', () => {
		setState(state);
		const output = Select.maps.getMapLayersStateWithModifiersByMapKey(
			state,
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
		setState(null);
	});

	testHelpers.testCache(
		Select.maps.getMapLayersStateWithModifiersByMapKey,
		[state, 'map1'],
		expectedResult
	);
});
