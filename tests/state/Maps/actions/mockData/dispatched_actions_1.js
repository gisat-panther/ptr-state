export const dispatchedActions = [
	{
		type: 'MAPS.MAP.USE.REGISTER',
		mapKey: 'map1',
	},
	{
		type: 'DATA.SPATIAL_DATA.INDEX.ADD',
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': true,
				},
			},
		],
		changedOn: null,
	},
	{
		type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
			styleKey: null,
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': true,
				},
			},
		],
		changedOn: null,
	},
	{
		data: [
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
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
			styleKey: null,
		},
		type: 'DATA.ATTRIBUTE_RELATIONS.ADD',
	},
	{
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
			styleKey: null,
		},
		order: null,
		count: 1,
		start: 1,
		data: [
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
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
			styleKey: null,
		},
		type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
	},
	{
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
			styleKey: null,
		},
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
		type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_TILED_INDEX',
		attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
		data: {
			18502: '27',
		},
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
			styleKey: null,
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': {
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
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
		},
		type: 'DATA.SPATIAL_RELATIONS.ADD',
	},
	{
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
		},
		order: null,
		count: 1,
		start: 1,
		data: [
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
			layerTemplateKey: 'layerTemplateBackground',
		},
		type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
	},
	{
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
		},
		order: null,
		count: 1,
		start: 1,
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
		type: 'DATA.SPATIAL_DATA.ADD_WITH_TILED_INDEX',
		dataByDataSourceKey: {
			'848e2559-936d-4262-a808-4c87aa60217d': {
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
		},
		level: '7',
		filter: {
			layerTemplateKey: 'layerTemplateBackground',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': {
						'848e2559-936d-4262-a808-4c87aa60217d': [18502],
					},
				},
			},
		],
		changedOn: null,
	},
	{
		type: 'DATA.SPATIAL_DATA.INDEX.ADD',
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': true,
				},
			},
		],
		changedOn: null,
	},
	{
		type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
			styleKey: null,
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': true,
				},
			},
		],
		changedOn: null,
	},
	{
		data: [
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
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
			styleKey: null,
		},
		type: 'DATA.ATTRIBUTE_RELATIONS.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
			styleKey: null,
		},
		order: null,
		count: 1,
		start: 1,
		data: [
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
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
			styleKey: null,
		},
		type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
			styleKey: null,
		},
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
		type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_TILED_INDEX',
		attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
		data: {
			18502: '27',
		},
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
			styleKey: null,
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': {
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
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
		},
		type: 'DATA.SPATIAL_RELATIONS.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
		},
		order: null,
		count: 1,
		start: 1,
		data: [
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
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
		},
		type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
		},
		order: null,
		count: 1,
		start: 1,
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
		type: 'DATA.SPATIAL_DATA.ADD_WITH_TILED_INDEX',
		dataByDataSourceKey: {
			'848e2559-936d-4262-a808-4c87aa60217d': {
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
		},
		level: '7',
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'period1',
			},
			layerTemplateKey: 'layerTemplate2',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': {
						'848e2559-936d-4262-a808-4c87aa60217d': [18502],
					},
				},
			},
		],
		changedOn: null,
	},
	{
		componentId: 'layer1_layerUse',
		keys: ['style1'],
		type: 'STYLES.USE.KEYS.REGISTER',
	},
	{
		type: 'DATA.SPATIAL_DATA.INDEX.ADD',
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': true,
				},
			},
		],
		changedOn: null,
	},
	{
		type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': true,
				},
			},
		],
		changedOn: null,
	},
	{
		data: [
			{
				key: 'styleKey1',
				data: {
					nameDisplay: null,
					nameInternal: null,
					description: null,
					source: null,
					nameGeoserver: null,
					definition: {
						rules: [
							{
								styles: [
									{
										attributeKey: '528ac373-b82f-44cb-a883-4f3ef5b13d07',
									},
								],
							},
						],
					},
					applicationKey: null,
					tagKeys: null,
				},
			},
		],
		filter: undefined,
		type: 'STYLES.ADD',
	},
	{
		keys: ['style1'],
		type: 'STYLES.ADD_UNRECEIVED',
	},
	{
		data: [
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
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
		},
		type: 'DATA.ATTRIBUTE_RELATIONS.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
		},
		order: null,
		count: 1,
		start: 1,
		data: [
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
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
		},
		type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
		},
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
		type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_TILED_INDEX',
		attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
		data: {
			18502: '27',
		},
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
			styleKey: 'style1',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': {
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
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		},
		type: 'DATA.SPATIAL_RELATIONS.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		},
		order: null,
		count: 1,
		start: 1,
		data: [
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
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		},
		type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
	},
	{
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		},
		order: null,
		count: 1,
		start: 1,
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
		type: 'DATA.SPATIAL_DATA.ADD_WITH_TILED_INDEX',
		dataByDataSourceKey: {
			'848e2559-936d-4262-a808-4c87aa60217d': {
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
		},
		level: '7',
		filter: {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				scenarioKey: {
					in: ['scenario1', 'scenario2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		},
		order: null,
		indexData: [
			{
				7: {
					'0,0': {
						'848e2559-936d-4262-a808-4c87aa60217d': [18502],
					},
				},
			},
		],
		changedOn: null,
	},
];
