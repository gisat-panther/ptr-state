import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getEditedActive', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const baseState = {
		[sampleSubstoreName]: {
			activeKey: 'k1',
			editedByKey: {
				k1: {n: 1},
				k2: {n: 2},
				k3: {n: 3},
			},
		},
	};

	it('should return edited active model', () => {
		const expectedResult = {n: 1};
		const output = commonSelectors.getEditedActive(getSubstate)(baseState);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no active key', () => {
		const state = {
			[sampleSubstoreName]: {...baseState[sampleSubstoreName], activeKey: null},
		};
		const output = commonSelectors.getEditedActive(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if editedByKey is empty', () => {
		const state = {
			[sampleSubstoreName]: {...baseState[sampleSubstoreName], editedByKey: {}},
		};
		const output = commonSelectors.getEditedActive(getSubstate)(state);
		assert.isNull(output);
	});
});
