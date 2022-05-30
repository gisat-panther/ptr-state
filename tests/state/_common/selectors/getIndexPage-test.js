import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getIndexPage', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
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
			const expectedResult = {
				1: 'k1',
				2: 'k7',
				3: null,
			};
			const output = commonSelectors.getIndexPage(getSubstate)(
				state,
				filter,
				order,
				1,
				3
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('If length is bigger than count, use count', () => {
			const expectedResult = {9: 'k3', 10: 'k102'};
			const output = commonSelectors.getIndexPage(getSubstate)(
				state,
				filter,
				order,
				9,
				11
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('If length is not defined, return null', () => {
			const output = commonSelectors.getIndexPage(getSubstate)(
				state,
				filter,
				order,
				9,
				null
			);
			assert.isNull(output);
		});
		it('If start is not defined, return null', () => {
			const output = commonSelectors.getIndexPage(getSubstate)(
				state,
				filter,
				order,
				null,
				2
			);
			assert.isNull(output);
		});
	});

	describe('check for given filter and variable start and length 2', function () {
		const filter = {
			scopeKey: 'scope2',
		};
		const order = null;
		it('start 1, length 3', () => {
			const expectedResult = {1: 'k1', 2: 'k7'};
			const output = commonSelectors.getIndexPage(getSubstate)(
				state,
				filter,
				order,
				1,
				2
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('If features are not indexed, return nulls', () => {
			const expectedResult = {11: null, 12: null};
			const output = commonSelectors.getIndexPage(getSubstate)(
				state,
				filter,
				order,
				11,
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
			const output = commonSelectors.getIndexPage(getSubstate)(
				state2,
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
			const output = commonSelectors.getIndexPage(getSubstate)(
				state2,
				filter,
				order,
				start,
				length
			);
			assert.isNull(output);
		});
	});
});
