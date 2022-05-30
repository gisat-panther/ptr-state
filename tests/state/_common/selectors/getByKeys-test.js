import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getByKeys', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {k1: {key: 'k1', data: {a: 'A'}}, k2: {key: 'k2', data: {a: 'B'}}},
		},
	};

	it('should return models', () => {
		const keys = ['k1', 'k2'];
		const expectedResult = [
			{key: 'k1', data: {a: 'A'}},
			{key: 'k2', data: {a: 'B'}},
		];
		const output = commonSelectors.getByKeys(getSubstate)(state, keys);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return models 2', () => {
		const keys = ['k1', 'k2', 'k3'];
		const expectedResult = [
			{key: 'k1', data: {a: 'A'}},
			{key: 'k2', data: {a: 'B'}},
		];
		const output = commonSelectors.getByKeys(getSubstate)(state, keys);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if no model found for given keys', () => {
		const keys = ['kXY'];
		const output = commonSelectors.getByKeys(getSubstate)(state, keys);
		assert.isNull(output);
	});

	it('should return null if no model found for given key 2', () => {
		const keys = 'kXY';
		const output = commonSelectors.getByKeys(getSubstate)(state, keys);
		assert.isNull(output);
	});

	it('should return null if there is no byKey', () => {
		const keys = ['k1', 'k2'];
		const state = {[sampleSubstoreName]: {byKey: null}};
		const output = commonSelectors.getByKeys(getSubstate)(state, keys);
		assert.isNull(output);
	});

	it('should return null if byKey is empty', () => {
		const keys = ['k1', 'k2'];
		const state = {[sampleSubstoreName]: {byKey: {}}};
		const output = commonSelectors.getByKeys(getSubstate)(state, keys);
		assert.isNull(output);
	});
});
