export const first = {
	timeSerieRelations: {
		total: 1,
		offset: 0,
		limit: 2,
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
		limit: 2,
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
				'feature-id2': [
					{
						period: '2021-10',
						value: 1.2,
					},
					{
						period: '2021-12',
						value: 4,
					},
				],
			},
		},

		index: ['feature-id1', 'feature-id2'],
	},
};
