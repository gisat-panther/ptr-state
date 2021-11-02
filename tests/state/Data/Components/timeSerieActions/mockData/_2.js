export const inTwoFirst = {
	timeSerieRelations: {
		total: 2,
		offset: 0,
		limit: 1,
		timeSerieRelations: [
			{
				key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
				data: {
					timeSerieKey: 'timeSerieDataSourceKey1',
					applicationKey: 'testKey',
				},
			},
		],
	},
	timeSerieData: {
		total: 2,

		offset: 0,
		limit: 1,
		timeSerieData: {
			timeSerieDataSourceKey1: {
				'feature-id1': [
					{
						period: '2021-01',
						value: 1,
					},
					{
						period: '2021-02',
						value: 4,
					},
				],
			},
			timeSerieDataSourceKey2: {
				'feature-id3': [
					{
						period: '2021-01',
						value: 'apple',
					},
					{
						period: '2021-02',
						value: 'orange',
					},
				],
			},
		},

		index: ['feature-id1', 'feature-id3'],
	},
};

export const inTwoSecond = {
	timeSerieRelations: {
		total: 2,
		offset: 1,
		limit: 1,
		timeSerieRelations: [
			{
				key: '333e266c-40d4-4bfe-ad75-964d9af1f57f',
				data: {
					timeSerieKey: 'timeSerieDataSourceKey2',
					applicationKey: 'testKey',
				},
			},
		],
	},
	timeSerieData: {
		total: 2,

		offset: 1,
		limit: 1,
		timeSerieData: {
			timeSerieDataSourceKey1: {
				'feature-id2': [
					{
						period: '2021-01',
						value: 10,
					},
					{
						period: '2021-02',
						value: 40,
					},
				],
			},
			timeSerieDataSourceKey2: {
				'feature-id4': [
					{
						period: '2021-01',
						value: 'orange',
					},
					{
						period: '2021-02',
						value: 'melone',
					},
				],
			},
		},

		index: ['feature-id2', 'feature-id4'],
	},
};
