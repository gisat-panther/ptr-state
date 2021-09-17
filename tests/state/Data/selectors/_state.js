export const DataSelectorsState = {
	data: {
		attributeData: {
			byDataSourceKey: {
				attributeDataSource1: {
					featureKey1: 'A',
					featureKey2: 'B',
					featureKey3: 'C',
					featureKey11: 'A',
					featureKey12: 'B',
					featureKey13: 'A',
					featureKey21: null,
				},
				attributeDataSource2: {
					featureKey1: null,
					featureKey2: null,
					featureKey3: 10,
					featureKey11: 105,
					featureKey12: 125,
					featureKey13: 2,
					featureKey14: 17,
					featureKey21: null,
				},
				attributeDataSourceA1: {
					featureKeyA1: 23.45,
					featureKeyA2: null,
				},
				attributeDataSourceA2: {
					featureKeyA1: 'Benin',
					featureKeyA2: 'Mali',
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
						},
						styleKey: 'style1',
					},
					index: {
						6: {
							'0,0': {
								attributeDataSource1: [
									'featureKey1',
									'featureKey2',
									'featureKey11',
									'featureKey21',
								],
								attributeDataSource2: [
									'featureKey1',
									'featureKey2',
									'featureKey11',
									'featureKey21',
								],
							},
							'0,1': {
								attributeDataSource1: ['featureKey3', 'featureKey12'],
								attributeDataSource2: ['featureKey3', 'featureKey12'],
							},
							'1,1': {
								attributeDataSource1: ['featureKey13'],
								attributeDataSource2: ['featureKey13', 'featureKey14'],
							},
						},
						7: {
							'0.5,0.5': {
								attributeDataSource1: ['featureKey2', 'featureKey21'],
								attributeDataSource2: ['featureKey2', 'featureKey21'],
							},
						},
					},
				},
			],
		},
		attributeDataSources: {
			byKey: {
				attributeDataSource1: {
					key: 'attributeDataSource1',
					data: {
						nameInternal: 'ads1',
					},
				},
				attributeDataSource2: {
					key: 'attributeDataSource2',
					data: {
						nameInternal: 'ads2',
					},
				},
				attributeDataSource3: {
					key: 'attributeDataSource3',
					data: {
						nameInternal: 'ads3',
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
						},
						styleKey: 'style1',
					},
					index: {
						1: 'attributeDataSource1',
						2: 'attributeDataSource2',
					},
				},
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place2',
						},
						styleKey: 'style1',
					},
					index: {1: 'attributeDataSource3'},
				},
			],
		},
		attributeRelations: {
			byKey: {
				attributeRelation1: {
					key: 'attributeRelation1',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place1',
						attributeDataSourceKey: 'attributeDataSource1',
						attributeKey: 'attribute1',
					},
				},
				attributeRelation2: {
					key: 'attributeRelation2',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place1',
						attributeDataSourceKey: 'attributeDataSource2',
						attributeKey: 'attribute2',
					},
				},
				attributeRelation3: {
					key: 'attributeRelation3',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place2',
						attributeDataSourceKey: 'attributeDataSource3',
						attributeKey: 'attribute1',
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
						},
						styleKey: 'style1',
					},
					index: {
						1: 'attributeRelation1',
						2: 'attributeRelation2',
					},
				},
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place2',
						},
						styleKey: 'style1',
					},
					index: {1: 'attributeRelation3'},
				},
			],
		},
		spatialData: {
			byDataSourceKey: {
				spatialDataSource1: {
					featureKey1: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [0.2, 0.2],
							},
						},
					},
					featureKey2: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [0.7, 0.7],
							},
							7: {
								type: 'Point',
								coordinates: [0.7, 0.7],
							},
						},
					},
					featureKey3: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [0.4, 1.2],
							},
						},
					},
				},
				spatialDataSource2: {
					featureKey11: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [0.3, 0.4],
							},
						},
					},
					featureKey12: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [0.4, 1.2],
							},
						},
					},
					featureKey13: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [1.1, 1.2],
							},
						},
					},
					featureKey14: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [1.3, 1.2],
							},
						},
					},
				},
				spatialDataSource3: {
					featureKey21: {
						geometries: {
							6: {
								type: 'Point',
								coordinates: [0.75, 0.7],
							},
							7: {
								type: 'Point',
								coordinates: [0.75, 0.7],
							},
						},
					},
				},
				spatialDataSourceA1: {
					featureKeyA1: {
						geometry: {
							type: 'Point',
							coordinates: [10, 50],
						},
					},
					featureKeyA2: {
						geometry: {
							type: 'Point',
							coordinates: [10, 51],
						},
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
						},
					},
					index: {
						6: {
							'0,0': {
								spatialDataSource1: [
									'featureKey1',
									'featureKey2',
									'featureKey5',
								],
								spatialDataSource2: ['featureKey11'],
								spatialDataSource3: ['featureKey21'],
								spatialDataSource4: [],
							},
							'0,1': {
								spatialDataSource1: ['featureKey3'],
								spatialDataSource2: ['featureKey12'],
							},
							'1,1': {
								spatialDataSource2: ['featureKey13', 'featureKey14'],
							},
						},
						7: {
							'0.5,0.5': {
								spatialDataSource1: ['featureKey2'],
								spatialDataSource3: ['featureKey21'],
							},
						},
					},
				},
			],
		},
		spatialDataSources: {
			byKey: {
				spatialDataSource1: {
					key: 'spatialDataSource1',
					data: {
						type: 'tiledVector',
						fidColumnName: 'fid',
						geometryColumnName: 'geom',
					},
				},
				spatialDataSource2: {
					key: 'spatialDataSource2',
					data: {
						type: 'tiledVector',
						fidColumnName: 'fid',
					},
				},
				spatialDataSource3: {
					key: 'spatialDataSource3',
					data: {
						type: 'tiledVector',
						fidColumnName: 'fid',
					},
				},
				spatialDataSource4: {
					key: 'spatialDataSource4',
					data: {
						type: 'wmts',
					},
				},
				spatialDataSource5: {
					key: 'spatialDataSource5',
					data: {
						type: 'wmts',
					},
				},
				spatialDataSource6: {
					key: 'spatialDataSource6',
					data: {
						type: 'wmts',
						url: 'https://background.fromstate',
					},
				},
				spatialDataSource7: {
					key: 'spatialDataSource7',
					data: {
						type: 'wtfType',
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
						},
					},
					index: {
						1: 'spatialDataSource1',
						2: 'spatialDataSource2',
						3: 'spatialDataSource3',
						4: 'spatialDataSource4',
					},
				},
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place2',
						},
					},
					index: {1: 'spatialDataSource5'},
				},
				{
					filter: {
						layerTemplateKey: 'layerTemplateWmts',
					},
					index: {1: 'spatialDataSource6'},
				},
				{
					filter: {
						layerTemplateKey: 'layerTemplateUnsupportedLayerType',
					},
					index: {1: 'spatialDataSource7'},
				},
			],
		},
		spatialRelations: {
			byKey: {
				spatialRelation1: {
					key: 'spatialRelation1',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place1',
						spatialDataSourceKey: 'spatialDataSource1',
					},
				},
				spatialRelation2: {
					key: 'spatialRelation2',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place1',
						spatialDataSourceKey: 'spatialDataSource2',
					},
				},
				spatialRelation3: {
					key: 'spatialRelation3',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place1',
						spatialDataSourceKey: 'spatialDataSource3',
					},
				},
				spatialRelation4: {
					key: 'spatialRelation4',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place1',
						spatialDataSourceKey: 'spatialDataSource4',
					},
				},
				spatialRelation5: {
					key: 'spatialRelation5',
					data: {
						scopeKey: 'scope1',
						placeKey: 'place2',
						spatialDataSourceKey: 'spatialDataSource5',
					},
				},
				spatialRelation6: {
					key: 'spatialRelation6',
					data: {
						layerTemplateKey: 'layerTemplateWmts',
						spatialDataSourceKey: 'spatialDataSource6',
					},
				},
				spatialRelation7: {
					key: 'spatialRelation7',
					data: {
						layerTemplateKey: 'layerTemplateUnsupportedLayerType',
						spatialDataSourceKey: 'spatialDataSource6',
					},
				},
			},
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
						},
					},
					index: {
						1: 'spatialRelation1',
						2: 'spatialRelation2',
						3: 'spatialRelation3',
						4: 'spatialRelation4',
					},
				},
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place2',
						},
					},
					index: {1: 'spatialRelation5'},
				},
				{
					filter: {
						layerTemplateKey: 'layerTemplateWmts',
					},
					index: {1: 'spatialRelation6'},
				},
				{
					filter: {
						layerTemplateKey: 'layerTemplateUnsupportedLayerType',
					},
					index: {1: 'spatialRelation7'},
				},
			],
		},
	},
	styles: {
		byKey: {
			style1: {
				definition: {
					rules: [
						{
							styles: [
								{
									attributeKey: 'attribute1',
									attributeValues: {
										A: {
											shape: 'circle',
										},
										B: {
											shape: 'diamond',
										},
										C: {
											shape: 'square',
										},
									},
								},
								{
									attributeKey: 'attribute2',
									attributeClasses: [
										{
											fill: '#aaaaaa',
											interval: [0, 100],
										},
										{
											fill: '#bbbbbb',
											interval: [100, 200],
										},
									],
								},
							],
						},
					],
				},
			},
		},
	},
};
