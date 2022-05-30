import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getIndexTotal', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {k1: {key: 'k1', data: {a: 'A'}}, k2: {key: 'k2', data: {a: 'B'}}},
			indexes: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					order: [['a', 'descending']],
					index: {1: 'k2', 2: 'k1'},
					count: 2,
					changedOn: '2021-01-12T09:59:41.072Z',
				},
				{
					filter: {
						placeKey: 'place1',
					},
					index: {1: 'k2'},
					count: 1,
				},
			],
		},
	};

	it('should return index total', () => {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'descending']];
		const expectedResult = 2;
		const output = commonSelectors.getIndexTotal(getSubstate)(
			state,
			filter,
			order
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return index total 2', () => {
		const filter = {
			placeKey: 'place1',
		};
		const order = null;
		const expectedResult = 1;
		const output = commonSelectors.getIndexTotal(getSubstate)(
			state,
			filter,
			order
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there are no indexes', () => {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'descending']];
		const state = {[sampleSubstoreName]: {indexes: null}};
		const output = commonSelectors.getIndexTotal(getSubstate)(
			state,
			filter,
			order
		);
		assert.isNull(output);
	});

	it('should return null if indexes are empty', () => {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'descending']];
		const state = {[sampleSubstoreName]: {indexes: []}};
		const output = commonSelectors.getIndexTotal(getSubstate)(
			state,
			filter,
			order
		);
		assert.isNull(output);
	});
});
