import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getVisibleTilesByMapKey-test', function () {
	it('should return spatial filter', () => {
		const expectedResult = {
			level: 4,
			tiles: [
				[0, 45],
				[11.25, 45],
			],
		};
		const output = Select.maps.getVisibleTilesByMapKey(state, 'map1', 100, 100);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no map for given key', () => {
		const output = Select.maps.getVisibleTilesByMapKey(
			state,
			'mapXY',
			100,
			100
		);
		assert.isNull(output);
	});

	it('should return null, if no width and height given', () => {
		const output = Select.maps.getVisibleTilesByMapKey(state, 'map1', 0, 0);
		assert.isNull(output);
	});
});
