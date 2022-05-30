import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('addMapSet-test', function () {
	it('Should add map set', function () {
		const set = {
			key: 'set10',
			maps: ['map10'],
		};
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set10: set,
			},
		};

		const action = {
			type: 'MAPS.SET.ADD',
			mapSet: set,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if set without key was given', function () {
		const action = {
			type: 'MAPS.SET.ADD',
			mapSet: {
				maps: ['map10'],
			},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
