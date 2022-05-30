import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapMetadataModifiersByMapKey', function () {
	it('should return metadata modifiers', () => {
		const expectedResult = {
			periodKey: 'period2',
		};
		const output = Select.maps.getMapMetadataModifiersByMapKey(state, 'map2');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no layers exist', () => {
		const output = Select.maps.getMapMetadataModifiersByMapKey(state, 'map1');
		assert.isNull(output);
	});
});
