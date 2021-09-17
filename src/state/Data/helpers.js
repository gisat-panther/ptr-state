import {isArray as _isArray, reduce as _reduce} from 'lodash';

import {configDefaults} from '@gisatcz/ptr-core';
import {utils as tileGridUtils} from '@gisatcz/ptr-tile-grid';
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
						return [...acc, tileGridUtils.tileAsString(tileKey)];
					} else {
						return acc;
					}
				},
				[]
			);
			const missingTiles = filter.tiles.filter(
				tile => !loadedTilesInIndex.includes(tileGridUtils.tileAsString(tile))
			);
			return missingTiles;
		} else {
			// no data for requested level
			// all tiles are missing
			return filter.tiles.map(tile => tileGridUtils.tileAsStringArray(tile));
		}
	} else {
		if (_isArray(filter?.tiles)) {
			// all tiles are missing
			return filter.tiles.map(tile => tileGridUtils.tileAsStringArray(tile));
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
 * @param {Object} loadedHigher Set of tiles from higher levels. {[tileKey]: {level:[level], tiles: [...[tileKey]]}}
 * @param {Object} loadedLower Set of tiles from lower levels. {[tileKey]: {level:[level], tiles: [...[tileKey]]}}
 * @param {string} preferedLevelsDirection One of [LOWER, HIGHER]. If fit tile is found on same level distance from requested level from lower and higher loaded tiles, which one is prefered.
 * @returns {Object}
 */
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
