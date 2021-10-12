import {assert} from 'chai';
import {
	getPageSize,
	tileAsString,
	tileAsArray,
	getMissingTiles,
} from '../../../src/state/Data/helpers';

describe('state/Data/helpers', function () {
	describe('getPageSize', function () {
		it('It return pageSize from state', function () {
			const localConfiguration = {
				requestPageSize: 99,
			};
			assert.strictEqual(getPageSize(localConfiguration), 99);
		});
		it('It return pageSize from ptr-core', function () {
			const localConfiguration = {};
			assert.strictEqual(getPageSize(localConfiguration), 100);
		});
	});

	describe('tileAsString', function () {
		it('Convert array tile to string [-90,180]', function () {
			assert.strictEqual(tileAsString([-90, 180]), '-90,180');
		});

		it('Convert array tile to string [90,-180]', function () {
			assert.strictEqual(tileAsString([90, -180]), '90,-180');
		});

		it('Convert array tile to string [`90`,`-180`]', function () {
			assert.strictEqual(tileAsString(['90', '-180']), '90,-180');
		});

		it('Convert string tile to string `90,-180`', function () {
			assert.strictEqual(tileAsString('90,-180'), '90,-180');
		});

		it('Convert string tile to string [`90,-180`]', function () {
			assert.strictEqual(tileAsString(['90,-180']), '90,-180');
		});

		it('Convert string tile to string [`0,1e10-2`]', function () {
			assert.strictEqual(tileAsString([0, 1e-2]), '0,0.01');
		});

		it('Convert string tile to string [`0,1e10-5`]', function () {
			assert.strictEqual(tileAsString([0, 1e-5]), '0,0.00001');
		});

		it('Convert string tile to string [`0,0.0000000001`]', function () {
			assert.strictEqual(tileAsString([0, 0.0000000001]), '0,0.0000000001');
		});
	});

	describe('tileAsArray', function () {
		it('Convert string tile to array -90,180', function () {
			assert.deepStrictEqual(tileAsArray('-90,180'), [-90, 180]);
		});
		it('Convert string tile to array 90,-180', function () {
			assert.deepStrictEqual(tileAsArray('90,-180'), [90, -180]);
		});

		it('Convert string tile to array 90.00001,-180.00001', function () {
			assert.deepStrictEqual(
				tileAsArray('90.00001,-180.00001'),
				[90.00001, -180.00001]
			);
		});

		it('Convert string tile to array 90.000000000000001,-180.000000000000001', function () {
			assert.deepStrictEqual(
				tileAsArray('90.000000000000001,-180.000000000000001'),
				[90.000000000000001, -180.000000000000001]
			);
		});

		it('Convert string tile to array 90.000000000000001,0.000000000000001', function () {
			assert.deepStrictEqual(
				tileAsArray('90.000000000000001,0.000000000000001'),
				[90.000000000000001, 0.000000000000001]
			);
		});

		it('Convert string tile to array 90.33333333333333,-180.33333333333333', function () {
			assert.deepStrictEqual(
				tileAsArray('90.33333333333333,-180.33333333333333'),
				[90.33333333333333, -180.33333333333333]
			);
		});

		it('Convert array tile to array [90,-180]', function () {
			assert.deepStrictEqual(tileAsArray([90, -180]), [90, -180]);
		});
		it('Convert array tile to array [`90.001`,`-180.001`]', function () {
			assert.deepStrictEqual(
				tileAsArray(['90.001', '-180.001']),
				[90.001, -180.001]
			);
		});

		it('Convert array tile to array [`90.001,-180.001`]', function () {
			assert.deepStrictEqual(
				tileAsArray(['90.001,-180.001']),
				[90.001, -180.001]
			);
		});

		it('Tryes to convert string `test` to array return null.', function () {
			assert.deepStrictEqual(tileAsArray('test'), null);
		});

		it('Tryes to convert string `test,test` to array return null.', function () {
			assert.deepStrictEqual(tileAsArray('test,test'), null);
		});

		it('Tryes to convert string [`test`,`test`] to array return null.', function () {
			assert.deepStrictEqual(tileAsArray(['test', 'test']), null);
		});

		it('Tryes to convert string [NaN,NaN] to array return null.', function () {
			assert.deepStrictEqual(tileAsArray([NaN, NaN]), null);
		});
	});

	describe('getMissingTiles', function () {
		it('Get missing tiles for null index.', function () {
			const index = null;

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles for empty index.', function () {
			const index = {};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles for null index.index.', function () {
			const index = {
				index: null,
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles for empty index.index.', function () {
			const index = {
				index: {},
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles for null index.index.[0]', function () {
			const index = {
				index: {
					0: null,
				},
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles for empty index.index.[0]', function () {
			const index = {
				index: {
					0: {},
				},
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles for empty index for same filter level', function () {
			const index = {
				index: {
					1: {},
				},
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});

		it('Get missing tiles [] for tiles that are loading.', function () {
			const index = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), []);
		});

		it('Get missing tiles [] for tiles that are loading and filter tiles are in string format [`0,0`].', function () {
			const index = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};

			const filter = {
				tiles: [['0,0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), []);
		});

		it('Get missing tiles [] for loaded tiles.', function () {
			const index = {
				index: {
					1: {
						'0,0': {
							xxxx: [1, 2],
						},
					},
				},
			};

			const filter = {
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), []);
		});

		it('Get missing tiles [1,0] for loaded tiles.', function () {
			const index = {
				index: {
					1: {
						'0,0': {
							xxxx: [1, 2],
						},
						'2,0': {
							xxxx: [1, 2],
						},
					},
				},
			};

			const filter = {
				tiles: [
					['0', '0'],
					['1', '0'],
					['2', '0'],
				],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['1', '0']]);
		});

		it('Get missing tiles [[0, 0]] for loaded tiles with negative zero [-0,-0].', function () {
			const index = {
				index: {
					1: {
						'-0,-0': {
							xxxx: [1, 2],
						},
					},
				},
			};

			const filter = {
				// tiles: [[0, 0]], FIXME test this format
				tiles: [['0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['0', '0']]);
		});
		it('Get missing tiles [] for loaded tiles with negative zero in filter [-0,-0].', function () {
			const index = {
				index: {
					1: {
						'-0,-0': {
							xxxx: [1, 2],
						},
					},
				},
			};

			const filter = {
				// tiles: [[-0, -0]], //fixme test this format
				tiles: [['-0', '-0']], //fixme test this format
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), []);
		});

		it('Get missing tiles [0,0] for loaded tiles with negative zero in filter [-0,-0].', function () {
			const index = {
				index: {
					1: {},
				},
			};

			const filter = {
				tiles: [['-0', '0']],
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), [['-0', '0']]);
		});

		it('Return null if filter tiles is missing', function () {
			const index = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};

			const filter = {
				tiles: null,
				level: 1,
			};

			assert.deepStrictEqual(getMissingTiles(index, filter), null);
		});

		it('Return null if filter is missing', function () {
			const index = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};

			const filter = null;

			assert.deepStrictEqual(getMissingTiles(index, filter), null);
		});
	});
});
