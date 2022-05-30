import {assert} from 'chai';
import commonSelectors from '../../../../src/state/_common/selectors';
import {setState} from '@jvitela/recompute';

describe('getActiveKeysByFilterByActiveObserver', function () {
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

	before(function () {
		setState(state);
	});

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
		const output =
			commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive);
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
		const output =
			commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive);
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
		const output =
			commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if no metadata match', () => {
		const filterByActive = {
			areaTreeLevelKey: true,
		};

		const output =
			commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive);
		assert.isNull(output);
	});

	it('should return null if filter by active is null', () => {
		const filterByActive = null;
		const output =
			commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive);
		assert.isNull(output);
	});

	after(function () {
		setState(null);
	});
});
