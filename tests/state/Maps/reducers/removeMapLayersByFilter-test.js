import {assert} from 'chai';
import reducers from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeMapLayersByFilter-test', function () {
	it('Should remove map layers by filter _1', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map5: {
					...state.maps.map5,
					data: {
						...state.maps.map5.data,
						layers: [
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
							},
						],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS_BY_FILTER',
			mapKey: 'map5',
			filter: {
				metadataModifiers: {
					scenarioKeys: ['scenario1', 'scenario2'],
				},
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove map layers by filter _2', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map5: {
					...state.maps.map5,
					data: {
						...state.maps.map5.data,
						layers: [
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
							},
						],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS_BY_FILTER',
			mapKey: 'map5',
			filter: {
				layerTemplateKey: 'layerTemplate1',
				styleKey: 'style1',
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove map layers by filter _3', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map5: {
					...state.maps.map5,
					data: {
						...state.maps.map5.data,
						layers: [
							{
								key: 'layer1',
								name: 'Layer 1',
								layerTemplateKey: 'layerTemplate1',
								styleKey: 'style1',
								metadataModifiers: {
									placeKey: 'place1',
									scenarioKeys: ['scenario1', 'scenario2'],
								},
								filterByActive: {
									place: true,
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
							},
						],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS_BY_FILTER',
			mapKey: 'map5',
			filter: {
				key: 'layer2',
				name: 'Layer 2',
				layerTemplateKey: 'layerTemplate1',
				styleKey: 'style1',
				metadataModifiers: {
					placeKey: 'place1',
					periodKey: 'period1',
					scenarioKeys: ['scenario1', 'scenario2'],
				},
				filterByActive: {
					place: true,
					layerTemplateKey: true,
					applicationKey: true,
				},
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should left empty array, if last layer was removed', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map5: {
					...state.maps.map5,
					data: {
						...state.maps.map5.data,
						layers: [],
					},
				},
			},
		};

		const action1 = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS_BY_FILTER',
			mapKey: 'map5',
			filter: {
				key: 'layerDefinition1',
			},
		};

		const output1 = reducers(state, action1);

		const action2 = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS_BY_FILTER',
			mapKey: 'map5',
			filter: {
				key: 'layer1',
			},
		};

		const output2 = reducers(output1, action2);

		const action3 = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS_BY_FILTER',
			mapKey: 'map5',
			filter: {
				key: 'layer2',
			},
		};

		const output3 = reducers(output2, action3);

		assert.deepStrictEqual(output3, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			filter: {
				key: 'layer2',
			},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no filter given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			mapKey: 'map5',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state. Map was not found for given key', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map90',
			filter: {
				key: 'layer2',
			},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state. No layer satisfy to the filter', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map5',
			filter: {
				key: 'layer56',
			},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state. No layer satisfy to the empty filter.', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map5',
			filter: {},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
