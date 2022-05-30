import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeMapSet-test', function () {
	it('Should remove map set', function () {
		const {set1, ...sets} = state.sets;
		const expectedState = {
			...state,
			sets,
		};

		const action = {
			type: 'MAPS.SET.REMOVE',
			mapSetKey: 'set1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if set does not exist', function () {
		const action = {
			type: 'MAPS.SET.REMOVE',
			mapKey: 'setXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
