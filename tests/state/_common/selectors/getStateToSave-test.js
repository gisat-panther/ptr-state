import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getStateToSave', () => {
	const getSubstate = state => state[sampleSubstoreName];

	it('should return state to save 1', () => {
		const state = {
			[sampleSubstoreName]: {
				activeKey: 'key1',
				byKey: {key1: {something: 'a', somethingElse: 'b'}},
			},
		};
		const expectedResult = {activeKey: 'key1'};
		const output = commonSelectors.getStateToSave(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return state to save 2', () => {
		const state = {
			[sampleSubstoreName]: {
				activeKey: null,
				activeKeys: ['key1'],
				byKey: {key1: {something: 'a', somethingElse: 'b'}},
			},
		};
		const expectedResult = {activeKeys: ['key1']};
		const output = commonSelectors.getStateToSave(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return empty object, if there are no values to save', () => {
		const state = {
			[sampleSubstoreName]: {
				byKey: {key1: {something: 'a', somethingElse: 'b'}},
			},
		};
		const expectedResult = {};
		const output = commonSelectors.getStateToSave(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});
});
