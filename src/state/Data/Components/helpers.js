import {isNumber as _isNumber, difference as _difference} from 'lodash';

/**
 * Determinate pages for requested range of the data. Return array which always starts with 0 as a first page.
 * @param {Number} [count] Optional size of data on BE. Usually known after request on BE.
 * @param {Number} PAGE_SIZE Size of pagesize
 * @param {Number} [optStart]  Optional start, if not set, default value 1 is used.
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @return {Array.<Number>} Page indexes [0,1,2,3]
 */
export function getRestPages(count, PAGE_SIZE, optStart = 1, optLength) {
	optStart = _isNumber(optStart) ? optStart : 1;

	if (_isNumber(count) && (count === 0 || optStart > count)) {
		return [];
	} else {
		let wanted;
		if (_isNumber(count)) {
			wanted = count - optStart + 1;
			// Request specific number of results
			if (_isNumber(optLength)) {
				if (optStart + optLength - 1 > count) {
					wanted = count - optStart + 1;
				} else {
					wanted = optLength;
				}
			}
		} else {
			// Request specific number of results
			if (_isNumber(optLength)) {
				wanted = optLength;
			} else {
				wanted = PAGE_SIZE;
			}
		}

		const startIndex = optStart; //1
		const endIndex = optStart + wanted; //101

		const lastPageIndex = Math.ceil((endIndex - startIndex) / PAGE_SIZE);
		const pages = [...Array(lastPageIndex)].map((_, i) => {
			return i;
		});

		return pages;
	}
}

/**
 * Get pagination object {offset, limit}. Calculate necessary limit and offset from wanted range of the data.
 * If optLength or optCount passed, then returned pagination object will not overfloat limits.
 * @param {Number} pageIndex Page index based on count, PAGE_SIZE, start and length.
 * @param {Number} [optStart]  Optional start, if not set, default value 1 is used.
 * @param {Number} pageSize Size of pagesize
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @param {Number} [optCount] Optional size of data on BE. Usually known after request on BE.
 * @return {Object} {offset:Number, limit: Number}  offset is begin index of data we ask.
 * 													limit is how many records we ask for.
 */
export function getPagination(
	pageIndex,
	optStart = 1,
	pageSize,
	optLength,
	optCount
) {
	optStart = _isNumber(optStart) ? optStart : 1;
	let limit = pageSize;

	if (_isNumber(optLength) && pageIndex * pageSize + pageSize > optLength) {
		limit = Math.max(0, optLength - pageIndex * pageSize);
	}

	if (
		_isNumber(optCount) &&
		optStart + pageIndex * pageSize + limit - 1 > optCount
	) {
		limit = Math.max(0, optCount - (optStart + pageIndex * pageSize - 1));
	}

	return {
		offset: Math.max(0, optStart + pageIndex * pageSize - 1),
		limit,
	};
}

/**
 * Get empty pagination
 * @return {Object} {offset:Number, limit: Number}
 */
export function getNullishPagination() {
	return getPagination(0, 1, 0, 0);
}

/**
 * Find loaded or loading pages
 * @param {Object} dataIndex Index with loaded or loading data
 * @param {Number} [optStart] Optional start, if not set, default value 1 is used.
 * @param {Number} pageSize Size of pagesize
 * @param {Array.<Number>} pages Which pages asking for
 * @param {Number} [optCount] Optional size of data on BE. Usually known after request on BE.
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @return {Array} Array of page indexex that are loaded of loading
 */
export function getLoadedPages(
	dataIndex = {},
	optStart = 1,
	pageSize,
	pages = [],
	optCount,
	optLength
) {
	optStart = _isNumber(optStart) ? optStart : 1;
	const loadedPages = [];
	pages.forEach(pageIndex => {
		let itemsOnPage = 0;

		if (_isNumber(optCount)) {
			if (_isNumber(optLength) && pageSize * (pageIndex + 1) > optLength) {
				itemsOnPage = optLength - pageSize * pageIndex;

				if (optStart + itemsOnPage > optCount) {
					itemsOnPage =
						optCount - (optStart + pageSize * (pageIndex + 1) - pageSize) + 1;
				}
			} else if (optStart + pageSize * (pageIndex + 1) > optCount) {
				itemsOnPage =
					optCount - (optStart + pageSize * (pageIndex + 1) - pageSize) + 1;
			} else {
				itemsOnPage = pageSize;
			}
		} else {
			if (_isNumber(optLength) && pageSize * (pageIndex + 1) > optLength) {
				itemsOnPage = optLength - pageSize * pageIndex;
			} else {
				itemsOnPage = pageSize;
			}
		}

		const requestedDataIndexes = [...Array(itemsOnPage)].map((_, i) => {
			return optStart + pageSize * pageIndex + i;
		});
		const hasPage = requestedDataIndexes.every(index =>
			dataIndex.hasOwnProperty(index)
		);
		if (hasPage) {
			loadedPages.push(pageIndex);
		}
	});
	return loadedPages;
}

/**
 * Determinate requested pages and which pages are alredy loaded or loading. Return difference between requested an loaded pages.
 * @param {Object} [optDataIndex]
 * @param {Number} pageSize Size of pagesize
 * @param {Number} [optStart] Optional start.
 * @param {Number} [optLength] Optional length of requested data.
 */
export function getMissingPages(optDataIndex, pageSize, optStart, optLength) {
	const count = _isNumber(optDataIndex?.count) ? optDataIndex?.count : null;
	const restPages = getRestPages(count, pageSize, optStart, optLength);

	const loadedPages = getLoadedPages(
		optDataIndex?.index,
		optStart,
		pageSize,
		restPages,
		count,
		optLength
	);
	const missingPages = _difference(restPages, loadedPages);

	return missingPages;
}
