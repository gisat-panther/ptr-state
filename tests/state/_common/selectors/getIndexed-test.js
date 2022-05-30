import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getIndexed', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {
				k1: {key: 'k1', data: {a: 'A'}},
				k2: {key: 'k2', data: {a: 'B'}},
				k3: {key: 'k3'},
				k4: {key: 'k4', data: {a: 'N'}},
				k5: {key: 'k5', data: {a: 'N'}},
				k7: {key: 'k7', data: {a: 'A'}},
			},
			indexes: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					order: [['a', 'ascending']],
					index: {
						1: 'k1',
						2: 'k7',
						3: null,
						4: 'k2',
						5: 'k4',
						6: 'k5',
						7: 'k101',
						8: null,
						9: 'k3',
						10: 'k102',
					},
					count: 10,
				},
				{
					filter: {
						scopeKey: 'scope2',
					},
					index: {
						1: 'k1',
						2: 'k7',
						3: null,
						4: 'k2',
						5: 'k4',
						6: 'k5',
						7: 'k101',
						8: null,
						9: 'k3',
						10: 'k102',
					},
					count: 15,
				},
			],
		},
	};

	describe('check for given filter, order and variable start and length', function () {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'ascending']];
		it('start 1, length 3', () => {
			const expectedResult = [
				{key: 'k1', data: {a: 'A'}},
				{key: 'k7', data: {a: 'A'}},
				null,
			];
			const output = commonSelectors.getIndexed(getSubstate)(
				state,
				null,
				filter,
				order,
				1,
				3
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('If length is bigger than count, use count', () => {
			const expectedResult = [{key: 'k3'}, {key: 'k102'}];
			const output = commonSelectors.getIndexed(getSubstate)(
				state,
				null,
				filter,
				order,
				9,
				11
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('If length is not defined, use count', () => {
			const expectedResult = [{key: 'k3'}, {key: 'k102'}];
			const output = commonSelectors.getIndexed(getSubstate)(
				state,
				null,
				filter,
				order,
				9,
				null
			);
			assert.deepStrictEqual(output, expectedResult);
		});
		it('If start is not defined, begin from 1', () => {
			const expectedResult = [
				{key: 'k1', data: {a: 'A'}},
				{key: 'k7', data: {a: 'A'}},
			];
			const output = commonSelectors.getIndexed(getSubstate)(
				state,
				null,
				filter,
				order,
				null,
				2
			);
			assert.deepStrictEqual(output, expectedResult);
		});
	});

	describe('check for given filter and variable start and length 2', function () {
		const filter = {
			scopeKey: 'scope2',
		};
		const order = null;
		it('start 1, length 3', () => {
			const expectedResult = [
				{key: 'k1', data: {a: 'A'}},
				{key: 'k7', data: {a: 'A'}},
			];
			const output = commonSelectors.getIndexed(getSubstate)(
				state,
				null,
				filter,
				order,
				1,
				2
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('If features are not indexed, return nulls', () => {
			const expectedResult = [null, null];
			const output = commonSelectors.getIndexed(getSubstate)(
				state,
				null,
				filter,
				order,
				11,
				2
			);
			assert.deepStrictEqual(output, expectedResult);
		});
	});

	describe('check for filter by active', function () {
		const filterByActive = {
			scope: true,
		};
		const filter = null;
		const order = null;
		const state2 = {...state, scopes: {activeKey: 'scope2'}};
		it('start 1, length 3', () => {
			const expectedResult = [
				{key: 'k1', data: {a: 'A'}},
				{key: 'k7', data: {a: 'A'}},
			];
			const output = commonSelectors.getIndexed(getSubstate)(
				state2,
				filterByActive,
				filter,
				order,
				1,
				2
			);
			assert.deepStrictEqual(output, expectedResult);
		});
	});

	describe('edge cases', function () {
		const filter = {scopeKey: 'scope1'};
		const order = [['a', 'ascending']];
		const start = 1;
		const length = 1;

		it('should return null if there are no indexes', () => {
			const state2 = {
				...state,
				[sampleSubstoreName]: {...state[sampleSubstoreName], indexes: null},
			};
			const output = commonSelectors.getIndexed(getSubstate)(
				state2,
				null,
				filter,
				order,
				start,
				length
			);
			assert.isNull(output);
		});

		it('should return null if indexes are empty', () => {
			const state2 = {
				...state,
				[sampleSubstoreName]: {...state[sampleSubstoreName], indexes: []},
			};
			const output = commonSelectors.getIndexed(getSubstate)(
				state2,
				null,
				filter,
				order,
				start,
				length
			);
			assert.isNull(output);
		});

		it('should return at least a key as a model, if byKey is empty', () => {
			const state2 = {
				...state,
				[sampleSubstoreName]: {...state[sampleSubstoreName], byKey: {}},
			};
			const expectedResult = [{key: 'k1'}];
			const output = commonSelectors.getIndexed(getSubstate)(
				state2,
				null,
				filter,
				order,
				start,
				length
			);
			assert.deepStrictEqual(output, expectedResult);
		});
	});
});
