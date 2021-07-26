import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('addWithIndex-test', function () {
	const state = {
		...INITIAL_STATE,
		byDataSourceKey: {
			dataSourceKey1: {
				feature1: 2,
			},
		},
		indexes: [
			{
				count: 2,
				filter: {
					modifiers: {scopeKey: 'scope1'},
				},
				order: null,
				changedOn: null,
				index: {
					1: 'feature1',
				},
			},
		],
	};

	it('Should add data with index', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				dataSourceKey3: {
					feature7: 'A',
				},
			},
			indexes: [
				...state.indexes,
				{
					count: 1,
					filter: {
						modifiers: {scopeKey: 'scope2'},
					},
					order: null,
					changedOn: null,
					index: {
						1: 'feature7',
					},
				},
			],
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX',
			data: {
				dataSourceKey3: {
					feature7: 'A',
				},
			},
			filter: {
				modifiers: {
					scopeKey: 'scope2',
				},
			},
			index: ['feature7'],
			total: 1,
			start: 1,
			changedOn: null,
			order: null,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add data with index to existing data source and existing index', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				dataSourceKey1: {
					feature1: 2,
					feature2: 5,
				},
			},
			indexes: [
				{
					count: 2,
					filter: {
						modifiers: {scopeKey: 'scope1'},
					},
					order: null,
					changedOn: null,
					index: {
						1: 'feature1',
						2: 'feature2',
					},
				},
			],
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX',
			data: {
				dataSourceKey1: {
					feature2: 5,
				},
			},
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			index: ['feature2'],
			total: 2,
			start: 2,
			changedOn: null,
			order: null,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});
});
