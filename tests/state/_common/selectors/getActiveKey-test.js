import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getActiveKey', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {[sampleSubstoreName]: {activeKey: 'key1'}};

	it('should return active key', () => {
		const expectedResult = 'key1';
		const output = commonSelectors.getActiveKey(getSubstate)(state);
		assert.equal(output, expectedResult);
	});

	it('should return null if there is no active key', () => {
		const state = {[sampleSubstoreName]: {activeKey: null}};
		const output = commonSelectors.getActiveKey(getSubstate)(state);
		assert.isNull(output);
	});
});
