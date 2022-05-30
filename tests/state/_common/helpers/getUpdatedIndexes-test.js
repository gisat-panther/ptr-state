import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('getUpdatedIndexes', function () {
	it('Add new spatial index', () => {
		const state = {
			spatialIndexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
			],
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		const indexData = [
			{
				7: {
					'2.8125, 50.625': {
						dataSourceKey3: ['feature7'],
					},
				},
			},
		];
		const order = null;
		const changedOn = null;

		const updatedIndexes = commonHelpers.getUpdatedIndexes(
			state,
			filter,
			order,
			indexData,
			changedOn,
			'spatialIndexes'
		);
		assert.deepStrictEqual(updatedIndexes, [
			...state.spatialIndexes,
			{
				filter,
				order,
				changedOn,
				index: indexData[0],
			},
		]);
	});

	it('Add new index', () => {
		const state = {
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope1',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
			],
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		const indexData = [
			{
				7: {
					'2.8125, 50.625': {
						dataSourceKey3: ['feature7'],
					},
				},
			},
		];
		const order = null;
		const changedOn = null;

		const updatedIndexes = commonHelpers.getUpdatedIndexes(
			state,
			filter,
			order,
			indexData,
			changedOn,
			'indexes'
		);
		assert.deepStrictEqual(updatedIndexes, [
			...state.indexes,
			{
				filter,
				order,
				changedOn,
				index: indexData[0],
			},
		]);
	});

	it('Override feature in tile if filter and order is same', () => {
		const state = {
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope2',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
			],
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		const indexData = [
			{
				7: {
					'2.8125, 50.625': {
						dataSourceKey1: ['feature7'],
					},
				},
			},
		];
		const order = null;
		const changedOn = null;

		const updatedIndexes = commonHelpers.getUpdatedIndexes(
			state,
			filter,
			order,
			indexData,
			changedOn,
			'indexes'
		);
		assert.deepStrictEqual(updatedIndexes, [
			{
				filter,
				order,
				changedOn,
				index: {
					7: {
						'2.8125, 50.625': {
							dataSourceKey1: ['feature7'],
						},
					},
				},
			},
		]);
	});
	it('Add override previous datasource in state under same filter, level and tile.', () => {
		const state = {
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope2',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
			],
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		const indexData = [
			{
				7: {
					'2.8125, 50.625': {
						dataSourceKey3: ['feature7'],
					},
				},
			},
		];
		const order = null;
		const changedOn = null;

		const updatedIndexes = commonHelpers.getUpdatedIndexes(
			state,
			filter,
			order,
			indexData,
			changedOn,
			'indexes'
		);
		assert.deepStrictEqual(updatedIndexes, [
			{
				filter,
				order,
				changedOn,
				index: {
					7: {
						'2.8125, 50.625': {
							dataSourceKey3: ['feature7'],
						},
					},
				},
			},
		]);
	});

	it('Add level to same index', () => {
		const state = {
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope2',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
			],
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		const indexData = [
			{
				0: {
					'0, 0': {
						dataSourceKey3: ['feature7'],
					},
				},
			},
		];
		const order = null;
		const changedOn = null;

		const updatedIndexes = commonHelpers.getUpdatedIndexes(
			state,
			filter,
			order,
			indexData,
			changedOn,
			'indexes'
		);
		assert.deepStrictEqual(updatedIndexes, [
			{
				filter,
				order,
				changedOn,
				index: {
					0: {
						'0, 0': {
							dataSourceKey3: ['feature7'],
						},
					},
					7: {
						'2.8125, 50.625': {
							dataSourceKey1: ['feature1'],
						},
					},
				},
			},
		]);
	});

	it('Add tile to same index', () => {
		const state = {
			indexes: [
				{
					filter: {
						modifiers: {
							scopeKey: 'scope2',
						},
					},
					order: null,
					changedOn: null,
					index: {
						7: {
							'2.8125, 50.625': {
								dataSourceKey1: ['feature1'],
							},
						},
					},
				},
			],
		};

		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		const indexData = [
			{
				7: {
					'2.1, 50.3': {
						dataSourceKey3: ['feature7'],
					},
				},
			},
		];
		const order = null;
		const changedOn = null;

		const updatedIndexes = commonHelpers.getUpdatedIndexes(
			state,
			filter,
			order,
			indexData,
			changedOn,
			'indexes'
		);
		assert.deepStrictEqual(updatedIndexes, [
			{
				filter,
				order,
				changedOn,
				index: {
					7: {
						'2.8125, 50.625': {
							dataSourceKey1: ['feature1'],
						},
						'2.1, 50.3': {
							dataSourceKey3: ['feature7'],
						},
					},
				},
			},
		]);
	});
});
