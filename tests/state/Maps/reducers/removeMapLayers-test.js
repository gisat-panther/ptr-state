import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeMapLayers-test', function () {
	it('Should remove map layers', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [
							{
								key: 'layer2',
								styleKey: 'style1',
							},
						],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			mapKey: 'map1',
			layerKeys: ['layer1'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove map layers 2', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						layers: [],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			mapKey: 'map1',
			layerKeys: ['layer1', 'layer2'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should left empty array, if last layer was removed', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map4: {
					...state.maps.map4,
					data: {
						...state.maps.map4.data,
						layers: [],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			mapKey: 'map4',
			layerKeys: ['layer3'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			layerKeys: ['layer3'],
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no layerKeys given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYERS',
			mapKey: 'map4',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state map was not found for given key', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'mapXY',
			layerKeys: ['layer3'],
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
