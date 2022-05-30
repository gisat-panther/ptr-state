import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('addMapLayers-test', function () {
	it('Should add map layers at the end', function () {
		const layerStates = [{key: 'layerA'}, {key: 'layerB'}];
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [...state.maps.map1.data.layers, ...layerStates],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.ADD',
			mapKey: 'map1',
			layerStates,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add map layers, even if no data object exists', function () {
		const layerStates = [{key: 'layerA'}, {key: 'layerB'}];
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map11: {
					...state.maps.map11,
					data: {
						layers: layerStates,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.ADD',
			mapKey: 'map11',
			layerStates,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add map layers', function () {
		const layerStates = [{key: 'layerA'}, {key: 'layerB'}];
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map2: {
					...state.maps.map2,
					data: {
						...state.maps.map2.data,
						layers: layerStates,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.ADD',
			mapKey: 'map2',
			layerStates,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.ADD',
			layerStates: [{key: 'layerA'}, {key: 'layerB'}],
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no map found for given key', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.ADD',
			mapKey: 'mapXY',
			layerStates: [{key: 'layerA'}, {key: 'layerB'}],
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no layers given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map4',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
