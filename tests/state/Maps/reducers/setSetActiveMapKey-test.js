import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setSetActiveMapKey-test', function () {
	it('Should set map set active map key', function () {
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					...state.sets.set1,
					activeMapKey: 'map2',
				},
			},
		};

		const action = {
			type: 'MAPS.SET.SET_ACTIVE_MAP_KEY',
			setKey: 'set1',
			mapKey: 'map2',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no set found for given key', function () {
		const action = {
			type: 'MAPS.SET.SET_ACTIVE_MAP_KEY',
			setKey: 'setXY',
			mapKey: 'map2',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no setKey given', function () {
		const action = {
			type: 'MAPS.SET.SET_ACTIVE_MAP_KEY',
			mapKey: 'map2',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
