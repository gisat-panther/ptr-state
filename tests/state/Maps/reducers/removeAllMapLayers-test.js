import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeAllMapLayers-test', function () {
	it('Should remove all map layers', function () {
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
			type: 'MAPS.MAP.LAYERS.REMOVE_ALL',
			mapKey: 'map1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_ALL',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if given map has no layers', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_ALL',
			mapKey: 'map11',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state map was not found for given key', function () {
		const action = {
			type: 'MAPS.MAP.LAYERS.REMOVE_ALL',
			mapKey: 'mapXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
