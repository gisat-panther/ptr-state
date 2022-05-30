import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getEditedKeys', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			editedByKey: {k1: {n: 1}, k2: {n: 2}},
		},
	};

	it('should return all edited keys', () => {
		const expectedResult = ['k1', 'k2'];
		const output = commonSelectors.getEditedKeys(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no editedByKey', () => {
		const state = {[sampleSubstoreName]: {editedByKey: null}};
		const output = commonSelectors.getEditedKeys(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if editedByKey is empty', () => {
		const state = {[sampleSubstoreName]: {editedByKey: {}}};
		const output = commonSelectors.getEditedKeys(getSubstate)(state);
		assert.isNull(output);
	});
});
