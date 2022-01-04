import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';
import {setState} from '@jvitela/recompute';

describe('getLayersStateByMapKeyObserver', function () {
	const expectedResult = [
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

	const expectedResult2 = [
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

	it('should return map layers for map 1', () => {
		setState(state);
		const output = Select.maps.getLayersStateByMapKeyObserver('map1');
		assert.deepStrictEqual(output, expectedResult);
		setState(null);
	});

	it('should return map layers for map 2', () => {
		setState(state);
		const output = Select.maps.getLayersStateByMapKeyObserver('map2');
		assert.deepStrictEqual(output, expectedResult2);
		setState(null);
	});


	it('should return just map layers, if set layers do not exist', () => {
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
						},
					},
				},
			},
		};
		setState(updatedState);
		const output = Select.maps.getLayersStateByMapKeyObserver('map2');
		assert.deepStrictEqual(output, [expectedResult2[1]]);
		setState(null);
	});

	it('should return just set layers, if map layers do not exist', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				maps: {
					...state.maps.maps,
					map2: {
						...state.maps.maps.map2,
						data: {
							...state.maps.maps.map2.data,
							layers: null,
						},
					},
				},
			},
		};
		setState(updatedState);
		const output = Select.maps.getLayersStateByMapKeyObserver('map2');
		assert.deepStrictEqual(output, [expectedResult2[0]]);
		setState(null);
	});

	it('should return null, if both set layers and map layers is null', () => {
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
						},
					},
				},
				maps: {
					...state.maps.maps,
					map2: {
						...state.maps.maps.map2,
						data: {
							...state.maps.maps.map2.data,
							layers: null,
						},
					},
				},
			},
		};
		setState(updatedState);
		const output = Select.maps.getLayersStateByMapKeyObserver('map2');
		assert.isNull(output);
		setState(null);
	});
});
