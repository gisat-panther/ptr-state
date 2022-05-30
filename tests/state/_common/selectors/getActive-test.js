import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getActive', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const baseState = {
		[sampleSubstoreName]: {
			activeKey: 'k1',
			byKey: {
				k1: {n: 1},
				k2: {n: 2},
				k3: {n: 3, removed: true},
			},
		},
	};

	it('should return active model', () => {
		const expectedResult = {n: 1};
		const output = commonSelectors.getActive(getSubstate)(baseState);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no active key', () => {
		const state = {
			[sampleSubstoreName]: {...baseState[sampleSubstoreName], activeKey: null},
		};
		const output = commonSelectors.getActive(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if by key is empty', () => {
		const state = {
			[sampleSubstoreName]: {...baseState[sampleSubstoreName], byKey: {}},
		};
		const output = commonSelectors.getActive(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if model was removed', () => {
		const state = {
			[sampleSubstoreName]: {...baseState[sampleSubstoreName], activeKey: 'k3'},
		};
		const output = commonSelectors.getActive(getSubstate)(state);
		assert.isNull(output);
	});
});
