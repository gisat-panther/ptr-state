import {assert} from 'chai';
import helpers from '../../../src/state/_common/helpers';

describe('state/_common/helpers', function () {
	// TODO refactor tests after method refactoring
	describe('getUniqueIndexes', function () {
		const tests = [
			{
				name: 'empty',
				indexes: [],
				expectedResult: null,
			},
			{
				name: 'unique indexes',
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
				expectedResult: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
			},
			{
				name: 'non unique indexes',
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},

					// exact duplicities
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},

					// duplicities with additional prop
					{filter: 'fil2', order: 'desc', p: true},
					{filter: 'fil', order: 'desc', p: true},
					{filter: 'fil', order: 'asc', p: true},
					{filter: 'fil2', order: 'asc', p: true},
				],
				expectedResult: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					helpers.getUniqueIndexes(test.indexes),
					test.expectedResult
				);
			});
		});
	});

	describe('itemFitFilter', function () {
		const tests = [
			{
				name: 'fits null filter',
				filter: null,
				item: {
					data: {
						sameProp: 'John',
						likeProp: 'always matches',
						inProp: 'two',
						notInProp: 'this',
						linkKey: 'val',
					},
				},
				expectedResult: true,
			},
			{
				name: 'fits all filter types',
				filter: {
					sameProp: 'John',
					likeProp: {like: true},
					inProp: {in: ['one', 'two', 'three']},
					notInProp: {notin: ['notThis', 'andThis']},
					link: 'val',
				},
				item: {
					data: {
						sameProp: 'John',
						likeProp: 'always matches',
						inProp: 'two',
						notInProp: 'this',
						linkKey: 'val',
					},
				},
				expectedResult: true,
			},
			{
				name: 'does not fit same prop',
				filter: {
					sameProp: 'John',
				},
				item: {
					data: {
						sameProp: 'Johnny',
					},
				},
				expectedResult: false,
			},
			{
				name: 'does not fit in prop',
				filter: {
					inProp: {in: ['one', 'two', 'three']},
				},
				item: {
					data: {
						inProp: 'four',
					},
				},
				expectedResult: false,
			},
			{
				name: 'does not fit notin prop',
				filter: {
					notInProp: {notin: ['notThis', 'andThis']},
				},
				item: {
					data: {
						notInProp: 'notThis',
					},
				},
				expectedResult: false,
			},
			{
				name: 'does not fit link prop',
				filter: {
					link: 'val',
				},
				item: {
					data: {
						linkKey: 'notval',
					},
				},
				expectedResult: false,
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					helpers.itemFitFilter(test.filter, test.item),
					test.expectedResult
				);
			});
		});
	});

	describe('removeIndex', function () {
		const indexes = [
			{
				filter: {},
				order: null,
			},
			{
				filter: {
					test: 1,
				},
				order: [],
			},
		];

		it('return new instance of indexes without filtered index', function () {
			assert.deepStrictEqual(helpers.removeIndex(indexes, {}, null), [
				{
					filter: {
						test: 1,
					},
					order: [],
				},
			]);
		});

		it('return same instance of indexes', function () {
			assert.equal(helpers.removeIndex(indexes, {}, []), indexes);
		});

		it('return empty array if indexes are empty', function () {
			assert.deepStrictEqual(helpers.removeIndex([], {}, []), []);
		});
	});
});
