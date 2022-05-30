import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setMapLayerOption-test', function () {
	it('Should set map layer option', function () {
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
