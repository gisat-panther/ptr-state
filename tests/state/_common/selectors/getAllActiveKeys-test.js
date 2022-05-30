import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getAllActiveKeys', () => {
	const getSubstate = state => state[sampleSubstoreName];

	const state = {
		scopes: {activeKey: 'scope1'},
		cases: {activeKey: 'case1'},
		scenarios: {activeKeys: ['scenario1', 'scenario2']},
		places: {},
		periods: {activeKey: 'period1'},
		app: {key: 'application1'},
	};
	it('should return all active keys', () => {
		const expectedResult = {
			activeScopeKey: 'scope1',
			activeCaseKey: 'case1',
			activeCaseKeys: null,
			activeScenarioKey: null,
			activeScenarioKeys: ['scenario1', 'scenario2'],
			activePlaceKey: null,
			activePlaceKeys: null,
			activePeriodKey: 'period1',
			activePeriodKeys: null,
			activeAttributeKey: null,
			activeAttributeKeys: null,
			activeLayerTemplateKey: null,
			activeAreaTreeLevelKey: null,
			activeApplicationKey: 'application1',
		};
		const output = commonSelectors.getAllActiveKeys(state);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return all active keys 2', () => {
		const state2 = {
			...state,
			app: null,
			specific: {
				apps: {
					activeKey: 'application1',
				},
			},
		};

		const expectedResult = {
			activeScopeKey: 'scope1',
			activeCaseKey: 'case1',
			activeCaseKeys: null,
			activeScenarioKey: null,
			activeScenarioKeys: ['scenario1', 'scenario2'],
			activePlaceKey: null,
			activePlaceKeys: null,
			activePeriodKey: 'period1',
			activePeriodKeys: null,
			activeAttributeKey: null,
			activeAttributeKeys: null,
			activeLayerTemplateKey: null,
			activeAreaTreeLevelKey: null,
			activeApplicationKey: 'application1',
		};
		const output = commonSelectors.getAllActiveKeys(state2);
		assert.deepStrictEqual(output, expectedResult);
	});
});
