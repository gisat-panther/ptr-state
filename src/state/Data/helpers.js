import {
	isArray as _isArray,
	isFinite as _isFinite,
	reduce as _reduce,
} from 'lodash';

import {configDefaults} from '@gisatcz/ptr-core';

/**
 * Determinate decimal precision of number
 * @param {Number} number
 * @returns {Number}
 */
export const precision = number => {
	if (!Number.isFinite(number)) {
		return 0;
	}
	let e = 1,
		p = 0;
	while (Math.round(number * e) / e !== number) {
		e *= 10;
		p++;
	}

	return p;
};

/**
 * Finite numbers are transformed to the decimal format and to the string.
 * Example: 2e-2 -> "0.02"
 * Example: 0.02 -> "0.02"
 * @param {Number} number
 * @returns {string?}
 */
const getNumberInDecimalString = number => {
	if (!Number.isFinite(number)) {
		return null;
	}

	const numberPrecision = precision(number);
	return number.toFixed(numberPrecision);
};

/**
 * Returns array of strings representing given tile
 * @param {Array|string} tile
 * @returns {Array}
 */
export const tileAsStringArray = tile => {
	if (
		_isArray(tile) &&
		typeof tile[0] === 'string' &&
		typeof tile[1] === 'string'
	) {
		return tile;
	} else if (_isArray(tile)) {
		const arrTile = tileAsArray(tile);
		if (arrTile) {
			// return arrTile.map(getNumberInDecimalString).join(',');
			return arrTile.map(getNumberInDecimalString);
		} else {
			return null;
		}
	} else {
		return null;
	}
};

/**
 * Returns string representing given tile
 * @param {Array|string} tile
 * @returns {string}
 */
export const tileAsString = tile => {
	if (typeof tile === 'string') {
		return tile;
	} else {
		const stringTile = tileAsStringArray(tile);
		return stringTile ? stringTile.join(',') : null;
	}
};

/**
 * Converts tile as a string to array
 * @param {Array|string} tile
 * @returns {Array} Tile defined by Numbers in array
 */
export const tileAsArray = tile => {
	if (
		typeof tile === 'string' &&
		tile.split(',').length > 1 &&
		tile.split(',').every(i => _isFinite(parseFloat(i)))
	) {
		return tile.split(',').map(parseFloat);
	} else if (
		_isArray(tile) &&
		tile.length !== 1 &&
		tile.every(i => _isFinite(parseFloat(i)))
	) {
		return tile.map(parseFloat);
	} else if (_isArray(tile) && tile.length === 1) {
		return tileAsArray(tile[0]);
	} else {
		return null;
	}
};

/**
 * Compare wanted tiles from filter with already loaded or loading tiles and give array of missing tiles in string format
 * @param {Object} index Already loaded index
 * @param {Object} filter Required filter
 * @param {Array.<string|Array.<number>>} filter.tiles
 * @param {number} filter.level
 * @returns {Array?} Array of missing tiles in stringArray format
 */
export const getMissingTiles = (index, filter) => {
	if (index && index.index && filter && _isArray(filter.tiles)) {
		//index contains level
		if (index.index?.[filter.level]) {
			const loadedTilesInIndex = _reduce(
				index.index[filter.level],
				(acc, tileData, tileKey) => {
					//tileData === true means it is loading, so we mark them as not missing
					if (tileData) {
						//re-save tile as array to prevent negative zero
						return [...acc, tileAsString(tileKey)];
					} else {
						return acc;
					}
				},
				[]
			);
			const missingTiles = filter.tiles.filter(
				tile => !loadedTilesInIndex.includes(tileAsString(tile))
			);
			return missingTiles;
		} else {
			// no data for requested level
			// all tiles are missing
			return filter.tiles.map(tile => tileAsStringArray(tile));
		}
	} else {
		if (_isArray(filter?.tiles)) {
			// all tiles are missing
			return filter.tiles.map(tile => tileAsStringArray(tile));
		} else {
			//filter is not defined
			return null;
		}
	}
};

/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} localConfig Configuration with overrides
 * @return {Number}
 */
export function getPageSize(localConfig) {
	const PAGE_SIZE =
		localConfig?.requestPageSize || configDefaults.requestPageSize;
	return PAGE_SIZE;
}

/**
 * Pick nearest tiles for requested level.
 * @param {number} level Required data for level. Search for closest tiles to this level.
 * @param {Object} loadedHigher Set of levels with tiles from higher levels then requested level.
 * @param {Object} loadedLower Set of levels with tiles from lower levels then requested level.
 * @param {string} preferedLevelsDirection One of [LOWER, HIGHER]. If fit tile is found on same level distance from requested level from lower and higher loaded tiles, which one is prefered.
 * @returns {Object}
 */
// TODO @vdubr add tests
export function filterNearestTiles(
	level,
	loadedHigher = {},
	loadedLower = {},
	preferedLevelsDirection
) {
	const uniqueTiles = {};
	const uniqueLoadedKeys = new Set([
		...Object.keys(loadedHigher),
		...Object.keys(loadedLower),
	]);

	for (const tileKey of uniqueLoadedKeys) {
		const lowerTile = loadedLower[tileKey];
		if (lowerTile) {
			lowerTile.levelDistance = Math.abs(level - lowerTile.level);
		}

		const higherTile = loadedHigher[tileKey];
		if (higherTile) {
			higherTile.levelDistance = Math.abs(level - higherTile.level);
		}
		// tile only in higher or lower
		if ((lowerTile && !higherTile) || (!lowerTile && higherTile)) {
			uniqueTiles[tileKey] = lowerTile || higherTile;
		} else {
			//if tile occure in both, then choose nearest or by preferedLevelsDirection
			if (lowerTile.levelDistance !== higherTile.levelDistance) {
				// one of tiles is on closer level to the required "level"
				const tileWithLessLevelDistance =
					lowerTile.levelDistance < higherTile.levelDistance
						? lowerTile
						: higherTile;
				uniqueTiles[tileKey] = tileWithLessLevelDistance;
			} else {
				// both tiles are on same levelDistance
				if (preferedLevelsDirection === 'LOWER') {
					uniqueTiles[tileKey] = lowerTile;
				} else {
					uniqueTiles[tileKey] = higherTile;
				}
			}
		}
	}

	//remove levelDistance property
	for (const tileKey of Object.keys(uniqueTiles)) {
		delete uniqueTiles[tileKey].levelDistance;
	}
	return uniqueTiles;
}
