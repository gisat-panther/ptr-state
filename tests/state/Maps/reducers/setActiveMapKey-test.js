import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setActiveMapKey-test', function () {
	it('Should set active map key', function () {
		const expectedState = {
			...state,
			activeMapKey: 'map1',
		};

		const action = {
			type: 'MAPS.SET_ACTIVE_MAP_KEY',
			mapKey: 'map1',
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no mapKey given', function () {
		const action = {
			type: 'MAPS.SET_ACTIVE_MAP_KEY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
