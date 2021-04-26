import ActionTypes from '../../../constants/ActionTypes';
import {isEmpty as _isEmpty, forIn as _forIn, reduce as _reduce} from 'lodash';
import {tileAsString} from '../helpers';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
/**
 * It ensure adding index and adding received data from BE.
 * Add data to state only when spatialData received, in case of empty spatialData it adds only index.
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {string?} changedOn
 */
const receiveIndexed = (spatialData, filter, order, changedOn) => {
	return dispatch => {
		if (spatialData && !_isEmpty(spatialData)) {
			return dispatch(addDataAndIndex(spatialData, filter, order, changedOn));
		}
	};
};

/**
 * Add data and index at the same time
 * Add data, even if data are empty, for replacing loading indicator.
 * @param spatialDataAndIndexByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @param filter {Object}
 * @param order {Array}
 * @param changedOn {string}
 */
function addDataAndIndex(
	spatialDataAndIndexByDataSourceKey,
	filter,
	order,
	changedOn
) {
	return dispatch => {
		const indexByLevelByTileByDataSourceKey = getIndexData(
			spatialDataAndIndexByDataSourceKey
		);

		// spatialData should be only from one level
		const level = Object.keys(indexByLevelByTileByDataSourceKey)[0];

		let spatialDataByDataSourceKey = {};
		_forIn(
			spatialDataAndIndexByDataSourceKey,
			(value, spatialDataSourceKey) => {
				spatialDataByDataSourceKey[spatialDataSourceKey] = value.data;
			}
		);

		dispatch(
			actionAddDataAndIndex(
				spatialDataByDataSourceKey,
				level,
				filter,
				order,
				[indexByLevelByTileByDataSourceKey],
				changedOn
			)
		);
	};
}

/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */
function addLoadingIndex(filter, order, level, tiles) {
	const changedOn = null;

	//create index with tiles value "true" that indicates loading state
	const loadingTiles = _reduce(
		tiles,
		(acc, tile) => {
			const tileId = tileAsString(tile);
			acc[tileId] = true;
			return acc;
		},
		{}
	);
	const index = {
		[level]: loadingTiles,
	};
	return actionAddIndex(filter, order, [index], changedOn);
}

// ============ helpers ============

/**
 * Get data for indexing
 * @param spatialDataByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @return {Object}
 */
function getIndexData(spatialDataByDataSourceKey) {
	const indexByLevelByTileByDataSourceKey = {};
	for (const [dsKey, datasource] of Object.entries(
		spatialDataByDataSourceKey
	)) {
		for (const [level, tiles] of Object.entries(datasource.spatialIndex)) {
			if (!indexByLevelByTileByDataSourceKey[level]) {
				indexByLevelByTileByDataSourceKey[level] = {};
			}
			for (const [tile, tileData] of Object.entries(tiles)) {
				//Add to existing index
				if (indexByLevelByTileByDataSourceKey?.[level]?.[tileAsString(tile)]) {
					indexByLevelByTileByDataSourceKey[level][tileAsString(tile)] = {
						...indexByLevelByTileByDataSourceKey[level][tileAsString(tile)],
						[dsKey]: tileData,
					};
				} else {
					//Create new tile and insert dsKey index data
					indexByLevelByTileByDataSourceKey[level][tileAsString(tile)] = {
						[dsKey]: tileData,
					};
				}
			}
		}
	}

	return indexByLevelByTileByDataSourceKey;
}

// ============ actions ============
function actionRemoveIndex(filter, order) {
	return {
		type: actionTypes.INDEX.REMOVE,
		filter,
		order,
	};
}

function actionAddDataAndIndex(
	dataByDataSourceKey,
	level,
	filter,
	order,
	indexData,
	changedOn
) {
	return {
		type: actionTypes.ADD_WITH_INDEX,
		dataByDataSourceKey,
		level,
		filter,
		order,
		indexData,
		changedOn,
	};
}

function actionAddIndex(filter, order, index, changedOn) {
	return {
		type: actionTypes.INDEX.ADD,
		filter,
		order,
		indexData: index,
		changedOn,
	};
}

// ============ export ===========

export default {
	addLoadingIndex,
	getIndexData,
	removeIndex: actionRemoveIndex,
	receiveIndexed,
};
