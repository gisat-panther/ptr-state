import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('isNaturalNumber', function () {
	it('should return true', () => {
		const inputs = [1, 1.0];
		inputs.forEach(input =>
			assert.isTrue(
				commonHelpers.isNaturalNumber(input),
				`${input} in not natural number`
			)
		);
	});

	it('should return false', () => {
		const inputs = [
			0,
			-1,
			1.1,
			'1',
			true,
			false,
			null,
			undefined,
			{},
			[],
			Infinity,
			-Infinity,
			NaN,
			() => {},
			Date,
		];
		inputs.forEach(input =>
			assert.isFalse(
				commonHelpers.isNaturalNumber(input),
				`${input} is natural number`
			)
		);
	});
});
