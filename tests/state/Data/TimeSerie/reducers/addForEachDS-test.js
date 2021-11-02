import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/TimeSerie/reducers';

describe('addForEachDS-test', function () {
	const state = {
		...INITIAL_STATE,
		timeSerieIndexes: [
			{
				filter: {
					modifiers: {
						scopeKey: 'scope1',
					},
				},
				order: null,
				changedOn: null,
				index: {
					dsKey1: {
						1: 'featureKey1',
					},
				},
			},
		],
	};

	it('Should add no data', function () {
		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 1,
					index: {
						dsKey1: {
							1: 'featureKey1',
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: [],
			changedOn: null,
			total: 1,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add loading indicator to the empty indexes', function () {
		const stateWithoutIndexes = {
			...state,
			timeSerieIndexes: [],
		};
		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: null,
					index: {
						22: true,
						23: true,
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				22: true,
				23: true,
			},
			changedOn: null,
			total: null,
		};

		const output = reducers(stateWithoutIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add loading indicator to the loading indexes', function () {
		const stateWithLoadingIndexes = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: null,
					index: {
						23: true,
						24: true,
					},
				},
			],
		};
		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: null,
					index: {
						23: true,
						24: true,
						25: true,
						26: true,
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				25: true,
				26: true,
			},
			changedOn: null,
			total: null,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add loading indicator to the indexes with data', function () {
		const stateWithLoadingIndexes = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 4,
					index: {
						dsKey1: {
							1: null,
							2: null,
						},
						dsKey2: {
							1: 'featureKey1',
							2: 'featureKey2',
						},
					},
				},
			],
		};
		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 4,
					index: {
						dsKey1: {
							1: null,
							2: null,
							3: true,
							4: true,
						},
						dsKey2: {
							1: 'featureKey1',
							2: 'featureKey2',
							3: true,
							4: true,
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				3: true,
				4: true,
			},
			changedOn: null,
			total: 4,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should overwrite data indexes with loading index', function () {
		const stateWithLoadingIndexes = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 2,
					index: {
						dsKey1: {
							1: null,
							2: null,
						},
						dsKey2: {
							1: 'featureKey1',
							2: 'featureKey2',
						},
					},
				},
			],
		};
		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 2,
					index: {
						dsKey1: {
							1: true,
							2: true,
						},
						dsKey2: {
							1: true,
							2: true,
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				1: true,
				2: true,
			},
			changedOn: null,
			total: 2,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should put data indexes to the empty store indexes', function () {
		const stateWithEmptyIndexes = {
			...state,
			timeSerieIndexes: [],
		};
		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 2,
					index: {
						dsKey1: {
							1: 'featureKey1',
							2: 'featureKey2',
						},
						dsKey2: {
							1: 'featureKey3',
							2: 'featureKey4',
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				dsKey1: {
					1: 'featureKey1',
					2: 'featureKey2',
				},
				dsKey2: {
					1: 'featureKey3',
					2: 'featureKey4',
				},
			},
			total: 2,
			changedOn: null,
		};

		const output = reducers(stateWithEmptyIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should put data indexes to the loading indexes and overwrite only data on same indexes', function () {
		const stateWithLoadingIndexes = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					index: {
						1: true,
						2: true,
						3: true,
					},
				},
			],
		};

		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 3,
					index: {
						dsKey1: {
							1: 'featureKey1',
							2: 'featureKey2',
							3: true,
						},
						dsKey2: {
							1: 'featureKey3',
							2: 'featureKey4',
							3: true,
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			total: 3,
			data: {
				dsKey1: {
					1: 'featureKey1',
					2: 'featureKey2',
				},
				dsKey2: {
					1: 'featureKey3',
					2: 'featureKey4',
				},
			},
			changedOn: null,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should put data indexes to the dsKeys structured indexes and overwrite only data on same indexes', function () {
		const stateWithLoadingIndexes = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 4,
					index: {
						dsKey1: {
							1: true,
							2: true,
							3: true,
							4: 'featureKey4',
						},
						dsKey2: {
							1: true,
							2: true,
							3: true,
							4: 'featureKey44',
						},
					},
				},
			],
		};

		const expectedState = {
			...state,
			timeSerieIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					count: 4,
					index: {
						dsKey1: {
							1: 'featureKey1',
							2: 'featureKey2',
							3: true,
							4: 'featureKey4',
						},
						dsKey2: {
							1: 'featureKey3',
							2: 'featureKey4',
							3: true,
							4: 'featureKey44',
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				dsKey1: {
					1: 'featureKey1',
					2: 'featureKey2',
				},
				dsKey2: {
					1: 'featureKey3',
					2: 'featureKey4',
				},
			},
			total: 4,
			changedOn: null,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});
});
