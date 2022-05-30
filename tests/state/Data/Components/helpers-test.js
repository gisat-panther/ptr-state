import {assert} from 'chai';
import {
	getRestPages,
	getPagination,
	getNullishPagination,
	getLoadedPages,
	getMissingPages,
} from '../../../../src/state/Data/Components/helpers';

describe('state/Data/Components/helpers', function () {
	describe('getRestPages', function () {
		// count, PAGE_SIZE, optStart = 0, optLength
		it('Request by pageSize 100', function () {
			assert.deepStrictEqual(getRestPages(null, 100, null, null), [0]);
		});

		it('Request by pageSize 1000', function () {
			assert.deepStrictEqual(getRestPages(null, 1000, null, null), [0]);
		});

		it('Request by pageSize and count lower than pageSize', function () {
			assert.deepStrictEqual(getRestPages(10, 100, null, null), [0]);
		});

		it('Request by pageSize and count same like pageSize', function () {
			assert.deepStrictEqual(getRestPages(100, 100, null, null), [0]);
		});

		it('Request by pageSize and count higher than pageSize', function () {
			assert.deepStrictEqual(getRestPages(300, 100, null, null), [0, 1, 2]);
		});

		it('Request by pageSize and count higher than pageSize 1', function () {
			assert.deepStrictEqual(getRestPages(301, 100, null, null), [0, 1, 2, 3]);
		});

		it('Request by pageSize and start 1', function () {
			assert.deepStrictEqual(getRestPages(null, 100, 1, null), [0]);
		});

		it('Request by pageSize and start 99', function () {
			assert.deepStrictEqual(getRestPages(null, 100, 99, null), [0]);
		});

		it('Request by pageSize and start 100', function () {
			assert.deepStrictEqual(getRestPages(null, 100, 100, null), [0]);
		});

		it('Request by pageSize and start 1000', function () {
			assert.deepStrictEqual(getRestPages(null, 100, 1000, null), [0]);
		});

		it('Request by pageSize and length 0', function () {
			assert.deepStrictEqual(getRestPages(null, 100, null, 0), []);
		});

		it('Request by pageSize and length 10', function () {
			assert.deepStrictEqual(getRestPages(null, 100, null, 10), [0]);
		});

		it('Request by pageSize and length 99', function () {
			assert.deepStrictEqual(getRestPages(null, 100, null, 99), [0]);
		});

		it('Request by pageSize and length 100', function () {
			assert.deepStrictEqual(getRestPages(null, 100, null, 100), [0]);
		});

		it('Request by pageSize and length 101', function () {
			assert.deepStrictEqual(getRestPages(null, 100, null, 101), [0, 1]);
		});

		it('Request by pageSize and length 1000', function () {
			assert.deepStrictEqual(
				getRestPages(null, 100, null, 1000),
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			);
		});

		// Combibe parameters
		// ignore length
		it('Request by combination of parameters with similar count and start XX', function () {
			assert.deepStrictEqual(getRestPages(1, 100, 1, 1000), [0]);
		});

		it('Request by combination of parameters with similar count and start', function () {
			assert.deepStrictEqual(getRestPages(1, 100, 1, 1), [0]);
		});

		it('Request by combination of parameters 1', function () {
			assert.deepStrictEqual(getRestPages(2, 100, 1, 1000), [0]);
		});

		it('Request by combination of parameters 2', function () {
			assert.deepStrictEqual(getRestPages(100, 100, 1, 1000), [0]);
		});

		it('Request by combination of parameters, ask for two pages', function () {
			assert.deepStrictEqual(getRestPages(101, 100, 1, 1000), [0, 1]);
		});

		it('Request by combination of parameters, ask for ten pages', function () {
			assert.deepStrictEqual(
				getRestPages(1000, 100, 1, 1000),
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			);
		});

		it('Request by combination of parameters, ask for nine pages', function () {
			assert.deepStrictEqual(
				getRestPages(1000, 100, 101, 1000),
				[0, 1, 2, 3, 4, 5, 6, 7, 8]
			);
		});

		// With unset count
		it('Request by combination of parameters, ask for length 1000', function () {
			assert.deepStrictEqual(
				getRestPages(null, 100, null, 1000),
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			);
		});
		it('Request by combination of parameters, ask for length 1001', function () {
			assert.deepStrictEqual(
				getRestPages(null, 100, null, 1001),
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			);
		});

		// With count higher than length
		it('Request by combination of parameters, ask for length 1', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, null, 1), [0]);
		});

		it('Request by combination of parameters, ask for length 100', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, null, 100), [0]);
		});

		it('Request by combination of parameters, ask for length 101', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, null, 101), [0, 1]);
		});

		it('Request by combination of parameters, ask for length 101 and start 1', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, 1, 101), [0, 1]);
		});

		it('Request by combination of parameters, ask for length 101 and start 2', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, 2, 101), [0, 1]);
		});

		it('Request by combination of parameters, ask for length 300 and start 700', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, 700, 300), [0, 1, 2]);
		});

		it('Request by combination of parameters, ask for length 300 and start 800. Cut page to prevent overfloat count', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, 800, 300), [0, 1, 2]);
		});

		it('Request by combination of parameters, ask for length 300 and start 801. Cut page to prevent overfloat count', function () {
			assert.deepStrictEqual(getRestPages(1000, 100, 801, 300), [0, 1]);
		});

		it('Request by combination of parameters, ask for length 3 and start 8. Cut page to prevent overfloat count', function () {
			assert.deepStrictEqual(getRestPages(10, 1, 8, 3), [0, 1, 2]);
		});

		it('Request by combination of parameters, ask for length 4 and start 8. Cut page to prevent overfloat count', function () {
			assert.deepStrictEqual(getRestPages(10, 1, 8, 4), [0, 1, 2]);
		});

		it('Request by combination of parameters, ask for length 4 and start 10. Cut page to prevent overfloat count', function () {
			assert.deepStrictEqual(getRestPages(10, 1, 10, 4), [0]);
		});
	});

	describe('getRestPages', function () {
		it('Get pagination with pageIndex 0 and pageSize 100', function () {
			assert.deepStrictEqual(getPagination(0, null, 100, null, null), {
				offset: 0,
				limit: 100,
			});
		});

		it('Get pagination with pageIndex 0 and pageSize 1000', function () {
			assert.deepStrictEqual(getPagination(0, null, 1000, null, null), {
				offset: 0,
				limit: 1000,
			});
		});

		it('Get pagination with pageIndex 1 and pageSize 1000', function () {
			assert.deepStrictEqual(getPagination(1, null, 1000, null, null), {
				offset: 1000,
				limit: 1000,
			});
		});

		it('Get pagination with pageIndex 3 and pageSize 333', function () {
			assert.deepStrictEqual(getPagination(3, null, 333, null, null), {
				offset: 999,
				limit: 333,
			});
		});

		//test start
		it('Get pagination with pageIndex 0 and pageSize 10 and start 3', function () {
			assert.deepStrictEqual(getPagination(0, 3, 10, null, null), {
				offset: 2,
				limit: 10,
			});
		});
		it('Get pagination with pageIndex 2 and pageSize 10 and start 3', function () {
			assert.deepStrictEqual(getPagination(2, 3, 10, null, null), {
				offset: 22,
				limit: 10,
			});
		});

		//test length
		it('Get pagination with pageIndex 0 and pageSize 10 and length 3', function () {
			assert.deepStrictEqual(getPagination(0, null, 10, 3, null), {
				offset: 0,
				limit: 3,
			});
		});
		it('Get pagination with pageIndex 0 and pageSize 10 and length 100', function () {
			assert.deepStrictEqual(getPagination(0, null, 10, 100, null), {
				offset: 0,
				limit: 10,
			});
		});

		//Asking for second page, so we should already have length 3 filled. So limit should be 0.
		it('Get pagination with pageIndex 1 and pageSize 10 and length 3', function () {
			assert.deepStrictEqual(getPagination(1, null, 10, 3, null), {
				offset: 10,
				limit: 0,
			});
		});

		it('Get pagination with pageIndex 4 and pageSize 10 and length 45', function () {
			assert.deepStrictEqual(getPagination(4, null, 10, 45, null), {
				offset: 40,
				limit: 5,
			});
		});

		it('Get pagination with pageIndex 4 and pageSize 10 and length 40', function () {
			assert.deepStrictEqual(getPagination(4, null, 10, 40, null), {
				offset: 40,
				limit: 0,
			});
		});

		it('Get pagination with pageIndex 4 and pageSize 10 and length 41', function () {
			assert.deepStrictEqual(getPagination(4, null, 10, 41, null), {
				offset: 40,
				limit: 1,
			});
		});

		// test count
		it('Get pagination with pageIndex 0 and pageSize 10 and count 10', function () {
			assert.deepStrictEqual(getPagination(0, null, 10, null, 10), {
				offset: 0,
				limit: 10,
			});
		});

		it('Get pagination with pageIndex 0 and pageSize 10 and count 9', function () {
			assert.deepStrictEqual(getPagination(0, null, 10, null, 9), {
				offset: 0,
				limit: 9,
			});
		});

		it('Get pagination with pageIndex 1 and pageSize 10 and count 11', function () {
			assert.deepStrictEqual(getPagination(1, null, 10, null, 11), {
				offset: 10,
				limit: 1,
			});
		});

		it('Get pagination with pageIndex 1 and pageSize 10 and count 20', function () {
			assert.deepStrictEqual(getPagination(1, null, 10, null, 20), {
				offset: 10,
				limit: 10,
			});
		});

		it('Get pagination with pageIndex 1 and pageSize 10 and count 21', function () {
			assert.deepStrictEqual(getPagination(1, null, 10, null, 21), {
				offset: 10,
				limit: 10,
			});
		});

		it('Get pagination with pageIndex 2 and pageSize 10 and count 21', function () {
			assert.deepStrictEqual(getPagination(2, null, 10, null, 21), {
				offset: 20,
				limit: 1,
			});
		});

		// test all parameters together
		it('Get pagination with pageIndex 0 start 1 pageSize 10 length 100 and count 20', function () {
			assert.deepStrictEqual(getPagination(0, 1, 10, 100, 20), {
				offset: 0,
				limit: 10,
			});
		});

		it('Get pagination with pageIndex 1 start 1 pageSize 10 length 100 and count 20', function () {
			assert.deepStrictEqual(getPagination(1, 1, 10, 100, 20), {
				offset: 10,
				limit: 10,
			});
		});

		it('Get pagination with pageIndex 2 start 1 pageSize 10 length 100 and count 20', function () {
			assert.deepStrictEqual(getPagination(2, 1, 10, 100, 20), {
				offset: 20,
				limit: 0,
			});
		});

		it('Get pagination with pageIndex 3 start 1 pageSize 10 length 100 and count 20', function () {
			assert.deepStrictEqual(getPagination(3, 1, 10, 100, 20), {
				offset: 30,
				limit: 0,
			});
		});

		it('Get pagination with pageIndex 0 start 15 pageSize 10 length 100 and count 20', function () {
			assert.deepStrictEqual(getPagination(0, 15, 10, 100, 20), {
				offset: 14,
				limit: 6,
			});
		});

		it('Get pagination with pageIndex 1 start 15 pageSize 10 length 100 and count 20', function () {
			assert.deepStrictEqual(getPagination(1, 15, 10, 100, 20), {
				offset: 24,
				limit: 0,
			});
		});

		it('Get pagination with pageIndex 0 start 15 pageSize 100 length 10 and count 20', function () {
			assert.deepStrictEqual(getPagination(0, 15, 100, 10, 200), {
				offset: 14,
				limit: 10,
			});
		});

		it('Get pagination with pageIndex 0 start 15 pageSize 100 length 100 and count 50', function () {
			assert.deepStrictEqual(getPagination(0, 15, 100, 100, 50), {
				offset: 14,
				limit: 36,
			});
		});

		it('Get pagination with pageIndex 3 start 15 pageSize 10 length 100 and count 50', function () {
			assert.deepStrictEqual(getPagination(3, 15, 10, 100, 50), {
				offset: 44,
				limit: 6,
			});
		});

		it('Get pagination with pageIndex 4 start 15 pageSize 10 length 100 and count 50', function () {
			assert.deepStrictEqual(getPagination(4, 15, 10, 100, 50), {
				offset: 54,
				limit: 0,
			});
		});
	});

	describe('getNullishPagination', function () {
		it('getNullishPagination', function () {
			assert.deepStrictEqual(getNullishPagination(), {offset: 0, limit: 0});
		});
	});

	describe('getLoadedPages', function () {
		it('Get loadedPages with dataIndex, start 1, pageSize 5, pages [0,1], count 20, lenght 10', function () {
			const moctDataIndex = {
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				10: 10,
			};
			const askedPages = [0, 1];
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 1, askedPages, 20, 10),
				[0, 1]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 5, pages [0], count 20, lenght 10', function () {
			const moctDataIndex = {
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				10: 10,
			};
			const askedPages = [0];
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 1, askedPages, 20, 10),
				[0]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 5, pages [1], count 20, lenght 10', function () {
			const askedPages = [1];
			const moctDataIndex = {
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				10: 10,
			};

			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 1, askedPages, 20, 10),
				[1]
			);
		});

		it('Get loadedPages with dataIndex, start 90, pageSize 1000, pages [0], count 96, lenght 10', function () {
			const askedPages = [0];
			const moctDataIndex = {
				88: true,
				89: true,
				90: 90,
				91: 91,
				92: 92,
				93: 93,
				94: 94,
				95: 95,
				96: 96,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 90, 1000, askedPages, 96, 10),
				[0]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 1000, pages [0], count 96, lenght 1', function () {
			const askedPages = [0];
			const moctDataIndex = {1: true, 2: true, 3: true};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 1000, askedPages, 96, 1),
				[0]
			);
		});

		it('Get loadedPages with dataIndex, start 100, pageSize 1000, pages [0], count 105, lenght 10', function () {
			const askedPages = [0];
			const moctDataIndex = {100: true, 101: true, 102: true, 103: true};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 100, 1000, askedPages, 104, 20),
				[]
			);
		});
		it('Get loadedPages with dataIndex, start 100, pageSize 1000, pages [0], count 96, lenght 10', function () {
			const askedPages = [0];
			const moctDataIndex = {
				100: true,
				101: true,
				102: true,
				103: true,
				104: true,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 100, 1000, askedPages, 104, 10),
				[0]
			);
		});

		it('Get loadedPages with dataIndex, start 100, pageSize 1000, pages [0], count 96, lenght 0', function () {
			const askedPages = [0];
			const moctDataIndex = {
				100: true,
				101: true,
				102: true,
				103: true,
				104: true,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 100, 1000, askedPages, 104),
				[0]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 1000, count 3728, lenght 1000', function () {
			const askedPages = [0];
			const moctDataIndex = {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true,
				7: true,
				8: true,
				9: true,
				10: true,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 1000, askedPages, 3728, 1000),
				[]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 1000, count 1000, lenght 1000', function () {
			const askedPages = [0];
			const moctDataIndex = {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true,
				7: true,
				8: true,
				9: true,
				10: true,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 1000, askedPages, 1000, 1000),
				[]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 10, count 20, lenght 20', function () {
			const askedPages = [0];
			const moctDataIndex = {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true,
				7: true,
				8: true,
				9: true,
				10: true,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 10, askedPages, 20, 20),
				[0]
			);
		});

		it('Get loadedPages with dataIndex, start 1, pageSize 10, count 10, lenght 10', function () {
			const askedPages = [0];
			const moctDataIndex = {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true,
				7: true,
				8: true,
				9: true,
				10: true,
			};
			assert.deepStrictEqual(
				getLoadedPages(moctDataIndex, 1, 10, askedPages, 10, 10),
				[0]
			);
		});
	});

	describe('getMissingPages', function () {
		it('Get getMissingPages with mockData, start 1, pageSize 5, count 10, lenght 10', function () {
			const mockData = {
				count: 10,
			};
			assert.deepStrictEqual(getMissingPages(mockData, 5, 1, 10), [0, 1]);
		});

		it('Get getMissingPages with mockData and partialy loaded index, start 1, pageSize 5, count 10, lenght 10', function () {
			const mockData = {
				count: 10,
				index: {1: true, 2: true, 3: true, 4: true, 5: true},
			};
			assert.deepStrictEqual(getMissingPages(mockData, 5, 1, 10), [1]);
		});

		it('Get getMissingPages with mockData and partialy loaded index _1, start 1, pageSize 5, count 10, lenght 10', function () {
			const mockData = {
				const: 10,
				index: {1: true, 2: true, 3: true, 4: true},
			};
			assert.deepStrictEqual(getMissingPages(mockData, 5, 1, 10), [0, 1]);
		});

		it('Get getMissingPages with mockData and partialy loaded index _2, start 1, pageSize 5, count 10, lenght 10', function () {
			const mockData = {
				count: 10,
				index: {1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
			};
			assert.deepStrictEqual(getMissingPages(mockData, 5, 1, 10), [1]);
		});

		it('Get getMissingPages with mockData and partialy loaded index _3, start 2, pageSize 5, count 10, lenght 10', function () {
			const mockData = {
				count: 10,
				index: {2: true, 3: true, 4: true, 5: true, 6: true},
			};
			assert.deepStrictEqual(getMissingPages(mockData, 5, 2, 10), [1]);
		});

		it('Get getMissingPages with mockData and partialy loaded index _4, start 1, pageSize 1, count 10, lenght 10', function () {
			const mockData = {
				count: 10,
				index: {2: true, 5: true, 6: true},
			};
			assert.deepStrictEqual(
				getMissingPages(mockData, 1, 1, 10),
				[0, 2, 3, 6, 7, 8, 9]
			);
		});
		it('Get getMissingPages with null mockData , start 1, pageSize 5, lenght 10', function () {
			const mockData = null;
			assert.deepStrictEqual(getMissingPages(mockData, 5, 1, 10), [0, 1]);
		});

		it('Get getMissingPages with null mockData , start null, pageSize 5, lenght 10', function () {
			const mockData = null;
			assert.deepStrictEqual(getMissingPages(mockData, 5, null, 10), [0, 1]);
		});

		it('Get getMissingPages with null mockData , start null, pageSize 5, lenght null. Only one page if length undefined', function () {
			const mockData = null;
			assert.deepStrictEqual(getMissingPages(mockData, 5), [0]);
		});

		it('Get getMissingPages with mockData , start 1, pageSize 1000, lenght null. Only one page if length undefined', function () {
			const mockData = {
				count: 3728,
				index: {
					1: true,
					2: true,
					3: true,
					4: true,
					5: true,
					6: true,
					7: true,
					8: true,
					9: true,
					10: true,
				},
			};
			assert.deepStrictEqual(getMissingPages(mockData, 1000, 1, 1000), [0]);
		});

		it('Get none missingPages if count in index is 0.', function () {
			const mockData = {
				count: 0,
				index: {},
			};
			assert.deepStrictEqual(getMissingPages(mockData, 1000, 1, 1000), []);
		});
	});
});
