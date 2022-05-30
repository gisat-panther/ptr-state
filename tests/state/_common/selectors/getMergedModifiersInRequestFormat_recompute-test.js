import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';
import {setState} from '@jvitela/recompute';

describe('getMergedModifiersInRequestFormat_recompute', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		places: {
			activeKeys: ['place1', 'place2'],
		},
	};

	before(function () {
		setState(state);
	});
	it('should return merged modifiers', () => {
		const metadataModifiers = {
			scopeKey: 'scope1',
			caseKeys: ['case1', 'case2'],
		};
		const filterByActive = {
			place: true,
		};
		const expectedResult = {
			placeKey: {in: ['place1', 'place2']},
			scopeKey: 'scope1',
			caseKey: {in: ['case1', 'case2']},
		};
		const output = commonSelectors.getMergedModifiersInRequestFormat_recompute(
			metadataModifiers,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged modifiers - no metadata', () => {
		const metadataModifiers = {};
		const filterByActive = {
			place: true,
		};
		const expectedResult = {
			placeKey: {in: ['place1', 'place2']},
		};
		const output = commonSelectors.getMergedModifiersInRequestFormat_recompute(
			metadataModifiers,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged modifiers - no filter by active', () => {
		const metadataModifiers = {
			scopeKey: 'scope1',
			caseKeys: ['case1', 'case2'],
		};
		const filterByActive = null;
		const expectedResult = {
			scopeKey: 'scope1',
			caseKey: {in: ['case1', 'case2']},
		};
		const output = commonSelectors.getMergedModifiersInRequestFormat_recompute(
			metadataModifiers,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged modifiers - no active key', () => {
		setState({places: {}});
		const metadataModifiers = {
			scopeKey: 'scope1',
			caseKeys: ['case1', 'case2'],
		};
		const filterByActive = {
			place: true,
		};
		const expectedResult = {
			scopeKey: 'scope1',
			caseKey: {in: ['case1', 'case2']},
		};
		const output = commonSelectors.getMergedModifiersInRequestFormat_recompute(
			metadataModifiers,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	after(function () {
		setState(null);
	});
});
