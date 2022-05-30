import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('mergeIntervals', function () {
	it('should merge relevant intervals', () => {
		const intervals = [
			{
				start: 5,
				length: 2,
			},
			{
				start: 3,
				length: 12,
			},
			{
				start: 1,
				length: 10,
			},
			{
				start: 20,
				length: 5,
			},
			{
				start: 25,
				length: 6,
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
				length: 14,
			},
			{
				start: 20,
				length: 11,
			},
		];
		const output = commonHelpers.mergeIntervals(intervals);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should merge relevant intervals', () => {
		const intervals = [
			{
				start: 0,
				length: 100,
			},
			{
				start: 1,
				length: 100,
			},
			{
				start: 10,
				length: 90,
			},
			{
				start: 101,
				length: 1,
			},
			{
				start: 5,
				length: 95,
			},
		];
		const expectedOutput = [
			{
				start: 1,
				length: 101,
			},
		];
		const output = commonHelpers.mergeIntervals(intervals);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null if no valid intervals', () => {
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
		const output = commonHelpers.mergeIntervals(intervals);
		assert.isNull(output);
	});
});
