import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../../../src/state/Data/Components/actions';

describe('state/Data/Components/actions/getPayload', function () {
	it('dispatch nothing', function () {
		const commonFilter = {};
		const relationsPagination = null;
		const attributeDataPagination = null;
		const attributeDataFilterExtension = {};
		const order = null;

		const payload = actions.getPayload(
			commonFilter,
			relationsPagination,
			attributeDataPagination,
			attributeDataFilterExtension,
			order
		);

		assert.deepStrictEqual(payload, {
			modifiers: undefined,
			relations: null,
			data: {
				attributeOrder: null,
			},
		});
	});

	it('get payload', function () {
		const commonFilter = {
			layerTemplateKey: 'lt',
			areaTreeLevelKey: 'atlk',
			attributeKeys: ['aatKey1', 'aatKey2'],
			modifiers: {
				appKey: 'app',
				scopeKey: 'scope',
			},
		};
		const relationsPagination = null;
		const attributeDataPagination = null;
		const attributeDataFilterExtension = {
			attributeFilter: {xxx: {in: [11]}},
			dataSourceKeys: [22, 33],
			featureKeys: [44, 55],
			spatialFilter: {geometry: [1, 2, 3]},
		};
		const order = null;

		const payload = actions.getPayload(
			commonFilter,
			relationsPagination,
			attributeDataPagination,
			attributeDataFilterExtension,
			order
		);

		assert.deepStrictEqual(payload, {
			modifiers: {
				appKey: 'app',
				scopeKey: 'scope',
			},
			relations: null,
			layerTemplateKey: 'lt',
			areaTreeLevelKey: 'atlk',
			attributeKeys: ['aatKey1', 'aatKey2'],
			data: {
				attributeOrder: null,
				attributeFilter: {xxx: {in: [11]}},
				dataSourceKeys: [22, 33],
				featureKeys: [44, 55],
				spatialFilter: {geometry: [1, 2, 3]},
			},
		});
	});

	it('get payload with parinations', function () {
		const commonFilter = {
			layerTemplateKey: 'lt',
			areaTreeLevelKey: 'atlk',
			attributeKeys: ['aatKey1', 'aatKey2'],
			modifiers: {
				appKey: 'app',
				scopeKey: 'scope',
			},
		};
		const relationsPagination = {offset: 0, limit: 100, relations: false};
		const attributeDataPagination = {offset: 100, limit: 100, data: true};
		const attributeDataFilterExtension = {
			attributeFilter: {xxx: {in: [11]}},
			dataSourceKeys: [22, 33],
			featureKeys: [44, 55],
			spatialFilter: {geometry: [1, 2, 3]},
		};
		const order = null;

		const payload = actions.getPayload(
			commonFilter,
			relationsPagination,
			attributeDataPagination,
			attributeDataFilterExtension,
			order
		);

		assert.deepStrictEqual(payload, {
			modifiers: {
				appKey: 'app',
				scopeKey: 'scope',
			},
			relations: {...relationsPagination},
			layerTemplateKey: 'lt',
			areaTreeLevelKey: 'atlk',
			attributeKeys: ['aatKey1', 'aatKey2'],
			data: {
				offset: 100,
				limit: 100,
				data: true,
				attributeOrder: null,
				attributeFilter: {xxx: {in: [11]}},
				dataSourceKeys: [22, 33],
				featureKeys: [44, 55],
				spatialFilter: {geometry: [1, 2, 3]},
			},
		});
	});
});
