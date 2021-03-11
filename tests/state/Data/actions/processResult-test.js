import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';
import {
	responseWithSpatialAndAttributeData,
	responseWithRelationsSpatialAndAttributeData,
} from './mockData';

describe('state/Data/actions/processResult', function () {
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

	it('Process response without relations', function () {
		const getState = () => ({});
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
		const loadGeometry = true;
		const loadRelations = false;
		const order = null;
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
		const start = 1;
		dispatch(
			actions.processResult(
				responseWithSpatialAndAttributeData,
				loadGeometry,
				loadRelations,
				order,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeDataFilter,
				start
			)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
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
						featureKeys: [18502],
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
			]);
		});
	});

	it('Process response with relations', function () {
		const getState = () => ({});
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
		const loadGeometry = true;
		const loadRelations = true;
		const order = null;
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
		const start = 1;
		dispatch(
			actions.processResult(
				responseWithRelationsSpatialAndAttributeData,
				loadGeometry,
				loadRelations,
				order,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeDataFilter,
				start
			)
		);

		const _attributeDataFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: modifiers,
			styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
			featureKeys: [18502],
		};
		const _attributeDataRelationsFilter = {
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
					data: [
						{
							key: '530c6982-af2a-4c2a-8fad-69c07f7d76e7',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
								attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								attributeSetKey: null,
								attributeKey: '528ac373-b82f-44cb-a883-4f3ef5b13d07',
								areaTreeLevelKey: null,
								applicationKey: null,
							},
						},
					],
					filter: _attributeDataRelationsFilter,
					type: 'DATA.ATTRIBUTE_RELATIONS.ADD',
				},
				{
					filter: _attributeDataRelationsFilter,
					order: null,
					count: 1,
					start: 1,
					data: [
						{
							key: '530c6982-af2a-4c2a-8fad-69c07f7d76e7',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
								attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								attributeSetKey: null,
								attributeKey: '528ac373-b82f-44cb-a883-4f3ef5b13d07',
								areaTreeLevelKey: null,
								applicationKey: null,
							},
						},
					],
					changedOn: null,
					type: 'DATA.ATTRIBUTE_RELATIONS.INDEX.ADD',
				},
				{
					data: [
						{
							key: '55f48ed1-ee67-47bd-a044-8985662ec29f',
							data: {
								nameInternal: 'gadm36_fra_4#num4',
								attribution: null,
								tableName: 'gadm36_FRA_4',
								columnName: 'num4',
								fidColumnName: 'ogc_fid',
							},
						},
					],
					filter: _attributeDataRelationsFilter,
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
				},
				{
					filter: _attributeDataRelationsFilter,
					order: null,
					count: 1,
					start: 1,
					data: [
						{
							key: '55f48ed1-ee67-47bd-a044-8985662ec29f',
							data: {
								nameInternal: 'gadm36_fra_4#num4',
								attribution: null,
								tableName: 'gadm36_FRA_4',
								columnName: 'num4',
								fidColumnName: 'ogc_fid',
							},
						},
					],
					changedOn: null,
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.INDEX.ADD',
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
							key: '5d35a80c-e4bc-4054-9b04-7ae9829198ee',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
								spatialDataSourceKey: '85e35be5-1706-402a-86ad-851397bae7aa',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								applicationKey: null,
							},
						},
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
					start: 1,
					data: [
						{
							key: '5d35a80c-e4bc-4054-9b04-7ae9829198ee',
							data: {
								scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
								periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								placeKey: '8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
								spatialDataSourceKey: '85e35be5-1706-402a-86ad-851397bae7aa',
								layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
								scenarioKey: null,
								caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
								applicationKey: null,
							},
						},
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
							key: '85e35be5-1706-402a-86ad-851397bae7aa',
							data: {
								nameInternal: 'gadm36_fra_4',
								attribution: null,
								type: 'tiledVector',
								layerName: null,
								tableName: 'gadm36_FRA_4',
								fidColumnName: 'ogc_fid',
								geometryColumnName: 'geom',
							},
						},
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
					start: 1,
					data: [
						{
							key: '85e35be5-1706-402a-86ad-851397bae7aa',
							data: {
								nameInternal: 'gadm36_fra_4',
								attribution: null,
								type: 'tiledVector',
								layerName: null,
								tableName: 'gadm36_FRA_4',
								fidColumnName: 'ogc_fid',
								geometryColumnName: 'geom',
							},
						},
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
					filter: _spatialFilter,
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
			]);
		});
	});
});
