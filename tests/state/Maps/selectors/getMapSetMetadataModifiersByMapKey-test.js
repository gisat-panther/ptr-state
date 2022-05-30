import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetMetadataModifiersByMapKey', function () {
	it('should return metadata modifiers', () => {
		const expectedResult = {
			scopeKey: 'scope1',
		};
		const output = Select.maps.getMapSetMetadataModifiersByMapKey(
			state,
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no metadata modifiers exist', () => {
		const output = Select.maps.getMapSetMetadataModifiersByMapKey(
			{
				...state,
				maps: {
					...state.maps,
					sets: {
						...state.maps.sets,
						set1: {
							...state.maps.sets.set1,
							data: {
								...state.maps.sets.set1.data,
								metadataModifiers: null,
							},
						},
					},
				},
			},
			'map1'
		);
		assert.isNull(output);
	});
});
