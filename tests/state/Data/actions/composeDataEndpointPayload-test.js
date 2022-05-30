import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';

describe('state/Data/actions/composeDataEndpointPayload', function () {
	it('Return payload', function () {
		const modifiers = {
			scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
			placeKey: {
				in: [
					'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
					'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
				],
			},
			caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
			periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
		};
		const styleKey = '460372b1-4fce-4676-92be-b1656a5415f5';
		const loadGeometry = true;
		const loadAttributeRelations = true;
		const loadSpatialRelations = true;
		const loadAreaRelations = false;
		const layerTemplateKey = '11c7cc1b-9834-4e85-aba6-eab5571705e4';
		const spatialRelationsFilter = {
			layerTemplateKey: layerTemplateKey,
			modifiers: modifiers,
		};
		const attributeRelationsFilter = {
			...spatialRelationsFilter,
			styleKey,
		};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			featureKeys: [18502],
		};

		const spatialIndex = {
			tiles: [[0, 0]],
		};
		const spatialFilter = {
			level: 9,
			tiles: [
				[0, 0],
				[90, 0],
			],
		};

		const usedRelations = {};

		const payload = actions.composeDataEndpointPayload(
			spatialRelationsFilter,
			styleKey,
			usedRelations,
			attributeDataFilter,
			spatialIndex,
			loadGeometry,
			loadAttributeRelations,
			loadSpatialRelations,
			loadAreaRelations,
			spatialFilter
		);

		assert.deepStrictEqual(payload, {
			modifiers: {
				scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
				placeKey: {
					in: [
						'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
						'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
					],
				},
				caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
				periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
			},
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
			relations: {
				attribute: true,
				spatial: true,
				area: false,
			},
			data: {
				featureKeys: [18502],
				spatialIndex: {
					tiles: [[0, 0]],
				},
				spatialFilter: {
					level: 9,
					tiles: [
						[0, 0],
						[90, 0],
					],
				},
				geometry: true,
			},
		});
	});
	it('Return payload _1', function () {
		const modifiers = {
			scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
			placeKey: {
				in: [
					'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
					'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
				],
			},
			caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
			periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
		};
		const styleKey = undefined;
		const loadGeometry = false;
		const loadAttributeRelations = false;
		const loadSpatialRelations = false;
		const loadAreaRelations = false;
		const spatialRelationsFilter = {};
		const attributeRelationsFilter = {
			...spatialRelationsFilter,
			styleKey,
		};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			featureKeys: [18502],
			attributeFilter: {xxx: {in: 'yyy'}},
			dataSourceKeys: ['dsKey1', 'dsKey2'],
		};

		const spatialIndex = undefined;
		const spatialFilter = {
			level: 9,
			tiles: [
				[0, 0],
				[90, 0],
			],
		};

		const usedRelations = {offset: 100, limit: 5};

		const payload = actions.composeDataEndpointPayload(
			spatialRelationsFilter,
			styleKey,
			usedRelations,
			attributeDataFilter,
			spatialIndex,
			loadGeometry,
			loadAttributeRelations,
			loadSpatialRelations,
			loadAreaRelations,
			spatialFilter
		);

		assert.deepStrictEqual(payload, {
			relations: {
				offset: 100,
				limit: 5,
				attribute: false,
				spatial: false,
				area: false,
			},
			data: {
				featureKeys: [18502],
				spatialFilter: {
					level: 9,
					tiles: [
						[0, 0],
						[90, 0],
					],
				},
				attributeFilter: {
					xxx: {
						in: 'yyy',
					},
				},
				geometry: false,
				dataSourceKeys: ['dsKey1', 'dsKey2'],
			},
		});
	});
});
