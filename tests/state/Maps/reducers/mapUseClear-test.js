import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('mapUseClear-test', function () {
	it('Should remove map from use', function () {
		const expectedState = {
			...state,
			inUse: {
				...state.inUse,
				maps: ['map3'],
			},
		};

		const action = {
			type: 'MAPS.MAP.USE.CLEAR',
			mapKey: 'map1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no map key was given', function () {
		const action = {
			type: 'MAPS.MAP.USE.CLEAR',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if given map key was not found', function () {
		const action = {
			type: 'MAPS.MAP.USE.CLEAR',
			mapKey: 'mapXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
