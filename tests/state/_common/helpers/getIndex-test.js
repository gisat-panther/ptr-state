import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('getIndex', function () {
	const indexes = [
		{
			filter: {
				modifiers: {
					scopeKey: 'scope1',
					caseKey: null,
				},
			},
			order: [
				['scopeKey', 'ascending'],
				['caseKey', 'descending'],
			],
			index: {1: 'A', 2: 'B', 3: null},
		},
		{
			filter: {
				modifiers: {
					scopeKey: 'scope1',
					caseKey: 'case1',
				},
			},
			order: [
				['scopeKey', 'ascending'],
				['caseKey', 'ascending'],
			],
			index: {1: 'A', 2: 'C', 3: 'E'},
		},
		{
			filter: {
				modifiers: {
					scopeKey: null,
					caseKey: 'case1',
				},
			},
			order: [['scopeKey', 'ascending']],
			index: {1: 'B', 2: 'C', 3: 'E'},
		},
	];

	it('should select index for given filter and order', () => {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
				caseKey: null,
			},
		};
		const order = [
			['scopeKey', 'ascending'],
			['caseKey', 'descending'],
		];
		const expected = {
			filter: {
				modifiers: {
					scopeKey: 'scope1',
					caseKey: null,
				},
			},
			order: [
				['scopeKey', 'ascending'],
				['caseKey', 'descending'],
			],
			index: {1: 'A', 2: 'B', 3: null},
		};

		const output = commonHelpers.getIndex(indexes, filter, order);
		assert.deepStrictEqual(output, expected);
	});

	it('should not select index for given filter and order', () => {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
				caseKey: null,
			},
		};
		const order = [
			['scopeKey', 'descending'],
			['caseKey', 'descending'],
		];

		const output = commonHelpers.getIndex(indexes, filter, order);
		assert.isNull(output);
	});

	it('should return null, if indexes are empty', () => {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
				caseKey: null,
			},
		};
		const order = [
			['scopeKey', 'ascending'],
			['caseKey', 'descending'],
		];

		const output = commonHelpers.getIndex([], filter, order);
		assert.isNull(output);
	});

	it('should return null, if indexes are null', () => {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
				caseKey: null,
			},
		};
		const order = [
			['scopeKey', 'ascending'],
			['caseKey', 'descending'],
		];

		const output = commonHelpers.getIndex(null, filter, order);
		assert.isNull(output);
	});
});
