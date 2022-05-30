import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeMapLayer-test', function () {
	it('Should remove map layer', function () {
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
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map1',
			layerKey: 'layer1',
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
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map4',
			layerKey: 'layer3',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			layerKey: 'layer3',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no layerKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map4',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if layer was not found for given map', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'map2',
			layerKey: 'layerXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state map was not found for given key', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_LAYER',
			mapKey: 'mapXY',
			layerKey: 'layer3',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
