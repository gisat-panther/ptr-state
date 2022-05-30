import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getEditedDataByKey', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			editedByKey: {k1: {key: 'k1', data: {a: 'A'}}, k2: {key: 'k2'}},
		},
	};

	it('should return model data', () => {
		const key = 'k1';
		const expectedResult = {a: 'A'};
		const output = commonSelectors.getEditedDataByKey(getSubstate)(state, key);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if model has no data', () => {
		const key = 'k2';
		const output = commonSelectors.getEditedDataByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if no model found for given key', () => {
		const key = 'kXY';
		const output = commonSelectors.getEditedDataByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if there is no byKey', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {editedByKey: null}};
		const output = commonSelectors.getEditedDataByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if byKey is empty', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {editedByKey: {}}};
		const output = commonSelectors.getEditedDataByKey(getSubstate)(state, key);
		assert.isNull(output);
	});
});
