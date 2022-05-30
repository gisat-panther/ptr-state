import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('update-test', function () {
	it('Should update whole maps state', function () {
		const update = {
			maps: {},
			sets: {},
		};

		const expectedState = {
			...state,
			sets: {},
			maps: {},
		};

		const action = {
			type: 'MAPS.UPDATE',
			data: update,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});
});
