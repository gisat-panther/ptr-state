import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getByKey', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {k1: {key: 'k1', data: {a: 'A'}}, k2: {key: 'k2', data: {a: 'B'}}},
		},
	};

	it('should return model', () => {
		const key = 'k1';
		const expectedResult = {key: 'k1', data: {a: 'A'}};
		const output = commonSelectors.getByKey(getSubstate)(state, key);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if no model found for given key', () => {
		const key = 'kXY';
		const output = commonSelectors.getByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if there is no byKey', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {byKey: null}};
		const output = commonSelectors.getByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if byKey is empty', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {byKey: {}}};
		const output = commonSelectors.getByKey(getSubstate)(state, key);
		assert.isNull(output);
	});
});
