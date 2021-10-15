import {assert} from 'chai';
import {getMissingTiles} from '../../../../src/state/Data/helpers';

describe('state/Data/helpers/getMissingTiles', function () {
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
