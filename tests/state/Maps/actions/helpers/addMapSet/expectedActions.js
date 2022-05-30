export const expectedActions1 = [
	{
		type: 'MAPS.SET.ADD',
		mapSet: {
			key: 'mapSet10',
			maps: ['map1'],
		},
	},
	{
		type: 'MAPS.SET.USE.REGISTER',
		mapSetKey: 'mapSet10',
	},
	{
		type: 'MAPS.MAP.USE.REGISTER',
		mapKey: 'map1',
	},
];

export const expectedActions2 = [
	{
		type: 'MAPS.SET.ADD',
		mapSet: {
			key: 'mapSet10',
			data: {},
		},
	},
];
