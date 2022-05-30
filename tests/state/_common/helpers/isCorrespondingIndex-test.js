import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('isCorrespondingIndex', function () {
	const index = {
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

	it('should return true', () => {
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
		const output = commonHelpers.isCorrespondingIndex(index, filter, order);
		assert.isTrue(output);
	});

	it('should return true, even if order is null', () => {
		const index = {
			filter: {
				modifiers: {
					scopeKey: 'scope1',
					caseKey: null,
				},
			},
			order: null,
			index: {1: 'A', 2: 'B', 3: null},
		};
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
				caseKey: null,
			},
		};
		const output = commonHelpers.isCorrespondingIndex(index, filter);
		assert.isTrue(output);
	});

	it('should return true, even if filter is null', () => {
		const index = {
			filter: null,
			order: [
				['scopeKey', 'ascending'],
				['caseKey', 'descending'],
			],
			index: {1: 'A', 2: 'B', 3: null},
		};
		const order = [
			['scopeKey', 'ascending'],
			['caseKey', 'descending'],
		];
		const output = commonHelpers.isCorrespondingIndex(index, null, order);
		assert.isTrue(output);
	});

	it('should return false', () => {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
				caseKey: 'case1',
			},
		};
		const order = [
			['scopeKey', 'ascending'],
			['caseKey', 'descending'],
		];
		const output = commonHelpers.isCorrespondingIndex(index, filter, order);
		assert.isFalse(output);
	});
});
