import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';

describe('getAllLayersStateByMapKey', function () {
	const expectedResult = [
		{
			key: 'pantherBackgroundLayer',
			layerTemplateKey: 'layerTemplateBackground',
		},
		{
			key: 'layer2',
			layerTemplateKey: 'layerTemplate2',
			metadataModifiers: {
				periodKey: 'period1',
				scopeKey: 'scope1',
			},
			filterByActive: null,
		},
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

	it('should return all map layers for map 1', () => {
		const output = Select.maps.getAllLayersStateByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	testHelpers.testCache(
		Select.maps.getAllLayersStateByMapKey,
		[state, 'map1'],
		expectedResult
	);

	it('should return all map layers for map 2', () => {
		const expectedResult = [
			{
				key: 'pantherBackgroundLayer',
				type: 'wmts',
				options: {
					url: 'http://backgroundLayer.no',
				},
			},
			{
				key: 'layer2',
				layerTemplateKey: 'layerTemplate2',
				metadataModifiers: {
					periodKey: 'period1',
					scopeKey: 'scope1',
				},
				filterByActive: null,
			},
			{
				key: 'layer3',
				name: 'Layer 3',
				layerTemplateKey: 'layerTemplate3',
				styleKey: 'style3',
				metadataModifiers: {
					placeKey: 'place2',
					periodKey: 'period2',
					scopeKey: 'scope1',
				},
				filterByActive: null,
			},
		];
		const output = Select.maps.getAllLayersStateByMapKey(state, 'map2');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if both backgroundLayer and layers is null', () => {
		const updatedState = {
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
							backgroundLayer: null,
						},
					},
				},
				maps: {
					...state.maps.maps,
					map1: {
						...state.maps.maps.map1,
						data: {
							...state.maps.maps.map1.data,
							layers: null,
							backgroundLayer: null,
						},
					},
				},
			},
		};
		const output = Select.maps.getAllLayersStateByMapKey(updatedState, 'map1');
		assert.isNull(output);
	});
});
