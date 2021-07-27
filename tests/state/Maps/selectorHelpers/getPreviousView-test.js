import selectorHelpers from '../../../../src/state/Maps/selectorHelpers';
import {assert} from 'chai';

describe('getPreviousView', function () {
	it('should merge map previousView with set previousView', () => {
		const map = {
			key: 'map1',
			data: {
				previousView: {
					center: {
						lat: 50,
						lon: 15,
					},
				},
			},
		};

		const set = {
			maps: ['map1'],
			sync: {
				boxRange: true,
			},
			data: {
				previousView: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			center: {
				lat: 50,
				lon: 15,
			},
			boxRange: 5000,
		};

		const output = selectorHelpers.getPreviousView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should use set boxRange, if the param is synced', () => {
		const map = {
			key: 'map1',
			data: {
				previousView: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 1000,
				},
			},
		};

		const set = {
			maps: ['map1'],
			sync: {
				boxRange: true,
			},
			data: {
				previousView: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			center: {
				lat: 50,
				lon: 15,
			},
			boxRange: 5000,
		};

		const output = selectorHelpers.getPreviousView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should not use set boxRange, if a param is not synced', () => {
		const map = {
			key: 'map1',
			data: {
				previousView: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 1000,
				},
			},
		};

		const set = {
			maps: ['map1'],
			data: {
				previousView: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			center: {
				lat: 50,
				lon: 15,
			},
			boxRange: 1000,
		};

		const output = selectorHelpers.getPreviousView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return map previousView, if set is not defined', () => {
		const map = {
			key: 'map1',
			data: {
				previousView: {
					center: {
						lat: 50,
						lon: 15,
					},
				},
			},
		};

		const expectedResult = {
			center: {
				lat: 50,
				lon: 15,
			},
		};

		const output = selectorHelpers.getPreviousView(map, null);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return map view, if map is not defined', () => {
		const set = {
			maps: ['mapXYZ'],
			data: {
				previousView: {
					boxRange: 5000,
				},
			},
		};

		const output = selectorHelpers.getPreviousView(null, null);
		assert.isNull(output);

		const output2 = selectorHelpers.getPreviousView(null, set);
		assert.isNull(output2);
	});

	it('should return set view, if view is not defined & param is synced', () => {
		const map = {
			key: 'map1',
			data: {
				previousView: null,
			},
		};

		const set = {
			maps: ['mapXYZ'],
			sync: {
				boxRange: true,
			},
			data: {
				previousView: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			boxRange: 5000,
		};

		const output = selectorHelpers.getPreviousView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});
});
