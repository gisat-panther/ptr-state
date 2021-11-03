export const restInTwoFirst = {
	timeSerieRelations: {
		total: 2,
		offset: 1,
		limit: 1,
		timeSerieRelations: [
			{
				key: '759c6982-af2a-4c2a-8fad-69c07f7d76e7',
				data: {
					scopeKey: null,
					periodKey: null,
					placeKey: null,
					attributeDataSourceKey: null,
					layerTemplateKey: null,
					scenarioKey: null,
					caseKey: null,
					attributeSetKey: null,
					attributeKey: null,
					areaTreeLevelKey: null,
					applicationKey: 'testKey',
				},
			},
		],
	},
	timeSerieData: {
		total: 4,
		offset: 2,
		limit: 1,
		timeSerieData: {
			timeSerieDataSourceKey1: {
				'feature-id5': [
					{
						period: '2021-05',
						value: 5,
					},
				],
			},
			timeSerieDataSourceKey2: {},
		},

		index: ['feature-id5'],
	},
};

export const restInTwoSecond = {
	timeSerieRelations: {
		total: 2,
		offset: 0,
		limit: 0,
		timeSerieRelations: [],
	},
	timeSerieData: {
		total: 4,

		offset: 3,
		limit: 1,
		timeSerieData: {
			timeSerieDataSourceKey1: {
				'feature-id6': [
					{
						period: '2021-06',
						value: 6,
					},
				],
			},
		},

		index: ['feature-id6'],
	},
};
