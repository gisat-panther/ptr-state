import {mapConstants} from '@gisatcz/ptr-core';
import selectorHelpers from '../../../../src/state/Maps/selectorHelpers';
import {assert} from 'chai';

describe('getView', function () {
	const defaultView = mapConstants.defaultMapView;

	it('should merge map view with set view', () => {
		const map = {
			key: 'map1',
			data: {
				view: {
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
				view: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			...defaultView,
			...{
				center: {
					lat: 50,
					lon: 15,
				},
				boxRange: 5000,
			},
		};

		const output = selectorHelpers.getView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should use set boxRange, if the param is synced', () => {
		const map = {
			key: 'map1',
			data: {
				view: {
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
				view: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			...defaultView,
			...{
				center: {
					lat: 50,
					lon: 15,
				},
				boxRange: 5000,
			},
		};

		const output = selectorHelpers.getView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should not  use set boxRange, if a param is not synced', () => {
		const map = {
			key: 'map1',
			data: {
				view: {
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
				view: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			...defaultView,
			...{
				center: {
					lat: 50,
					lon: 15,
				},
				boxRange: 1000,
			},
		};

		const output = selectorHelpers.getView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return map view, if set is not defined', () => {
		const map = {
			key: 'map1',
			data: {
				view: {
					center: {
						lat: 50,
						lon: 15,
					},
				},
			},
		};

		const expectedResult = {
			...defaultView,
			...{
				center: {
					lat: 50,
					lon: 15,
				},
			},
		};

		const output = selectorHelpers.getView(map, null);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return map view, if map is not defined', () => {
		const set = {
			maps: ['mapXYZ'],
			data: {
				view: {
					boxRange: 5000,
				},
			},
		};

		const output = selectorHelpers.getView(null, null);
		assert.isNull(output);

		const output2 = selectorHelpers.getView(null, set);
		assert.isNull(output2);
	});

	it('should return set view, if view is not defined & param is synced', () => {
		const map = {
			key: 'map1',
			data: {
				view: null,
			},
		};

		const set = {
			maps: ['mapXYZ'],
			sync: {
				boxRange: true,
			},
			data: {
				view: {
					boxRange: 5000,
				},
			},
		};

		const expectedResult = {
			...defaultView,
			...{
				boxRange: 5000,
			},
		};

		const output = selectorHelpers.getView(map, set);
		assert.deepStrictEqual(output, expectedResult);
	});
});
