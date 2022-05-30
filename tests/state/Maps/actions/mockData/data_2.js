//
// pageSize: 1
// first and last pade with relations and geometry
//
export const responseWithRelationsSpatialAndAttributeData_1 = {
	spatialAttributeRelationsDataSources: {
		spatialRelations: [
			{
				key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
				data: {
					scopeKey: 'scope1',
					periodKey: null,
					placeKey: null,
					spatialDataSourceKey: null,
					layerTemplateKey: 'layerTemplateKey1',
					scenarioKey: null,
					caseKey: null,
					applicationKey: 'testApp',
				},
			},
		],
		attributeRelations: [
			{
				key: '530c6982-af2a-4c2a-8fad-69c07f7d76e7',
				data: {
					areaTreeLevelKey: null,
					attributeSetKey: null,
					attributeKey: '528ac373-b82f-44cb-a883-4f3ef5b13d07',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					scopeKey: 'scope1',
					periodKey: null,
					placeKey: null,
					spatialDataSourceKey: null,
					layerTemplateKey: 'layerTemplateKey1',
					scenarioKey: null,
					caseKey: null,
					applicationKey: 'testApp',
				},
			},
		],
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
			spatialRelations: 1,
			attributeRelations: 1,
		},
		limit: 100,
		offset: 0,
	},
	spatialData: {
		'848e2559-936d-4262-a808-4c87aa60217d': {
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
					'0,0': [18502],
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
