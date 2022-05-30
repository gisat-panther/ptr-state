//
// pageSize: 1
// first of two response with relations and geometry
//
export const responseWithSpatialData_1 = {
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
					'0,1': [18502],
				},
			},
		},
		'848e2559-936d-4262-a808-4c87aa60217d': {
			data: {},
			spatialIndex: {
				7: {
					'0,1': [],
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

//
// pageSize: 1
// second of two response with relations and geometry
//
export const responseWithSpatialData_2 = {
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
