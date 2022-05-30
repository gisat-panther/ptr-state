import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getEditedAllAsObject', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			editedByKey: {k1: {n: 1}, k2: {n: 2}},
		},
	};

	it('should return all edited models', () => {
		const expectedResult = {k1: {n: 1}, k2: {n: 2}};
		const output = commonSelectors.getEditedAllAsObject(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no editedByKey', () => {
		const state = {[sampleSubstoreName]: {editedByKey: null}};
		const output = commonSelectors.getEditedAllAsObject(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return empty object if editedByKey is empty', () => {
		const state = {[sampleSubstoreName]: {editedByKey: {}}};
		const expectedResult = {};
		const output = commonSelectors.getEditedAllAsObject(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});
});
