export const responseWithSpatialAndAttributeData = {
	spatialAttributeRelationsDataSources: {
		spatialRelations: [],
		attributeRelations: [],
		spatialDataSources: [],
		attributeDataSources: [],
		total: {
			spatialRelations: 2,
			attributeRelations: 1,
		},
		limit: 100,
		offset: 0,
	},
	spatialData: {
		'85e35be5-1706-402a-86ad-851397bae7aa': {
			data: {
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
			spatialIndex: {
				7: {
					'1.40625,49.21875': [18502],
				},
			},
		},
		'848e2559-936d-4262-a808-4c87aa60217d': {
			data: {},
			spatialIndex: {
				7: {
					'1.40625,49.21875': [],
				},
			},
		},
	},
	attributeData: {
		'55f48ed1-ee67-47bd-a044-8985662ec29f': {
			18502: '27',
		},
	},
};
export const responseWithRelationsSpatialAndAttributeData = {
	spatialAttributeRelationsDataSources: {
		spatialRelations: [
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
		attributeRelations: [
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
		spatialDataSources: [
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
		attributeDataSources: [
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
		total: {
			spatialRelations: 2,
			attributeRelations: 1,
		},
		limit: 100,
		offset: 0,
	},
	spatialData: {
		'85e35be5-1706-402a-86ad-851397bae7aa': {
			data: {
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
			spatialIndex: {
				7: {
					'1.40625,49.21875': [18502],
				},
			},
		},
		'848e2559-936d-4262-a808-4c87aa60217d': {
			data: {},
			spatialIndex: {
				7: {
					'1.40625,49.21875': [],
				},
			},
		},
	},
	attributeData: {
		'55f48ed1-ee67-47bd-a044-8985662ec29f': {
			18502: '27',
		},
	},
};
export const responseWithSpatialRelationsSpatialAndAttributeData = {
	spatialAttributeRelationsDataSources: {
		spatialRelations: [
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
		attributeRelations: [],
		spatialDataSources: [
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
		attributeDataSources: [],
		total: {
			spatialRelations: 2,
			attributeRelations: 1,
		},
		offset: 1,
		limit: 1,
	},
	spatialData: {
		'85e35be5-1706-402a-86ad-851397bae7aa': {
			data: {
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
			spatialIndex: {
				7: {
					'1.40625,49.21875': [18502],
				},
			},
		},
		'848e2559-936d-4262-a808-4c87aa60217d': {
			data: {},
			spatialIndex: {
				7: {
					'1.40625,49.21875': [],
				},
			},
		},
	},
	attributeData: {
		'55f48ed1-ee67-47bd-a044-8985662ec29f': {
			18502: '27',
		},
	},
};
export const responseWithSpatialAndAttributeData_2 = {
	spatialAttributeRelationsDataSources: {
		spatialRelations: [],
		attributeRelations: [],
		spatialDataSources: [],
		attributeDataSources: [],
		total: {
			spatialRelations: 2,
			attributeRelations: 1,
		},
		limit: 100,
		offset: 0,
	},
	spatialData: {
		'85e35be5-1706-402a-86ad-851397bae7aa': {
			data: {
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
			spatialIndex: {
				7: {
					'0,2': [18503],
				},
			},
		},
		'848e2559-936d-4262-a808-4c87aa60217d': {
			data: {},
			spatialIndex: {
				7: {
					'0,2': [],
				},
			},
		},
	},
	attributeData: {
		'55f48ed1-ee67-47bd-a044-8985662ec29f': {
			18503: '30',
		},
	},
};
