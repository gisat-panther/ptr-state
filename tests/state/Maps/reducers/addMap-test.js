import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('addMap-test', function () {
	it('Should add map', function () {
		const map = {
			key: 'map10',
			data: {
				view: {
					boxRange: 1000,
				},
			},
		};
		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map10: map,
			},
		};

		const action = {
			type: 'MAPS.MAP.ADD',
			map,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if map without key was given', function () {
		const action = {
			type: 'MAPS.MAP.ADD',
			map: {
				data: {
					view: {
						boxRange: 1000,
					},
				},
			},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
