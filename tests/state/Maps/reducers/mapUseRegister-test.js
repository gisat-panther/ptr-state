import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('mapUseRegister-test', function () {
	it('Should register map use', function () {
		const expectedState = {
			...state,
			inUse: {
				...state.inUse,
				maps: ['map1', 'map3', 'map2'],
			},
		};

		const action = {
			type: 'MAPS.MAP.USE.REGISTER',
			mapKey: 'map2',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no map key was given', function () {
		const action = {
			type: 'MAPS.MAP.USE.REGISTER',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
