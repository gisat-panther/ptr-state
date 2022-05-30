import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getEditedByKey', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			editedByKey: {
				k1: {key: 'k1', data: {a: 'A'}},
				k2: {key: 'k2', data: {a: 'B'}},
			},
		},
	};

	it('should return model', () => {
		const key = 'k1';
		const expectedResult = {key: 'k1', data: {a: 'A'}};
		const output = commonSelectors.getEditedByKey(getSubstate)(state, key);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if no model found for given key', () => {
		const key = 'kXY';
		const output = commonSelectors.getEditedByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if there is no editedByKey', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {editedByKey: null}};
		const output = commonSelectors.getEditedByKey(getSubstate)(state, key);
		assert.isNull(output);
	});

	it('should return null if editedByKey is empty', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {editedByKey: {}}};
		const output = commonSelectors.getEditedByKey(getSubstate)(state, key);
		assert.isNull(output);
	});
});
