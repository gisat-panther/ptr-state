import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('areIntervalsOverlappedOrSubsequent', function () {
	it('should return true, if intervals are overlapped', () => {
		const intervalPairs = [
			[
				{start: 1, length: 2},
				{start: 2, length: 2},
			],
			[
				{start: 5, length: 5},
				{start: 9, length: 2},
			],
			[
				{start: 1, length: 2},
				{start: 3, length: 2},
			],
			[
				{start: 5, length: 5},
				{start: 10, length: 2},
			],
		];

		intervalPairs.forEach(intervalPair =>
			assert.isTrue(
				commonHelpers.areIntervalsOverlappedOrSubsequent(
					intervalPair[0],
					intervalPair[1]
				),
				`${JSON.stringify(intervalPair[1])} not overlaps ${JSON.stringify(
					intervalPair[0]
				)}}`
			)
		);
	});

	it('should return false, if intervals are not overlapped', () => {
		const intervalPairs = [
			[
				{start: 1, length: 2},
				{start: 4, length: 2},
			],
			[
				{start: 5, length: 5},
				{start: 11, length: 2},
			],
			[
				{start: 1, length: 10},
				{start: 101, length: 2},
			],
			[
				{star: 5, lengt: 5},
				{start: 11, length: 2},
			],
			[
				{start: true, length: 10},
				{start: 101, length: 2},
			],
			[
				{start: 1, length: 'a'},
				{start: 101, length: 2},
			],
		];

		intervalPairs.forEach(intervalPair =>
			assert.isFalse(
				commonHelpers.areIntervalsOverlappedOrSubsequent(
					intervalPair[0],
					intervalPair[1]
				),
				`${JSON.stringify(intervalPair[1])} overlaps ${JSON.stringify(
					intervalPair[0]
				)}}`
			)
		);
	});
});
