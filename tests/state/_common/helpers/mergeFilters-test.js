import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('mergeFilters', function () {
	it('all filters defined - simple', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
			activeCaseKeys: ['activeCase1', 'activeCase2'],
		};

		const filterByActive = {
			scenario: true,
			case: true,
		};

		const filter = {
			placeKeys: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
		};

		const expected = {
			placeKeys: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
			scenarioKey: 'activeScenario1',
			caseKey: {
				in: ['activeCase1', 'activeCase2'],
			},
		};

		const output = commonHelpers.mergeFilters(
			activeKeys,
			filterByActive,
			filter
		);
		assert.deepStrictEqual(output, expected);
	});

	it('all filters defined - some keys in filter are active at the same time', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
			activeCaseKeys: ['activeCase1', 'activeCase2'],
		};

		const filterByActive = {
			scenario: true,
			case: true,
		};

		const filter = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
			scenarioKey: 'scenarioKey1',
			caseKey: 'caseKey1',
		};

		const expected = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
			scenarioKey: 'scenarioKey1',
			caseKey: 'caseKey1',
		};

		const output = commonHelpers.mergeFilters(
			activeKeys,
			filterByActive,
			filter
		);
		assert.deepStrictEqual(output, expected);
	});

	it('all filters defined - some stores are missing in filterByActive', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
			activeCaseKeys: ['activeCase1', 'activeCase2'],
		};

		const filterByActive = {
			scenario: true,
		};

		const filter = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
		};

		const expected = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
			scenarioKey: 'activeScenario1',
		};

		const output = commonHelpers.mergeFilters(
			activeKeys,
			filterByActive,
			filter
		);
		assert.deepStrictEqual(output, expected);
	});

	it('all filters defined - some keys are missing in activeKeys', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
		};

		const filterByActive = {
			scenario: true,
			case: true,
		};

		const filter = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
		};

		const expected = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
			scenarioKey: 'activeScenario1',
		};

		const output = commonHelpers.mergeFilters(
			activeKeys,
			filterByActive,
			filter
		);
		assert.deepStrictEqual(output, expected);
	});

	it('filterByActive filter is missing', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
			activeCaseKeys: ['activeCase1', 'activeCase2'],
		};

		const filter = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
		};

		const expected = {
			placeKey: {
				in: ['placeKey1', 'placeKey2'],
			},
			scopeKey: 'scopeKey1',
		};

		const output = commonHelpers.mergeFilters(activeKeys, null, filter);
		assert.deepStrictEqual(output, expected);
	});

	it('metadata filter is missing', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
			activeCaseKeys: ['activeCase1', 'activeCase2'],
		};

		const filterByActive = {
			scenario: true,
			case: true,
		};

		const expected = {
			scenarioKey: 'activeScenario1',
			caseKey: {
				in: ['activeCase1', 'activeCase2'],
			},
		};

		const output = commonHelpers.mergeFilters(activeKeys, filterByActive, null);
		assert.deepStrictEqual(output, expected);
	});

	it('activeKeys does not match filterByActive', () => {
		const activeKeys = {
			activeScenarioKey: 'activeScenario1',
		};

		const filterByActive = {
			case: true,
		};

		const output = commonHelpers.mergeFilters(activeKeys, filterByActive, null);
		assert.isNull(output);
	});

	it('all active keys test - activeKey', () => {
		const activeKeys = {
			activeApplicationKey: 'activeApplication1',
			activeAttributeKey: 'activeAttribute1',
			activeAreaTreeLevelKey: 'activeAreaTreeLevel1',
			activeCaseKey: 'activeCase1',
			activeLayerTemplateKey: 'activeLayerTemplate1',
			activePeriodKey: 'activePeriod1',
			activePlaceKey: 'activePlace1',
			activeScenarioKey: 'activeScenario1',
			activeScopeKey: 'activeScope1',
		};

		const filterByActive = {
			application: true,
			attribute: true,
			areaTreeLevel: true,
			case: true,
			layerTemplate: true,
			period: true,
			place: true,
			scenario: true,
			scope: true,
		};

		const expected = {
			applicationKey: 'activeApplication1',
			attributeKey: 'activeAttribute1',
			areaTreeLevelKey: 'activeAreaTreeLevel1',
			caseKey: 'activeCase1',
			layerTemplateKey: 'activeLayerTemplate1',
			periodKey: 'activePeriod1',
			placeKey: 'activePlace1',
			scenarioKey: 'activeScenario1',
			scopeKey: 'activeScope1',
		};

		const output = commonHelpers.mergeFilters(activeKeys, filterByActive, null);
		assert.deepStrictEqual(output, expected);
	});

	it('all active keys test - activeKeys', () => {
		const activeKeys = {
			activeAttributeKeys: ['activeAttribute1', 'activeAttribute2'],
			activeCaseKeys: ['activeCase1', 'activeCase2'],
			activePeriodKeys: ['activePeriod1', 'activePeriod2'],
			activePlaceKeys: ['activePlace1', 'activePlace2'],
			activeScenarioKeys: ['activeScenario1', 'activeScenario2'],
		};

		const filterByActive = {
			application: true,
			attribute: true,
			areaTreeLevel: true,
			case: true,
			layerTemplate: true,
			period: true,
			place: true,
			scenario: true,
			scope: true,
		};

		const expected = {
			attributeKey: {in: ['activeAttribute1', 'activeAttribute2']},
			caseKey: {in: ['activeCase1', 'activeCase2']},
			periodKey: {in: ['activePeriod1', 'activePeriod2']},
			placeKey: {in: ['activePlace1', 'activePlace2']},
			scenarioKey: {in: ['activeScenario1', 'activeScenario2']},
		};

		const output = commonHelpers.mergeFilters(activeKeys, filterByActive, null);
		assert.deepStrictEqual(output, expected);
	});
});
