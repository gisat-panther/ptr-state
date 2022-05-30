export const ComponentsSelectorsState = {
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
		components: {
			components: {
				byKey: {
					componentA: {
						filterByActive: {
							period: true,
						},
					},
					componentB: {
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
						metadataModifiers: {
							scopeKey: 'scope2',
							scenarioKeys: ['scenario1', 'scenario2'],
						},
						layerTemplateKey: 'layerTemplateKey1',
					},
					componentH: {
						start: 3,
						length: 3,
					},
					columnChart: {
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
				},
				inUse: [
					'columnChart',
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
