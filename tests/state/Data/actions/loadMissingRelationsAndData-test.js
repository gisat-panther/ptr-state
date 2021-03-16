import {assert} from 'chai';
import _ from 'lodash';
import slash from 'slash';
import actions from '../../../../src/state/Data/actions';
import {resetFetch, setFetch} from '../../../../src/state/_common/request';

import {
	responseWithSpatialRelationsSpatialAndAttributeData,
	responseWithSpatialAndAttributeData_2,
} from './mockData';

describe('state/Data/actions/loadMissingRelationsAndData', function () {
	// this.timeout(5000);
	let dispatchedActions = [];

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	const getDispatch = getState => {
		return action => {
			const dispatch = getDispatch(getState);
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
	};

	const runFunctionActions = function ({dispatch, getState}) {
		return new Promise((resolve, reject) => {
			const promises = [];
			for (let i = 0; i < dispatchedActions.length; i++) {
				const action = dispatchedActions[i];

				if (typeof action === 'function') {
					promises.push(action(dispatch, getState));
					dispatchedActions[i] = null;
				} else if (action instanceof Promise) {
					promises.push(action);
					dispatchedActions[i] = null;
				} else if (Array.isArray(action)) {
					dispatchedActions = [...dispatchedActions, ...action];
					dispatchedActions[i] = null;
				}
			}

			dispatchedActions = dispatchedActions.filter(a => a != null);

			if (promises.length > 0) {
				return Promise.all(promises)
					.then(() => runFunctionActions({dispatch, getState}))
					.then(() => resolve());
			}

			resolve();
		});
	};

	afterEach(function () {
		clearDispatchedActions();
	});

	//
	// END OF SETTINGS
	//

	it('dispatch nothing', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'backend',
					apiBackendPath: 'rest',
				},
			},
			data: {
				attributeData: {
					indexes: [],
				},
				spatialData: {
					indexes: [],
				},
			},
		});
		const dispatch = getDispatch(getState);

		const loadGeometry = false;
		const spatialFilter = {};
		const styleKey = 'xxx';
		const order = null;
		const spatialRelationsFilter = {};
		const attributeRelationsFilter = {};
		const attributeRelationsCount = 0;
		const spatialRelationsCount = 0;
		const preloadedSpatialDataSources = [];
		const attributeDataFilter = {};

		dispatch(
			actions.loadMissingRelationsAndData(
				loadGeometry,
				spatialFilter,
				styleKey,
				order,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeRelationsCount,
				spatialRelationsCount,
				preloadedSpatialDataSources,
				attributeDataFilter
			)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, []);
		});
	});

	it('request and proceed relations, spatial and attribute data for one tile', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 1,
				},
			},
			data: {
				attributeData: {
					indexes: [],
				},
				spatialData: {
					indexes: [],
				},
			},
		});

		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/data/filtered',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
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
						offset: 1,
						limit: 1,
					},
					data: {
						spatialIndex: {
							tiles: [[1.40625, 49.21875]],
						},
						spatialFilter: {
							tiles: [
								[0, 1],
								[1.40625, 49.21875],
							],
							level: 7,
						},
						geometry: true,
						relations: true,
					},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(
						responseWithSpatialRelationsSpatialAndAttributeData
					);
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		const dispatch = getDispatch(getState);

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
		};

		const loadGeometry = true;
		const spatialFilter = {
			tiles: [
				[0, 1],
				[1.40625, 49.21875],
			],
			level: 7,
		};
		const order = null;
		const attributeRelationsCount = 1;
		const spatialRelationsCount = 2;
		const preloadedSpatialDataSources = [];
		dispatch(
			actions.loadMissingRelationsAndData(
				loadGeometry,
				spatialFilter,
				styleKey,
				order,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeRelationsCount,
				spatialRelationsCount,
				preloadedSpatialDataSources,
				attributeDataFilter
			)
		);

		const _attributeDataFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: modifiers,
			styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
		};
		const _spatialFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: modifiers,
		};

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					//FIXME remane spatialFilter to filter
					filter: _spatialFilter,
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.INDEX.ADD_WITH_SPATIAL',
					filter: _attributeDataFilter,
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					data: {
						18502: '27',
					},
					filter: _attributeDataFilter,
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': {
									'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
								},
							},
						},
					],
					changedOn: null,
				},
				{
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								spatialDataSourceKey: '848e2559-936d-4262-a808-4c87aa60217d',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								applicationKey: null,
							},
						},
					],
					filter: _spatialFilter,
					type: 'DATA.SPATIAL_RELATIONS.ADD',
				},
				{
					filter: _spatialFilter,
					order: null,
					count: 2,
					start: 2,
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								spatialDataSourceKey: '848e2559-936d-4262-a808-4c87aa60217d',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								applicationKey: null,
							},
						},
					],
					changedOn: null,
					type: 'DATA.SPATIAL_RELATIONS.INDEX.ADD',
				},
				{
					data: [
						{
							key: '848e2559-936d-4262-a808-4c87aa60217d',
							data: {
								nameInternal: 'gadm36_deu_4',
								attribution: null,
								type: 'tiledVector',
								layerName: null,
								tableName: 'gadm36_DEU_4',
								fidColumnName: 'ogc_fid',
								geometryColumnName: 'geom',
							},
						},
					],
					filter: _spatialFilter,
					type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
				},
				{
					filter: _spatialFilter,
					order: null,
					count: 2,
					start: 2,
					data: [
						{
							key: '848e2559-936d-4262-a808-4c87aa60217d',
							data: {
								nameInternal: 'gadm36_deu_4',
								attribution: null,
								type: 'tiledVector',
								layerName: null,
								tableName: 'gadm36_DEU_4',
								fidColumnName: 'ogc_fid',
								geometryColumnName: 'geom',
							},
						},
					],
					changedOn: null,
					type: 'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					dataByDataSourceKey: {
						'848e2559-936d-4262-a808-4c87aa60217d': {},
						'85e35be5-1706-402a-86ad-851397bae7aa': {
							18502: {
								coordinates: [
									[
										[
											[2.50647283, 50.63433838],
											[2.5012393, 50.63986206],
											[2.50829029, 50.64472198],
											[2.50647283, 50.63433838],
										],
									],
								],
								type: 'MultiPolygon',
							},
						},
					},
					level: '7',
					filter: _spatialFilter,
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': {
									'848e2559-936d-4262-a808-4c87aa60217d': [],
									'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
								},
							},
						},
					],
					changedOn: null,
				},
			]);
		});
	});

	it('request and proceed relations, spatial and attribute data for two tile in two requests', function () {
		//
		// We are asking for 3 pages of tiles and 2 pages of relations.
		// First page is loaded from "previous" workflow, so 2 pages of tiles and 1 page of relations is missing.
		// requestPageSize is 1 so it should sent 2 requests.
		//	- first asking for second page of relations and second page of tile data
		//	- second asking fust for thirth page of tile data
		//

		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 1,
				},
			},
			data: {
				attributeData: {
					indexes: [],
				},
				spatialData: {
					indexes: [],
				},
			},
		});

		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/data/filtered',
				slash(url)
			);

			//check for first request
			if (
				_.isEqual(options, {
					body: JSON.stringify({
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
							offset: 1,
							limit: 1,
						},
						data: {
							spatialIndex: {
								tiles: [[1.40625, 49.21875]],
							},
							spatialFilter: {
								tiles: [
									[0, 1],
									[1.40625, 49.21875],
									[0, 2],
								],
								level: 7,
							},
							geometry: true,
							relations: true,
						},
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(
							responseWithSpatialRelationsSpatialAndAttributeData
						);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}

			//check for second request
			if (
				_.isEqual(options, {
					body: JSON.stringify({
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
						relations: {},
						data: {
							spatialIndex: {
								tiles: [[0, 2]],
							},
							spatialFilter: {
								tiles: [
									[0, 1],
									[1.40625, 49.21875],
									[0, 2],
								],
								level: 7,
							},
							geometry: true,
							relations: false,
						},
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(responseWithSpatialAndAttributeData_2);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
		});

		const dispatch = getDispatch(getState);

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
		};

		const loadGeometry = true;
		const spatialFilter = {
			tiles: [
				[0, 1],
				[1.40625, 49.21875],
				[0, 2],
			],
			level: 7,
		};
		const order = null;
		const attributeRelationsCount = 1;
		const spatialRelationsCount = 2;
		const preloadedSpatialDataSources = [];
		dispatch(
			actions.loadMissingRelationsAndData(
				loadGeometry,
				spatialFilter,
				styleKey,
				order,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeRelationsCount,
				spatialRelationsCount,
				preloadedSpatialDataSources,
				attributeDataFilter
			)
		);

		const _attributeDataFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: modifiers,
			styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
		};
		const _spatialFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: modifiers,
		};

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.INDEX.ADD_WITH_SPATIAL',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
						styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
					},
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					order: null,
					indexData: [
						{
							7: {
								'0,2': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.INDEX.ADD_WITH_SPATIAL',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
						styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
					},
					order: null,
					indexData: [
						{
							7: {
								'0,2': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					data: {
						18502: '27',
					},
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
						styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
					},
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': {
									'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
								},
							},
						},
					],
					changedOn: null,
				},
				{
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								spatialDataSourceKey: '848e2559-936d-4262-a808-4c87aa60217d',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								applicationKey: null,
							},
						},
					],
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					type: 'DATA.SPATIAL_RELATIONS.ADD',
				},
				{
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					order: null,
					count: 2,
					start: 2,
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								spatialDataSourceKey: '848e2559-936d-4262-a808-4c87aa60217d',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								applicationKey: null,
							},
						},
					],
					changedOn: null,
					type: 'DATA.SPATIAL_RELATIONS.INDEX.ADD',
				},
				{
					data: [
						{
							key: '848e2559-936d-4262-a808-4c87aa60217d',
							data: {
								nameInternal: 'gadm36_deu_4',
								attribution: null,
								type: 'tiledVector',
								layerName: null,
								tableName: 'gadm36_DEU_4',
								fidColumnName: 'ogc_fid',
								geometryColumnName: 'geom',
							},
						},
					],
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
				},
				{
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					order: null,
					count: 2,
					start: 2,
					data: [
						{
							key: '848e2559-936d-4262-a808-4c87aa60217d',
							data: {
								nameInternal: 'gadm36_deu_4',
								attribution: null,
								type: 'tiledVector',
								layerName: null,
								tableName: 'gadm36_DEU_4',
								fidColumnName: 'ogc_fid',
								geometryColumnName: 'geom',
							},
						},
					],
					changedOn: null,
					type: 'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					dataByDataSourceKey: {
						'85e35be5-1706-402a-86ad-851397bae7aa': {
							18502: {
								type: 'MultiPolygon',
								coordinates: [
									[
										[
											[2.50647283, 50.63433838],
											[2.5012393, 50.63986206],
											[2.50829029, 50.64472198],
											[2.50647283, 50.63433838],
										],
									],
								],
							},
						},
						'848e2559-936d-4262-a808-4c87aa60217d': {},
					},
					level: '7',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					order: null,
					indexData: [
						{
							7: {
								'1.40625,49.21875': {
									'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
									'848e2559-936d-4262-a808-4c87aa60217d': [],
								},
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					data: {
						18503: '30',
					},
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
						styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
					},
					order: null,
					indexData: [
						{
							7: {
								'0,2': {
									'55f48ed1-ee67-47bd-a044-8985662ec29f': [18503],
								},
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					dataByDataSourceKey: {
						'85e35be5-1706-402a-86ad-851397bae7aa': {
							18503: {
								type: 'MultiPolygon',
								coordinates: [
									[
										[
											[2.50647283, 50.63433838],
											[2.5012393, 50.63986206],
											[2.50829029, 50.64472198],
											[2.50647283, 50.63433838],
										],
									],
								],
							},
						},
						'848e2559-936d-4262-a808-4c87aa60217d': {},
					},
					level: '7',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					},
					order: null,
					indexData: [
						{
							7: {
								'0,2': {
									'85e35be5-1706-402a-86ad-851397bae7aa': [18503],
									'848e2559-936d-4262-a808-4c87aa60217d': [],
								},
							},
						},
					],
					changedOn: null,
				},
			]);
		});
	});
});
