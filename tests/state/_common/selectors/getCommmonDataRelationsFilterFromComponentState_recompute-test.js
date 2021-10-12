import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';
import {setState} from '@jvitela/recompute';

describe('getCommmonDataRelationsFilterFromComponentState_recompute', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		places: {
			activeKeys: ['place1', 'place2'],
		},
	};

	before(function () {
		setState(state);
	});

	it('should return common filter', () => {
		const componentState = {
			metadataModifiers: {
				scopeKey: 'scope1',
				caseKeys: ['case1', 'case2'],
			},
			filterByActive: {
				place: true,
			},
			layerTemplateKey: 'layerTemplateKey1',
		};
		const expectedResult = {
			modifiers: {
				placeKey: {in: ['place1', 'place2']},
				scopeKey: 'scope1',
				caseKey: {in: ['case1', 'case2']},
			},
			layerTemplateKey: 'layerTemplateKey1',
		};
		const output =
			commonSelectors.getCommmonDataRelationsFilterFromComponentState_recompute(
				componentState
			);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return common filter - with areaTreeLevelKey', () => {
		const componentState = {
			metadataModifiers: {
				scopeKey: 'scope1',
				caseKeys: ['case1', 'case2'],
			},
			filterByActive: {
				place: true,
			},
			areaTreeLevelKey: 'atlk1',
		};
		const expectedResult = {
			modifiers: {
				placeKey: {in: ['place1', 'place2']},
				scopeKey: 'scope1',
				caseKey: {in: ['case1', 'case2']},
			},
			areaTreeLevelKey: 'atlk1',
		};
		const output =
			commonSelectors.getCommmonDataRelationsFilterFromComponentState_recompute(
				componentState
			);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should not include modifiers, if there is nothing to add', () => {
		const componentState = {
			areaTreeLevelKey: 'atlk1',
		};
		const expectedResult = {
			areaTreeLevelKey: 'atlk1',
		};
		const output =
			commonSelectors.getCommmonDataRelationsFilterFromComponentState_recompute(
				componentState
			);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return empty object, if no componentState given', () => {
		const expectedResult = {};
		const output =
			commonSelectors.getCommmonDataRelationsFilterFromComponentState_recompute();
		assert.deepStrictEqual(output, expectedResult);
	});

	after(function () {
		setState(null);
	});
});
