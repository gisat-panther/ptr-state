export const CommonReducersState = {
	activeKey: 'key1',
	byKey: {
		key1: {
			key: 'key1',
			data: {
				nameDisplay: 'Albi',
				nameInternal: 'Albert',
			},
			permissions: {
				guest: {
					get: true,
					update: true,
					delete: true,
				},
			},
		},
		key2: {
			key: 'key2',
			data: {
				nameDisplay: 'Berty',
				nameInternal: 'Bert',
			},
		},
	},
	editedByKey: {
		key1: {
			key: 'key1',
			data: {
				nameDisplay: 'Alb',
			},
		},
		key201: {
			key: 'key201',
			data: {
				nameInternal: 'Cyril',
				nameDisplay: 'Cyr',
			},
		},
	},
	inUse: {
		keys: {
			ComponentA: ['key1', 'key2'],
			ComponentB: ['key3'],
		},
		indexes: {
			ComponentA: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 1,
					length: 10,
				},
			],
			ComponentB: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 3,
					length: 7,
				},
			],
			ComponentC: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 12,
					length: 3,
				},
			],
			ComponentD: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 12,
					length: 4,
				},
				{
					filter: {
						scopeKey: 'scope2',
					},
					order: null,
					start: 3,
					length: 3,
				},
			],
			ComponentE: [
				{
					filter: {
						scopeKey: 'scope2',
					},
					order: null,
					start: 1,
					length: 5,
				},
			],
		},
	},
	indexes: [
		{
			filter: {
				scopeKey: 'scope1',
			},
			order: null,
			count: 4,
			index: {1: 'A', 2: 'C', 3: 'B'},
		},
		{
			filter: {
				scopeKey: 'scope1',
			},
			order: [['nameInternal', 'ascending']],
			count: 3,
			index: {1: 'A', 2: 'B', 3: 'C'},
		},
		{
			filter: {
				scopeKey: 'scope2',
			},
			order: null,
			count: 6,
			index: {1: 'A', 2: 'B', 3: 'C', 4: true, 5: true, 6: true},
		},
		{
			filter: {
				scopeKey: 'scope3',
			},
			order: null,
			count: 6,
			index: {4: 'E', 5: 'F', 6: 'G'},
		},
		{
			filter: {
				scopeKey: 'scope4',
			},
			order: null,
			count: 10,
			index: {},
		},
		{
			filter: {
				scopeKey: 'scope5',
			},
			order: null,
			count: 6,
			index: {2: true, 3: 'C', 4: true},
		},
	],
};
