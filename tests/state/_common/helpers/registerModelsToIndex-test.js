import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('registerModelsToIndex', function () {
	it('should add models to index', () => {
		const models = [
			{
				key: 'key1',
			},
			{
				key: 'key2',
			},
		];
		const index = {
			1: 'keyA',
			2: 'keyB',
		};
		const start = 3;
		const expected = {
			1: 'keyA',
			2: 'keyB',
			3: 'key1',
			4: 'key2',
		};

		const output = commonHelpers.registerModelsToIndex(index, models, start);
		assert.deepStrictEqual(output, expected);
	});

	it('should add models to index 2', () => {
		const models = [
			{
				key: 'key1',
			},
			{
				key: 'key2',
			},
		];
		const index = {
			1: 'keyA',
			2: 'keyB',
		};
		const start = 1;
		const expected = {
			1: 'key1',
			2: 'key2',
		};

		const output = commonHelpers.registerModelsToIndex(index, models, start);
		assert.deepStrictEqual(output, expected);
	});

	it('should add models to index 3', () => {
		const models = [
			{
				key: 'key1',
			},
			{
				key: 'key2',
			},
		];
		const index = {
			1: 'keyA',
			2: 'keyB',
		};
		const start = 4;
		const expected = {
			1: 'keyA',
			2: 'keyB',
			4: 'key1',
			5: 'key2',
		};

		const output = commonHelpers.registerModelsToIndex(index, models, start);
		assert.deepStrictEqual(output, expected);
	});

	it('should return index, if no models given', () => {
		const models = [];
		const index = {
			1: 'keyA',
			2: 'keyB',
		};
		const start = 4;

		const output = commonHelpers.registerModelsToIndex(index, models, start);
		assert.deepStrictEqual(output, index);
	});

	it('should return index, if no start given', () => {
		const models = [
			{
				key: 'key1',
			},
			{
				key: 'key2',
			},
		];
		const index = {
			1: 'keyA',
			2: 'keyB',
		};

		const output = commonHelpers.registerModelsToIndex(index, models);
		assert.deepStrictEqual(output, index);
	});

	it('should return null, if no models given', () => {
		const models = [];
		const index = {
			1: 'keyA',
			2: 'keyB',
		};
		const start = 4;

		const output = commonHelpers.registerModelsToIndex(index, models, start);
		assert.deepStrictEqual(output, index);
	});
});
