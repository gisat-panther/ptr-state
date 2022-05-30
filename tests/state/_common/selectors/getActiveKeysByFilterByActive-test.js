import {assert} from 'chai';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getActiveKeysByFilterByActive', function () {
	const state = {
		app: {
			key: 'testing',
		},
		scopes: {
			activeKey: 'scopeA',
		},
		places: {
			activeKey: null,
			activeKeys: ['placeA', 'placeB'],
		},
		scenarios: {},
		layerTemplates: {
			activeKey: 'ltA',
		},
		cases: {
			activeKey: null,
			activeKeys: ['case1'],
		},
		periods: {
			activeKey: null,
			activeKeys: ['period1'],
		},
		attributes: {
			activeKey: 'attribute1',
			activeKeys: null,
		},
		areas: {
			areaTreeLevels: {
				activeKey: 'areaTreeLevel1',
			},
		},
		application: {
			key: 'app1',
		},
	};

	it('should omit metadata which do not have active key or keys', () => {
		const filterByActive = {
			scenario: true,
			case: true,
			attribute: true,
			areaTreeLevel: true,
			application: true,
		};

		const expectedResult = {
			caseKeys: ['case1'],
			attributeKey: 'attribute1',
			areaTreeLevelKey: 'areaTreeLevel1',
			applicationKey: 'testing',
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should omit metadata which do not have active key or keys 2', () => {
		const filterByActive = {
			scope: true,
			place: true,
			scenario: true,
			layerTemplate: true,
		};

		const expectedResult = {
			scopeKey: 'scopeA',
			placeKeys: ['placeA', 'placeB'],
			layerTemplateKey: 'ltA',
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return active keys', () => {
		const state2 = {
			scenarios: {
				activeKey: 'scenario1',
			},
			cases: {
				activeKey: 'case1',
			},
			periods: {
				activeKeys: ['period1'],
			},
			attributes: {
				activeKey: null,
				activeKeys: ['attribute1'],
			},
		};

		const filterByActive = {
			case: true,
			period: true,
			scenario: true,
			attribute: true,
		};

		const expectedResult = {
			scenarioKey: 'scenario1',
			periodKeys: ['period1'],
			attributeKeys: ['attribute1'],
			caseKey: 'case1',
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state2,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return active keys 2', () => {
		const state2 = {
			scenarios: {
				activeKeys: ['scenario1'],
			},
		};

		const filterByActive = {
			scenario: true,
		};

		const expectedResult = {
			scenarioKeys: ['scenario1'],
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state2,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should omit missing metadata', () => {
		const filterByActive = {
			scope: true,
			areaTreeLevelKey: true,
		};

		const expectedResult = {
			scopeKey: 'scopeA',
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if no metadata match', () => {
		const filterByActive = {
			areaTreeLevelKey: true,
		};

		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.isNull(output);
	});

	it('should return null if filter by active is null', () => {
		const filterByActive = null;
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.isNull(output);
	});
});
