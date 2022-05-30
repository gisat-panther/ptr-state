import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('mergeMetadataKeys', function () {
	const defined = {
		scopeKey: 'A',
		placeKeys: ['B', 'C'],
	};

	const active = {
		placeKeys: ['D', 'E'],
		scenarioKey: 'F',
	};

	it('should merge keys, defined keys have a priority', () => {
		const expectedResult = {
			scopeKey: 'A',
			placeKeys: ['B', 'C'],
			scenarioKey: 'F',
		};
		const output = commonHelpers.mergeMetadataKeys(defined, active);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return defined keys only if active is null and vice versa', () => {
		const output = commonHelpers.mergeMetadataKeys(defined, null);
		assert.deepStrictEqual(output, defined);

		const output2 = commonHelpers.mergeMetadataKeys(null, active);
		assert.deepStrictEqual(output2, active);
	});

	it('should return null if both parameters are null', () => {
		const output = commonHelpers.mergeMetadataKeys(null, null);
		assert.isNull(output);
	});
});
