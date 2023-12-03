import {assert} from 'chai';
import helpers from '../../../../src/state/Selections/helpers';

describe('getUpdatedFeatureKeysFilterForDistinctItems', function () {
	const featureKeysFilter = {
		keys: [],
	};

	it('should add one item', () => {
		const newKeys = ['a'];
		const expectedResult = {
			keys: ['a'],
			keyColourIndexPairs: {
				a: 0,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter,
				newKeys
			),
			expectedResult
		);
	});

	it('should add one two items', () => {
		const newKeys = ['a', 'b'];
		const expectedResult = {
			keys: ['a', 'b'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter,
				newKeys
			),
			expectedResult
		);
	});

	it('should remove one item', () => {
		const featureKeysFilter2 = {
			keys: ['a', 'b'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
			},
		};

		const newKeys = ['b'];
		const expectedResult = {
			keys: ['b'],
			keyColourIndexPairs: {
				b: 1,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter2,
				newKeys
			),
			expectedResult
		);
	});

	it('should remove two items', () => {
		const featureKeysFilter3 = {
			keys: ['a', 'b'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
			},
		};

		const newKeys = [];
		const expectedResult = {
			keys: [],
			keyColourIndexPairs: null,
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter3,
				newKeys
			),
			expectedResult
		);
	});

	it('should add items to empty spaces', () => {
		const featureKeysFilter4 = {
			keys: ['a', 'b', 'd', 'f'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
				d: 3,
				f: 5,
			},
		};

		const newKeys = ['a', 'b', 'd', 'f', 'c', 'e'];
		const expectedResult = {
			keys: ['a', 'b', 'd', 'f', 'c', 'e'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
				d: 3,
				f: 5,
				c: 2,
				e: 4,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter4,
				newKeys
			),
			expectedResult
		);
	});

	it('should replace items', () => {
		const featureKeysFilter5 = {
			keys: ['a', 'b', 'd', 'f'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
				d: 3,
				f: 5,
			},
		};

		const newKeys = ['x'];
		const expectedResult = {
			keys: ['x'],
			keyColourIndexPairs: {
				x: 0,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter5,
				newKeys
			),
			expectedResult
		);
	});

	it('should add one item to existing', () => {
		const featureKeysFilter6 = {
			keys: ['a', 'b'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
			},
		};

		const newKeys = ['a', 'b', 'c'];
		const expectedResult = {
			keys: ['a', 'b', 'c'],
			keyColourIndexPairs: {
				a: 0,
				b: 1,
				c: 2,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter6,
				newKeys
			),
			expectedResult
		);
	});

	it('should remove one item from existing', () => {
		const featureKeysFilter7 = {
			keys: ['a', 'b', 'c'],
			keyColourIndexPairs: {
				c: 2,
				a: 0,
				b: 1,
			},
		};

		const newKeys = ['b', 'c'];
		const expectedResult = {
			keys: ['b', 'c'],
			keyColourIndexPairs: {
				b: 1,
				c: 2,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter7,
				newKeys
			),
			expectedResult
		);
	});

	it('should handle even with numbers', () => {
		const featureKeysFilter7 = {
			keys: [75, 40, 50],
			keyColourIndexPairs: {
				75: 2,
				40: 0,
				50: 1,
			},
		};

		const newKeys = [40, 50];
		const expectedResult = {
			keys: [40, 50],
			keyColourIndexPairs: {
				40: 0,
				50: 1,
			},
		};

		assert.deepEqual(
			helpers.getUpdatedFeatureKeysFilterForDistinctItems(
				featureKeysFilter7,
				newKeys
			),
			expectedResult
		);
	});
});
