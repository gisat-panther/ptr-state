import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSets', function () {
	it('should return collection of all existing map sets', () => {
		const expectedResult = Object.values(state.maps.sets);
		const output = Select.maps.getMapSets(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no sets exist', () => {
		const output = Select.maps.getMapSets({
			...state,
			maps: {...state.maps, sets: null},
		});
		assert.isNull(output);
	});
});
