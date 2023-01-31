import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setMapLayerOption-test', function () {
	it('Should set map layer option on undefined options', function () {
		let updatedLayers = [...state.maps.map1.data.layers];
		updatedLayers[0] = {
			...updatedLayers[0],
			options: {
				...updatedLayers[0].options,
				a: 'b',
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: updatedLayers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'map1',
			layerKey: 'layer1',
			optionKey: 'a',
			optionValue: 'b',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set map layer option on given path on empty options', function () {
		let updatedStateLayers = [...state.maps.map1.data.layers];
		updatedStateLayers[0] = {
			...updatedStateLayers[0],
			options: {},
		};
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [...updatedStateLayers],
					},
				},
			},
		};

		let updatedLayers = [...state.maps.map1.data.layers];
		updatedLayers[0] = {
			...updatedLayers[0],
			options: {
				...updatedLayers[0].options,
				a: 'b',
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: updatedLayers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'map1',
			layerKey: 'layer1',
			optionKey: 'a',
			optionValue: 'b',
		};

		const output = reducers(updatedState, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set (update) map layer option on given path', function () {
		let updatedStateLayers = [...state.maps.map1.data.layers];
		updatedStateLayers[0] = {
			...updatedStateLayers[0],
			options: {a: 'a'},
		};
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [...updatedStateLayers],
					},
				},
			},
		};

		let updatedLayers = [...state.maps.map1.data.layers];
		updatedLayers[0] = {
			...updatedLayers[0],
			options: {
				...updatedLayers[0].options,
				a: 'b',
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: updatedLayers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'map1',
			layerKey: 'layer1',
			optionKey: 'a',
			optionValue: 'b',
		};

		const output = reducers(updatedState, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set (update) map layer option on given path and other options should sty untouched', function () {
		let updatedStateLayers = [...state.maps.map1.data.layers];
		updatedStateLayers[0] = {
			...updatedStateLayers[0],
			options: {c: 'c'},
		};
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [...updatedStateLayers],
					},
				},
			},
		};

		let updatedLayers = [...state.maps.map1.data.layers];
		updatedLayers[0] = {
			...updatedLayers[0],
			options: {
				...updatedLayers[0].options,
				a: 'b',
				c: 'c',
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: updatedLayers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'map1',
			layerKey: 'layer1',
			optionKey: 'a',
			optionValue: 'b',
		};

		const output = reducers(updatedState, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set (update) map layer option URL on given path and other options should sty untouched', function () {
		let updatedStateLayers = [...state.maps.map1.data.layers];
		updatedStateLayers[0] = {
			...updatedStateLayers[0],
			options: {url: 'http://seznam.cz'},
		};
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [...updatedStateLayers],
					},
				},
			},
		};

		let updatedLayers = [...state.maps.map1.data.layers];
		updatedLayers[0] = {
			...updatedLayers[0],
			options: {
				...updatedLayers[0].options,
				url: 'http://centrum.cz',
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: updatedLayers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'map1',
			layerKey: 'layer1',
			optionKey: 'url',
			optionValue: 'http://centrum.cz',
		};

		const output = reducers(updatedState, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should change nothing if layer with given key is not part of given map', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'map1',
			layerKey: 'layerXY',
			optionKey: 'a',
			optionValue: 'b',
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, state);
	});

	it('Should return the same state if there are no layers for given mapKey', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.SET_OPTION',
			mapKey: 'mapXY',
			layerKey: 'layer1',
			optionKey: 'a',
			optionValue: 'b',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
