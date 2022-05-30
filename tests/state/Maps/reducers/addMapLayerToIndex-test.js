import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('addMapLayerToIndex-test', function () {
	it('Should add map layer to specific index', function () {
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
								key: 'layer1',
								styleKey: 'style1',
							},
							{key: 'layerA'},
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
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			mapKey: 'map1',
			layerState: {key: 'layerA'},
			index: 1,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add map layer at the end, if no index given', function () {
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
								key: 'layer1',
								styleKey: 'style1',
							},
							{
								key: 'layer2',
								styleKey: 'style1',
							},
							{key: 'layerA'},
						],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			mapKey: 'map1',
			layerState: {key: 'layerA'},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add map layer to the first position if no layers exist', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map2: {
					...state.maps.map2,
					data: {
						...state.maps.map2.data,
						layers: [{key: 'layerA'}],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			mapKey: 'map2',
			layerState: {key: 'layerA'},
			index: 2,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add map layer to the first position if no data exist', function () {
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map11: {
					...state.maps.map11,
					data: {
						layers: [{key: 'layerA'}],
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			mapKey: 'map11',
			layerState: {key: 'layerA'},
			index: 2,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			layerState: {key: 'layerA'},
			index: 2,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no map found for given key', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			mapKey: 'mapXY',
			layerState: {key: 'layerA'},
			index: 1,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no layer state given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.ADD_TO_INDEX',
			mapKey: 'map1',
			index: 1,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
