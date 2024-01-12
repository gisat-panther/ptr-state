import Select from '../../../../src/state/Select';
import {assert} from 'chai';

const state = {
	periods: {
		activeKey: '2020',
	},
	maps: {
		maps: {
			map1: {
				key: 'map-1',
				data: {
					metadataModifiers: {
						areaTreeLevelKey: 'areaTreeLevelKey2',
					},
				},
			},
		},
		sets: {
			mapSet1: {
				key: 'mapSet1',
				maps: ['map-1'],
				sync: {},
				activeMapKey: 'map-1',
				data: {
					metadataModifiers: {
						areaTreeLevelKey: 'areaTreeLevelKey1',
					},
					filterByActive: {
						period: true,
					},
				},
			},
		},
	},
};

describe('getFilterByMapSetKey-test', function () {
	it('should return merged filter by active _1', () => {
		const expectedResult = {
			periodKey: '2020',
			areaTreeLevelKey: 'areaTreeLevelKey1',
		};
		const output = Select.maps.getFilterByMapSetKey(state, 'mapSet1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged filter by active _2', () => {
		const customState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					mapSet1: {
						...state.maps.sets.mapSet1,
						data: {
							...state.maps.sets.mapSet1.data,
							filterByActive: {
								...state.maps.sets.mapSet1.data.filterByActive,
								case: true,
							},
						},
					},
				},
			},
		};

		const expectedResult = {
			periodKey: '2020',
			areaTreeLevelKey: 'areaTreeLevelKey1',
		};
		const output = Select.maps.getFilterByMapSetKey(customState, 'mapSet1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged filter by active _3', () => {
		const customState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					mapSet1: {
						...state.maps.sets.mapSet1,
						data: {
							...state.maps.sets.mapSet1.data,
							metadataModifiers: {
								...state.maps.sets.mapSet1.data.metadataModifiers,
								periodKey: '2021',
							},
						},
					},
				},
			},
		};

		const expectedResult = {
			periodKey: '2021',
			areaTreeLevelKey: 'areaTreeLevelKey1',
		};
		const output = Select.maps.getFilterByMapSetKey(customState, 'mapSet1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged filter by active _4', () => {
		const customState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					mapSet1: {
						...state.maps.sets.mapSet1,
						data: {
							metadataModifiers: {},
							filterByActive: {
								case: true,
							},
						},
					},
				},
			},
		};

		const expectedResult = null;
		const output = Select.maps.getFilterByMapSetKey(customState, 'mapSet1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged filter by active _5', () => {
		const customState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					mapSet1: {
						...state.maps.sets.mapSet1,
						data: {
							metadataModifiers: {},
							filterByActive: {},
						},
					},
				},
			},
		};

		const expectedResult = null;
		const output = Select.maps.getFilterByMapSetKey(customState, 'mapSet1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return merged filter by active _6', () => {
		const customState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					mapSet1: {
						...state.maps.sets.mapSet1,
						data: {
							metadataModifiers: {
								caseKey: 'test',
							},
							filterByActive: {},
						},
					},
				},
			},
		};

		const expectedResult = {caseKey: 'test'};
		const output = Select.maps.getFilterByMapSetKey(customState, 'mapSet1');
		assert.deepStrictEqual(output, expectedResult);
	});
});
