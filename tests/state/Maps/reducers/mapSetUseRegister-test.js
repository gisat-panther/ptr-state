import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('mapSetUseRegister-test', function () {
	it('Should register map set use', function () {
		const expectedState = {
			...state,
			inUse: {
				...state.inUse,
				sets: ['set1', 'set2'],
			},
		};

		const action = {
			type: 'MAPS.SET.USE.REGISTER',
			mapSetKey: 'set2',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no map set key was given', function () {
		const action = {
			type: 'MAPS.SET.USE.REGISTER',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
