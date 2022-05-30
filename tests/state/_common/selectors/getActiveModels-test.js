import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getActiveModels', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const baseState = {
		[sampleSubstoreName]: {
			activeKeys: ['k1', 'k2'],
			byKey: {
				k1: {n: 1},
				k2: {n: 2},
				k3: {n: 3, removed: true},
			},
		},
	};

	it('should return active models', () => {
		const expectedResult = [{n: 1}, {n: 2}];
		const output = commonSelectors.getActiveModels(getSubstate)(baseState);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there are no active keys', () => {
		const state = {
			[sampleSubstoreName]: {
				...baseState[sampleSubstoreName],
				activeKeys: null,
			},
		};
		const output = commonSelectors.getActiveModels(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if by key is empty', () => {
		const state = {
			[sampleSubstoreName]: {...baseState[sampleSubstoreName], byKey: {}},
		};
		const output = commonSelectors.getActiveModels(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return only existing models', () => {
		const state = {
			[sampleSubstoreName]: {
				...baseState[sampleSubstoreName],
				activeKeys: ['k1', 'k3', 'k4'],
			},
		};
		const expectedResult = [{n: 1}];
		const output = commonSelectors.getActiveModels(getSubstate)(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there is no existing model', () => {
		const state = {
			[sampleSubstoreName]: {
				...baseState[sampleSubstoreName],
				activeKeys: ['k3', 'k4'],
			},
		};
		const output = commonSelectors.getActiveModels(getSubstate)(state);
		assert.isNull(output);
	});
});
