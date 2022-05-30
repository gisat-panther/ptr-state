import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('mapSetUseClear-test', function () {
	it('Should remove map set from use', function () {
		const expectedState = {
			...state,
			inUse: {
				...state.inUse,
				sets: [],
			},
		};

		const action = {
			type: 'MAPS.SET.USE.CLEAR',
			mapSetKey: 'set1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no map set key was given', function () {
		const action = {
			type: 'MAPS.SET.USE.CLEAR',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if given map set key was not found', function () {
		const action = {
			type: 'MAPS.SET.USE.CLEAR',
			mapSetKey: 'setXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
