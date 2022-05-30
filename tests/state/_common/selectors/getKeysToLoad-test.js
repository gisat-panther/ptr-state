import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getKeysToLoad', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {
				k1: {key: 'k1', data: {a: 'A'}},
				k2: {key: 'k2', data: {a: 'B'}},
				k3: {key: 'k3'},
				k4: {key: 'k4', data: {a: 'N'}},
				k5: {key: 'k5', data: {a: 'N'}, outdated: true},
				k7: {key: 'k7', data: {a: 'A'}},
			},
		},
	};

	it('should return a list of keys to load', () => {
		const keys = ['k1', 'k2', 'k7', 'k9'];
		const expectedResult = ['k9'];
		const output = commonSelectors.getKeysToLoad(getSubstate)(state, keys);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return a key, if it is outdated', () => {
		const keys = ['k6'];
		const expectedResult = ['k6'];
		const output = commonSelectors.getKeysToLoad(getSubstate)(state, keys);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if all keys already loaded', () => {
		const keys = ['k1', 'k2', 'k7'];
		const output = commonSelectors.getKeysToLoad(getSubstate)(state, keys);
		assert.isNull(output);
	});

	it('should return null if no keys given', () => {
		const keys = [];
		const output = commonSelectors.getKeysToLoad(getSubstate)(state, keys);
		assert.isNull(output);
	});

	it('return all keys, if byKey is empty', () => {
		const state2 = {
			...state,
			[sampleSubstoreName]: {...state[sampleSubstoreName], byKey: {}},
		};
		const keys = ['k1', 'k2', 'k7', 'k9'];
		const expectedResult = ['k1', 'k2', 'k7', 'k9'];
		const output = commonSelectors.getKeysToLoad(getSubstate)(state2, keys);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('return all keys, if byKey is null', () => {
		const state2 = {
			...state,
			[sampleSubstoreName]: {...state[sampleSubstoreName], byKey: null},
		};
		const keys = ['k1', 'k2', 'k7', 'k9'];
		const expectedResult = ['k1', 'k2', 'k7', 'k9'];
		const output = commonSelectors.getKeysToLoad(getSubstate)(state2, keys);
		assert.deepStrictEqual(output, expectedResult);
	});
});
