import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/TimeSerie/reducers';

describe('addWithIndex-test', function () {
	const state = {
		...INITIAL_STATE,
	};

	it('Should add data and index to the empty store', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				timeSerieDataSourceKey1: {
					'feature-id1': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id2': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
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
						timeSerieDataSourceKey1: {
							1: 'feature-id1',
							2: 'feature-id2',
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				timeSerieDataSourceKey1: {
					'feature-id1': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id2': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
			start: 1,
			changedOn: null,
			total: 2,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add data and index to the store with loading indexes', function () {
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
						1: true,
						2: true,
					},
				},
			],
		};

		const expectedState = {
			...state,
			byDataSourceKey: {
				timeSerieDataSourceKey1: {
					'feature-id1': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id2': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
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
						timeSerieDataSourceKey1: {
							1: 'feature-id1',
							2: 'feature-id2',
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				timeSerieDataSourceKey1: {
					'feature-id1': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id2': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
			start: 1,
			changedOn: null,
			total: 2,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add data and index to the store with data and indexes.', function () {
		const stateWithLoadingIndexes = {
			...state,
			byDataSourceKey: {
				timeSerieDataSourceKey1: {
					'feature-id1': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id2': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
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
						timeSerieDataSourceKey1: {
							1: 'feature-id1',
							2: 'feature-id2',
						},
					},
				},
			],
		};

		const expectedState = {
			...state,
			byDataSourceKey: {
				timeSerieDataSourceKey1: {
					'feature-id1': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id2': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
					'feature-id3': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id4': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
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
						timeSerieDataSourceKey1: {
							1: 'feature-id1',
							2: 'feature-id2',
							3: 'feature-id3',
							4: 'feature-id4',
						},
					},
				},
			],
		};

		const action = {
			type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			order: null,
			data: {
				timeSerieDataSourceKey1: {
					'feature-id3': [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
					'feature-id4': [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			},
			start: 3,
			changedOn: null,
			total: 4,
		};

		const output = reducers(stateWithLoadingIndexes, action);
		assert.deepStrictEqual(output, expectedState);
	});
});
