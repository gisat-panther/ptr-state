import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('convertModifiersToRequestFriendlyFormat', function () {
	it('should convert modifiers to request friendly format', () => {
		const modifiers = {
			scopeKey: 'A',
			placeKeys: ['B', 'C'],
			scenarioKey: 'F',
			caseKeys: ['I', 'J'],
		};

		const expectedResult = {
			scopeKey: 'A',
			placeKey: {
				in: ['B', 'C'],
			},
			scenarioKey: 'F',
			caseKey: {
				in: ['I', 'J'],
			},
		};

		const output =
			commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should convert modifiers to request friendly format 2', () => {
		const modifiers = {
			periodKeys: ['A', 'B'],
			caseKey: 'I',
		};

		const expectedResult = {
			periodKey: {
				in: ['A', 'B'],
			},
			caseKey: 'I',
		};

		const output =
			commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should convert modifier to request friendly format, even if its value is null', () => {
		const modifiers = {
			periodKey: null,
			caseKey: undefined,
			scenarioKeys: null,
		};

		const expectedResult = {
			periodKey: null,
		};

		const output =
			commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if input is null', () => {
		const output = commonHelpers.convertModifiersToRequestFriendlyFormat(null);
		assert.isNull(output);
	});
});
