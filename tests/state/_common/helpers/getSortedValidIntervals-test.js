import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('getSortedValidIntervals', function () {
	it('should return sorted valid intervals', () => {
		const intervals = [
			{
				start: 1,
				length: 1,
			},
			{
				start: 1,
				length: 3,
			},
			{
				start: 3,
				length: 3,
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
			{
				start: 1,
				length: 3,
			},
			{
				start: 3,
				length: 3,
			},
		];
		const output = commonHelpers.getSortedValidIntervals(intervals);
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
		const output = commonHelpers.getSortedValidIntervals(intervals);
		assert.deepStrictEqual(output, expectedOutput);
	});
});
