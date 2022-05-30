import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';

describe('getMetadataModifiersByMapKey', function () {
	it('should return merged map modifiers', () => {
		const expectedResult = {
			scopeKey: 'scope1',
			periodKey: 'period2',
		};
		const output = Select.maps.getMetadataModifiersByMapKey(state, 'map2');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return map set modifiers, if map modifiers does not exist', () => {
		const expectedResult = {
			scopeKey: 'scope1',
		};
		const output = Select.maps.getMetadataModifiersByMapKey(state, 'map1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no modifiers exist', () => {
		const output = Select.maps.getMetadataModifiersByMapKey(state, 'map3');
		assert.isNull(output);
	});

	testHelpers.testCache(
		Select.maps.getMetadataModifiersByMapKey,
		[state, 'map2'],
		{
			scopeKey: 'scope1',
			periodKey: 'period2',
		},
		[state, 'map2']
	);
});
