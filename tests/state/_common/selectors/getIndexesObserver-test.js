import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';
import {setState} from '@jvitela/recompute';

describe('getIndexesObserver', () => {
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

	it('should return all indexes', () => {
		setState(state);
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
		const output = commonSelectors.getIndexesObserver(getSubstate);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there are no indexes', () => {
		const state = {[sampleSubstoreName]: {indexes: null}};
		setState(state);
		const output = commonSelectors.getIndexesObserver(getSubstate);
		assert.isNull(output);
	});

	it('should return empty array if indexes are empty', () => {
		const state = {[sampleSubstoreName]: {indexes: []}};
		setState(state);
		const expectedResult = [];
		const output = commonSelectors.getIndexesObserver(getSubstate);
		assert.deepStrictEqual(output, expectedResult);
	});

	after(function () {
		setState(null);
	});
});
