import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';

describe('getFilterByActiveByMapKey', function () {
	it('should return merged filter by active', () => {
		const expectedResult = {
			period: true,
		};
		const output = Select.maps.getFilterByActiveByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged filter by active 2', () => {
		const expectedResult = {
			period: true,
			scope: true,
		};

		const updatedState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					set1: {
						...state.maps.sets.set1,
						data: {
							...state.maps.sets.set1,
							filterByActive: {
								scope: true,
							},
						},
					},
				},
			},
		};

		const output = Select.maps.getFilterByActiveByMapKey(updatedState, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	testHelpers.testCache(
		Select.maps.getFilterByActiveByMapKey,
		[state, 'map1'],
		{
			period: true,
		}
	);

	it('should return null, if no modifiers exist', () => {
		const output = Select.maps.getFilterByActiveByMapKey(state, 'map2');
		assert.isNull(output);
	});
});
