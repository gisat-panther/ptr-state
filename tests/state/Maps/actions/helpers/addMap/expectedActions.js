export const expectedActions1 = [
	{
		type: 'MAPS.MAP.ADD',
		map: {
			key: 'map1',
			data: {
				viewport: {
					width: 10,
					height: 10,
				},
			},
		},
	},
	{
		type: 'MAPS.MAP.USE.REGISTER',
		mapKey: 'map1',
	},
];
