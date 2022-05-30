import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('addMapToSet-test', function () {
	it('Should add map to set', function () {
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					activeMapKey: 'map1',
					maps: ['map1', 'map2', 'map3', 'map10'],
					data: {},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.ADD_MAP',
			mapKey: 'map10',
			mapSetKey: 'set1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no set found for given key', function () {
		const action = {
			type: 'MAPS.SET.ADD_MAP',
			mapKey: 'map10',
			mapSetKey: 'setXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no set key given', function () {
		const action = {
			type: 'MAPS.SET.ADD_MAP',
			mapKey: 'map10',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no map key given', function () {
		const action = {
			type: 'MAPS.SET.ADD_MAP',
			mapSetKey: 'set1',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
