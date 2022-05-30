import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeMapFromSet-test', function () {
	it('Should remove map from set', function () {
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					...state.sets.set1,
					maps: ['map1', 'map3'],
				},
			},
		};

		const action = {
			type: 'MAPS.SET.REMOVE_MAP',
			mapKey: 'map2',
			setKey: 'set1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove map from set 2', function () {
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set2: {
					...state.sets.set2,
					maps: [],
				},
			},
		};

		const action = {
			type: 'MAPS.SET.REMOVE_MAP',
			mapKey: 'map4',
			setKey: 'set2',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no set key was given', function () {
		const action = {
			type: 'MAPS.SET.REMOVE_MAP',
			mapKey: 'map2',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if no map key was given', function () {
		const action = {
			type: 'MAPS.SET.REMOVE_MAP',
			setKey: 'set1',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if given set key was not found', function () {
		const action = {
			type: 'MAPS.SET.REMOVE_MAP',
			mapKey: 'map2',
			setKey: 'setXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if given map key was not found', function () {
		const action = {
			type: 'MAPS.SET.REMOVE_MAP',
			mapKey: 'mapXY',
			setKey: 'set1',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
