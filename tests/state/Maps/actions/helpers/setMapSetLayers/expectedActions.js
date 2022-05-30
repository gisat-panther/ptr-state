export const expectedActions1 = [
	{
		type: 'MAPS.SET.LAYERS.SET',
		setKey: 'set1',
		layers: [
			{
				key: 'layer1',
				layerTemplateKey: 'layerTemplateKey1',
			},
		],
	},
	{
		type: 'DATA.SPATIAL_DATA.INDEX.ADD',
		filter: {
			layerTemplateKey: 'layerTemplateKey1',
		},
		order: null,
		indexData: [
			{
				0: {
					'0,-90': true,
				},
			},
		],
		changedOn: null,
	},
	{
		type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
		filter: {
			layerTemplateKey: 'layerTemplateKey1',
			styleKey: null,
		},
		order: null,
		indexData: [
			{
				0: {
					'0,-90': true,
				},
			},
		],
		changedOn: null,
	},
	{
		type: 'ERROR',
	},
];
