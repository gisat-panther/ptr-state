import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getIndexesByPath', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {k1: {key: 'k1', data: {a: 'A'}}, k2: {key: 'k2', data: {a: 'B'}}},
			specialIndexes: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					order: [['a', 'descending']],
					index: {1: 'k2', 2: 'k1'},
					count: 2,
				},
				{
					filter: {
						placeKey: 'place1',
					},
					index: {1: 'k2'},
					count: 1,
				},
			],
			indexes: [
				{
					filter: null,
					order: null,
					count: 2,
					index: {1: 'k1', 2: 'k2'},
				},
			],
		},
	};

	it('should return all indexes', () => {
		const expectedResult = [
			{
				filter: {
					scopeKey: 'scope1',
				},
				order: [['a', 'descending']],
				index: {1: 'k2', 2: 'k1'},
				count: 2,
			},
			{
				filter: {
					placeKey: 'place1',
				},
				index: {1: 'k2'},
				count: 1,
			},
		];
		const output = commonSelectors.getIndexesByPath(getSubstate)(
			state,
			'specialIndexes'
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return all indexes from "indexes", if no path given', () => {
		const expectedResult = [
			{
				filter: null,
				order: null,
				count: 2,
				index: {1: 'k1', 2: 'k2'},
			},
		];
		const output = commonSelectors.getIndexesByPath(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there are no indexes', () => {
		const state = {[sampleSubstoreName]: {specialIndexes: null}};
		const output = commonSelectors.getIndexesByPath(getSubstate)(
			state,
			'specialIndexes'
		);
		assert.isNull(output);
	});

	it('should return empty array if indexes are empty', () => {
		const state = {[sampleSubstoreName]: {specialIndexes: []}};
		const expectedResult = [];
		const output = commonSelectors.getIndexesByPath(getSubstate)(
			state,
			'specialIndexes'
		);
		assert.deepStrictEqual(output, expectedResult);
	});
});
