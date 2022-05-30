import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getActiveKeys', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {[sampleSubstoreName]: {activeKeys: ['key1', 'key2']}};

	it('should return active keys', () => {
		const expectedResult = ['key1', 'key2'];
		const output = commonSelectors.getActiveKeys(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there are no active keys', () => {
		const state = {[sampleSubstoreName]: {activeKeys: null}};
		const output = commonSelectors.getActiveKeys(getSubstate)(state);
		assert.isNull(output);
	});
});
