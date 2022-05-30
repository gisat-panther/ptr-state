import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('getValidIntervals', function () {
	it('should return valid intervals', () => {
		const intervals = [
			{
				start: 1,
				length: 1,
			},
			{
				start: false,
				length: 1,
			},
			{
				start: 1.1,
				length: 1,
			},
		];
		const expectedOutput = [
			{
				start: 1,
				length: 1,
			},
		];
		const output = commonHelpers.getValidIntervals(intervals);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return empty array if no valid intervals', () => {
		const intervals = [
			{
				start: false,
				length: 1,
			},
			{
				start: 1.1,
				length: 1,
			},
		];
		const expectedOutput = [];
		const output = commonHelpers.getValidIntervals(intervals);
		assert.deepStrictEqual(output, expectedOutput);
	});
});
