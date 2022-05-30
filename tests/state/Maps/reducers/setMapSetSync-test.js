import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setMapSetSync-test', function () {
	const sync = {center: true, boxRange: true};
	it('Should set map set sync', function () {
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					...state.sets.set1,
					sync,
				},
			},
		};

		const action = {
			type: 'MAPS.SET.SET_SYNC',
			mapSetKey: 'set1',
			sync,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if set for given key found', function () {
		const action = {
			type: 'MAPS.SET.SET_SYNC',
			mapSetKey: 'setXY',
			sync,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
