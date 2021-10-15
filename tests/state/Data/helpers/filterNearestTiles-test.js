import {assert} from 'chai';
import {filterNearestTiles} from '../../../../src/state/Data/helpers';

describe('state/Data/helpers/filterNearestTiles', function () {
	it('Return tiles without conflicts _1', function () {
		const level = 2;
		const loadedHigher = {
			'0,0': {
				level: 1,
				tiles: ['0,0'],
			},
		};
		const loadedLower = {};
		const preferedLevelsDirection = 'HIGHER';
		const filtered = filterNearestTiles(
			level,
			loadedHigher,
			loadedLower,
			preferedLevelsDirection
		);

		assert.deepStrictEqual(filtered, {
			'0,0': {
				level: 1,
				tiles: ['0,0'],
			},
		});
	});

	it('Return tiles without conflicts _2', function () {
		const level = 1;
		const loadedHigher = {
			'0,0': {
				level: 0,
				tiles: ['0,-90'],
			},
		};
		const loadedLower = {
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
		};
		const preferedLevelsDirection = 'HIGHER';
		const filtered = filterNearestTiles(
			level,
			loadedHigher,
			loadedLower,
			preferedLevelsDirection
		);

		assert.deepStrictEqual(filtered, {
			'0,0': {
				level: 0,
				tiles: ['0,-90'],
			},
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
		});
	});

	it('Prefer LOWER tiles in conflict', function () {
		const level = 1;
		const loadedHigher = {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
		};
		const loadedLower = {
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
		};
		const preferedLevelsDirection = 'LOWER';
		const filtered = filterNearestTiles(
			level,
			loadedHigher,
			loadedLower,
			preferedLevelsDirection
		);

		assert.deepStrictEqual(filtered, {
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
		});
	});

	it('Prefer HIGHER tiles in conflict', function () {
		const level = 1;
		const loadedHigher = {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
		};
		const loadedLower = {
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
		};
		const preferedLevelsDirection = 'HIGHER';
		const filtered = filterNearestTiles(
			level,
			loadedHigher,
			loadedLower,
			preferedLevelsDirection
		);

		assert.deepStrictEqual(filtered, {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
		});
	});

	it('Prefer HIGHER tiles in conflict and include tiles from lower level without conflict.', function () {
		const level = 1;
		const loadedHigher = {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
		};
		const loadedLower = {
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
			'0,0': {
				level: 3,
				tiles: [
					'0,0',
					'22.5,0',
					'45,0',
					'67.5,0',
					'0,22.5',
					'22.5,22.5',
					'45,22.5',
					'67.5,22.5',
					'0,45',
					'22.5,45',
					'45,45',
					'67.5,45',
					'0,67.5',
					'22.5,67.5',
					'45,67.5',
					'67.5,67.5',
				],
			},
		};
		const preferedLevelsDirection = 'HIGHER';
		const filtered = filterNearestTiles(
			level,
			loadedHigher,
			loadedLower,
			preferedLevelsDirection
		);

		assert.deepStrictEqual(filtered, {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
			'0,0': {
				level: 3,
				tiles: [
					'0,0',
					'22.5,0',
					'45,0',
					'67.5,0',
					'0,22.5',
					'22.5,22.5',
					'45,22.5',
					'67.5,22.5',
					'0,45',
					'22.5,45',
					'45,45',
					'67.5,45',
					'0,67.5',
					'22.5,67.5',
					'45,67.5',
					'67.5,67.5',
				],
			},
		});
	});
	it('Prefer HIGHER tiles in conflict and nearest tile in conflict.', function () {
		const level = 1;
		const loadedHigher = {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
			'0,0': {
				level: 0,
				tiles: ['0,-90'],
			},
		};
		const loadedLower = {
			'-90,0': {
				level: 2,
				tiles: ['-90,0', '-45,0', '-90, 45', '-45,45'],
			},
			'0,0': {
				level: 3,
				tiles: [
					'0,0',
					'22.5,0',
					'45,0',
					'67.5,0',
					'0,22.5',
					'22.5,22.5',
					'45,22.5',
					'67.5,22.5',
					'0,45',
					'22.5,45',
					'45,45',
					'67.5,45',
					'0,67.5',
					'22.5,67.5',
					'45,67.5',
					'67.5,67.5',
				],
			},
		};
		const preferedLevelsDirection = 'HIGHER';
		const filtered = filterNearestTiles(
			level,
			loadedHigher,
			loadedLower,
			preferedLevelsDirection
		);

		assert.deepStrictEqual(filtered, {
			'-90,0': {
				level: 0,
				tiles: ['-90,0'],
			},
			'0,0': {
				level: 0,
				tiles: ['0,-90'],
			},
		});
	});
});
