export const ComponentsSelectorsState = {
	app: {
		key: 'appTestKey',
		localConfiguration: {
			apiBackendProtocol: 'http',
			apiBackendHost: 'localhost',
			apiBackendPath: 'backend',
			requestPageSize: 2,
		},
	},
	components: {
		componentA: {},
		componentB: {
			keySourcePath: 'keyB',
		},
		componentC: {
			keySourcePath: 'keyC',
		},
		componentD: {
			keySourcePath: 'keyD',
		},
		columnChart: {
			keySourcePath: 'key',
			xSourcePath: 'data.attribute1',
			ySourcePath: 'data.attribute2',
		},
		columnChartTimeSerie: {
			keySourcePath: 'key',
			xSourcePath: 'data.attribute1',
			ySourcePath: 'data.attribute2',
		},
	},
	data: {
		attributeRelations: {
			byKey: {
				relation1: {
					key: 'relation1',
					data: {
						attributeKey: 'attribute1',
						attributeDataSourceKey: 'dataSource1',
						periodKey: 'activePeriodKey1',
						scopeKey: 'scope1',
					},
				},
				relation2: {
					key: 'relation2',
					data: {
						attributeKey: 'attribute2',
						attributeDataSourceKey: 'dataSource2',
						periodKey: 'activePeriodKey1',
						scopeKey: 'scope1',
					},
				},
				relation3: {
					key: 'relation3',
					data: {
						attributeKey: 'attribute1',
						attributeDataSourceKey: 'dataSource1',
						periodKey: 'activePeriodKey1',
						scopeKey: 'scope2',
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1', 'attribute2'],
					},
					index: {1: 'relation1', 2: 'relation2'},
				},
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1'],
					},
					index: {1: 'relation1'},
				},
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
							scopeKey: 'scope2',
						},
						attributeKeys: ['attribute1'],
						areaTreeLevelKey: 'areaTreeLevel1',
					},
					index: {1: 'relation3'},
				},
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
						},
					},
					index: {},
				},
			],
		},
		attributeData: {
			byDataSourceKey: {
				dataSource1: {
					featureKey1: 8,
					featureKey2: 2,
					featureKey3: 10,
					featureKey4: 4,
					featureKey5: 6,
					featureKey6: 12,
				},
				dataSource2: {
					featureKey1: 'A',
					featureKey2: null,
					featureKey3: 'C',
					featureKey4: null,
					featureKey5: null,
					featureKey6: null,
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
						},
					},
					index: {},
				},
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1'],
					},
					count: 3,
					index: {1: 'featureKey2', 2: 'featureKey1'},
				},
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
							scopeKey: 'scope2',
						},
						attributeKeys: ['attribute1'],
						areaTreeLevelKey: 'areaTreeLevel1',
					},
					count: 3,
					index: {1: 'featureKey2', 2: 'featureKey4', 3: 'featureKey5'},
				},
				{
					filter: {
						modifiers: {
							periodKey: 'activePeriodKey1',
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1', 'attribute2'],
					},
					order: [['attribute1', 'ascending']],
					count: 6,
					index: {
						1: 'featureKey2',
						2: 'featureKey4',
						3: 'featureKey5',
						4: 'featureKey1',
						5: 'featureKey3',
						6: 'featureKey6',
					},
				},
			],
		},
		timeSerieRelations: {
			byKey: {
				'530c6982-af2a-4c2a-8fad-69c07f7d76e7': {
					key: '530c6982-af2a-4c2a-8fad-69c07f7d76e7',
					data: {
						scopeKey: 'scope1',
						periodKey: null,
						placeKey: null,
						attributeDataSourceKey: null,
						timeSerieDataSourceKey: 'timeSerieDataSourceKey1',
						layerTemplateKey: null,
						scenarioKey: null,
						caseKey: null,
						attributeSetKey: null,
						attributeKey: null,
						areaTreeLevelKey: null,
						applicationKey: 'appTestKey',
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							applicationKey: 'appTestKey',
							scopeKey: 'scope1',
						},
					},
					index: {1: '530c6982-af2a-4c2a-8fad-69c07f7d76e7'},
				},
			],
		},
		timeSerie: {
			byDataSourceKey: {
				dsKey1: {
					featureKey1: [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					featureKey2: [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
					featureKey4: [
						{
							period: '2021-1',
							value: 1,
						},
						{
							period: '2021-11',
							value: 'hehe',
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
					featureKey11: [
						{
							period: '2021-1',
							value: 1,
						},
						{
							period: '2021-11',
							value: 'hehe',
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
					featureKey12: [
						{
							period: '2021-1',
							value: 1,
						},
						{
							period: '2021-11',
							value: 'hehe',
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
				dsKey2: {
					featureKey3: [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					featureKey44: [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
					featureKey55: [
						{
							period: '2021-1',
							value: 1,
						},
						{
							period: '2021-11',
							value: 'hehe',
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							applicationKey: 'appTestKey',
						},
					},
					order: 'ascending',
					changedOn: null,
					count: 6,
					index: {
						dsKey1: {
							1: true,
							2: true,
							3: 'featureKey1',
							4: 'featureKey2',
							5: 'featureKey4',
						},
						dsKey2: {
							1: true,
							2: true,
							3: 'featureKey3',
							4: 'featureKey44',
							5: 'featureKey55',
						},
					},
				},
				{
					filter: {
						modifiers: {
							scopeKey: 'scope2',
							applicationKey: 'appTestKey',
						},
					},
					order: 'ascending',
					changedOn: null,
					count: 1,
					index: {
						dsKey1: {
							1: 'featureKey12',
						},
					},
				},
			],
		},
		components: {
			components: {
				byKey: {
					componentA: {
						type: 'attributeData',
						filterByActive: {
							period: true,
						},
					},
					componentB: {
						type: 'attributeData',
						filterByActive: {
							period: true,
						},
						metadataModifiers: {
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1'],
						start: 2,
						length: 2,
					},
					componentD: {
						type: 'attributeData',
						filterByActive: {
							period: true,
						},
						metadataModifiers: {
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1'],
						start: 1,
						length: 1,
					},
					componentE: {
						type: 'attributeData',
						filterByActive: {
							period: true,
						},
						metadataModifiers: {
							scopeKey: 'scope2',
						},
						areaTreeLevelKey: 'areaTreeLevel1',
						attributeKeys: ['attribute1'],
					},
					componentF: {
						type: 'attributeData',
						filterByActive: {
							period: true,
							scenario: true,
						},
						metadataModifiers: {
							scopeKey: 'scope2',
						},
						attributeKeys: ['attribute1'],
						attributeFilter: {
							attribute1: 2,
						},
					},
					componentG: {
						type: 'attributeData',
						metadataModifiers: {
							scopeKey: 'scope2',
							scenarioKeys: ['scenario1', 'scenario2'],
						},
						layerTemplateKey: 'layerTemplateKey1',
					},
					componentH: {
						type: 'attributeData',
						start: 3,
						length: 3,
					},
					columnChart: {
						type: 'attributeData',
						filterByActive: {
							period: true,
						},
						metadataModifiers: {
							scopeKey: 'scope1',
						},
						attributeKeys: ['attribute1', 'attribute2'],
						attributeOrder: [['attribute1', 'ascending']],
						start: 3,
						length: 3,
					},
					columnChartTimeSerie: {
						type: 'timeSerie',
						filterByActive: {
							application: true,
						},
						metadataModifiers: {
							scopeKey: 'scope1',
						},
						orderPeriods: 'ascending',
						// attributeKeys: ['attribute1', 'attribute2'],
						// attributeOrder: [['attribute1', 'ascending']],
						start: 3,
						length: 3,
					},
					columnChartTimeSerieB: {
						type: 'timeSerie',
						filterByActive: {
							application: true,
						},
						metadataModifiers: {
							scopeKey: 'scope2',
						},
						orderPeriods: 'ascending',
						start: 1,
						length: 1,
					},
				},
				inUse: [
					'columnChart',
					'columnChartTimeSerie',
					'columnChartTimeSerieB',
					'componentA',
					'componentB',
					'componentC',
					'componentE',
				],
			},
		},
	},
	periods: {
		activeKey: 'activePeriodKey1',
	},
};
