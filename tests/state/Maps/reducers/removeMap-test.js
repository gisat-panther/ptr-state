import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('removeMap-test', function () {
	it('Should remove map', function () {
		const {map1, ...maps} = state.maps;
		const expectedState = {
			...state,
			maps,
		};

		const action = {
			type: 'MAPS.MAP.REMOVE',
			mapKey: 'map1',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if map does not exist', function () {
		const action = {
			type: 'MAPS.MAP.REMOVE',
			mapKey: 'mapXY',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
