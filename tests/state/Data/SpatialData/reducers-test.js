import {assert} from 'chai';
import reducer from '../../../../src/state/Data/SpatialData/reducers';

describe('state/Data/SpatialData', function () {
	it('add new data', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byDataSourceKey: {
						key2: {
							featureKey2: {
								geometries: {
									2: {geom: ['geom']},
								},
							},
						},
					},
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD',
					key: 'key1',
					data: {featureKey1: {geom: ['geom']}},
					level: 2,
				}
			),
			{
				byDataSourceKey: {
					key1: {
						featureKey1: {
							geometries: {
								2: {
									geom: ['geom'],
								},
							},
						},
					},
					key2: {
						featureKey2: {
							geometries: {
								2: {geom: ['geom']},
							},
						},
					},
				},
			}
		);
	});

	it('add data on key that exists', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byDataSourceKey: {
						ds1: {
							fk1: {
								geometries: {
									2: {geom: ['geom']},
								},
							},
						},
					},
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD',
					key: 'ds1',
					data: {
						fk2: {geom: ['geom']},
					},
					level: 3,
				}
			),
			{
				byDataSourceKey: {
					ds1: {
						fk1: {
							geometries: {
								2: {geom: ['geom']},
							},
						},
						fk2: {
							geometries: {
								3: {geom: ['geom']},
							},
						},
					},
				},
			}
		);
	});

	it('add new indexes 1', function () {
		const filter = {scope: 'cities'};
		const order = null;
		const level = 10;
		const spatialDataSourceKey = 'key1';
		const tile = '15,51';
		const data = [{[level]: {[tile]: {dsKey: [1, 2, 3]}}}];
		const changedOn = null;
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter,
					order,
					indexData: data,
					changedOn,
				}
			),
			{
				indexes: [
					{
						filter,
						order,
						changedOn,
						index: {[level]: {[tile]: {dsKey: [1, 2, 3]}}},
					},
				],
			}
		);
	});

	it('add new indexes 2', function () {
		const filter = {scope: 'cities'};
		const order = null;
		const level = 10;
		const spatialDataSourceKey = 'key1';
		const tile = '15,51';
		const tile2 = '15,52';
		const data = [
			{
				[level]: {
					[tile]: [1, 2, 3],
					[tile2]: [1, 2, 5, 6],
				},
			},
		];
		const changedOn = null;
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter,
					order,
					indexData: data,
					changedOn,
				}
			),
			{
				indexes: [
					{
						filter,
						order,
						index: {
							[level]: {
								[tile]: [1, 2, 3],
								[tile2]: [1, 2, 5, 6],
							},
						},
						changedOn,
					},
				],
			}
		);
	});

	it('update index on add indexes', function () {
		const filter = {scope: 'cities'};
		const order = null;
		const level = 10;
		const spatialDataSourceKey = 'key1';
		const tile = '15,51';
		const tile2 = '15,52';
		const index = {
			[level]: {
				[tile]: [1, 2, 9],
				[tile2]: [1, 2, 5, 6],
			},
		};
		const updateIndex = [
			{
				[level]: {
					[tile2]: [1, 9, 11, 10, 89],
				},
			},
		];
		const changedOn = null;
		assert.deepStrictEqual(
			reducer(
				{
					indexes: [
						{
							filter,
							order,
							index: index,
							changedOn,
						},
					],
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter,
					order,
					indexData: updateIndex,
					changedOn,
				}
			),
			{
				indexes: [
					{
						filter,
						order,
						index: {
							[level]: {
								[tile]: [1, 2, 9],
								[tile2]: [1, 9, 11, 10, 89],
							},
						},
						changedOn,
					},
				],
			}
		);
	});
});
