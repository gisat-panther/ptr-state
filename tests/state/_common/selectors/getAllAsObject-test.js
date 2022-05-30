import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getAllAsObject', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3, removed: true}},
		},
	};

	it('should return all models except removed as object', () => {
		const expectedResult = {k1: {n: 1}, k2: {n: 2}};
		const output = commonSelectors.getAllAsObject(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no byKey', () => {
		const state = {[sampleSubstoreName]: {byKey: null}};
		const output = commonSelectors.getAllAsObject(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return empty object if byKey is empty', () => {
		const state = {[sampleSubstoreName]: {byKey: {}}};
		const expectedResult = {};
		const output = commonSelectors.getAllAsObject(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});
});
