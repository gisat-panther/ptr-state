import ActionTypes from '../../../constants/ActionTypes';
import {utils as tileGridUtils} from '@gisatcz/ptr-tile-grid';
import {isEmpty as _isEmpty, reduce as _reduce} from 'lodash';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

// ============ creators ===========
/**
 * It ensure adding index and adding or updating received attribute data from BE under given spatial index.
 * Add data to state only when attributeData received, in case of empty attributeData it adds only index.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialIndexData Spatial index related to the data.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {string?} changedOn
 */
const receiveIndexedWithSpatialIndex = (
	attributeData,
	spatialIndexData,
	attributeDataFilter,
	order,
	changedOn
) => {
	return dispatch => {
		if (!_isEmpty(attributeData)) {
			dispatch(
				addDataAndIndexBasedOnSpatialData(
					attributeDataFilter,
					order,
					attributeData,
					spatialIndexData,
					changedOn
				)
			);
		} else {
			// add to index
			dispatch(
				createAndAddIndexBasedOnSpatialData(
					attributeDataFilter,
					order,
					spatialIndexData,
					changedOn
				)
			);
		}
	};
};

/**
 * Ensure adding index and adding or updating received attribute data from BE.
 * @param {Object} attributeData
 * @param {Array} attributeData.index
 * @param {Object} attributeData.attributeData
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Array?} start
 * @param {Array?} total
 * @param {string?} changedOn
 * @param {Number?} limit Limitation for loading attributeData
 */
const receiveIndexed = (
	attributeData,
	attributeDataFilter,
	order,
	start,
	total,
	changedOn,
	limit
) => {
	return actionAddDataAndIndex(
		attributeDataFilter,
		order,
		total,
		start,
		attributeData.index,
		attributeData.attributeData,
		changedOn,
		limit
	);
};

/**
 * Add data and index at the same time
 *
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialIndexData Spatial index related to the data.
 * @param order {Array}
 * @param changedOn {string}
 */
function addDataAndIndexBasedOnSpatialData(
	attributeDataFilter,
	order,
	attributeData,
	spatialIndexData,
	changedOn
) {
	return dispatch => {
		for (const attributeDataSourceKey of Object.keys(attributeData)) {
			dispatch(
				actionAddDataAndIndexBasedOnSpatialData(
					attributeDataSourceKey,
					attributeData[attributeDataSourceKey],
					attributeDataFilter,
					order,
					[spatialIndexData],
					changedOn
				)
			);
		}
	};
}

/**
 * Create and add index for given attribute data based on related spatial data index.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Object} spatialIndexData Spatial index related to the data.
 * @param {*} changedOn
 */
function createAndAddIndexBasedOnSpatialData(
	attributeDataFilter,
	order,
	spatialIndexData,
	changedOn
) {
	return actionAddIndexWithSpatialIndex(
		attributeDataFilter,
		order,
		[spatialIndexData],
		changedOn
	);
}

/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */
function addLoadingSpatialIndex(attributeDataFilter, order, level, tiles) {
	const changedOn = null;

	//create index with tiles value "true" that indicates loading state
	const loadingTiles = _reduce(
		tiles,
		(acc, tile) => {
			const tileId = tileGridUtils.tileAsString(tile);
			acc[tileId] = true;
			return acc;
		},
		{}
	);
	const index = {
		[level]: loadingTiles,
	};

	return actionAddIndexWithSpatialIndex(
		attributeDataFilter,
		order,
		[index],
		changedOn
	);
}

/**
 * Create new index based on pagination with loading indicator.
 * @param {Object} pagination
 * @param {Number} pagination.limit Limitation for loading attributeData
 * @param {Number} pagination.offset
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 */
function addLoadingIndex(pagination, attributeDataFilter, order) {
	const changedOn = null;

	// Fake new data object for common action of size same like pagination.limit
	// Action "common.addIndex" needs array of data objects with key to create new index.
	// "data" is a Array of the minimal data for construct index in common actoin.
	// Use key = true as a loading identificator
	const data = new Array(pagination.limit).fill({key: true});

	// filter, order, data, start, count, changedOn
	return actionAddIndex(
		attributeDataFilter,
		order,
		data,
		pagination.offset + 1,
		null,
		changedOn
	);
}

// ============ helpers ============

/**
 * Get data for indexing for vectorTiled spatial data
 * @param {Object} spatialData
 * @param {Object} attributeData
 * @return {Object}
 */
function getTiledIndexDataBySpatialData(spatialData, attributeData) {
	const indexByLevelByTileByDataSourceKey = {};

	//Attribute data indexes are stored in related spatial index
	//for all spatial data keys in spatialData
	for (const [spatialDataSourceKey, datasource] of Object.entries(
		spatialData
	)) {
		//for all levels in spatial data source
		for (const [level, tiles] of Object.entries(datasource.spatialIndex)) {
			if (!indexByLevelByTileByDataSourceKey[level]) {
				indexByLevelByTileByDataSourceKey[level] = {};
			}
			//for all tiles in tiles
			for (const [tile, tileData] of Object.entries(tiles)) {
				// If empty attributeData, then rewrite "loading" state.
				// or
				// Prepare empty tile for new data if tile does not exists.
				if (
					!indexByLevelByTileByDataSourceKey[level][
						tileGridUtils.tileAsString(tile)
					] ||
					_isEmpty(attributeData)
				) {
					indexByLevelByTileByDataSourceKey[level][
						tileGridUtils.tileAsString(tile)
					] = {};
				}

				if (!_isEmpty(attributeData)) {
					//for all attribute data source keys in attributeData
					for (const [
						attributeDataSourceKey,
						attributeDataSource,
					] of Object.entries(attributeData)) {
						// Save only tileData that are incuded in attribute data keys

						const indexes = tileData.filter(e =>
							Object.keys(attributeDataSource).includes(e.toString())
						);

						//Add to existing index
						if (
							indexByLevelByTileByDataSourceKey?.[level]?.[
								tileGridUtils.tileAsString(tile)
							]?.[attributeDataSourceKey]
						) {
							indexByLevelByTileByDataSourceKey[level][
								tileGridUtils.tileAsString(tile)
							][attributeDataSourceKey] = [
								...indexByLevelByTileByDataSourceKey[level][
									tileGridUtils.tileAsString(tile)
								][attributeDataSourceKey],
								...indexes,
							];
						} else {
							//Create new tile and insert dsKey index data
							indexByLevelByTileByDataSourceKey[level][
								tileGridUtils.tileAsString(tile)
							][attributeDataSourceKey] = indexes;
						}
					}
				}
			}
		}
	}

	return indexByLevelByTileByDataSourceKey;
}

/**
 * Get data for indexing for vector spatial data
 * @param {Object} attributeData
 * @return {Object}
 */
function getIndexData(attributeData) {
	const indexByDataSourceKey = {};
	for (const [dsKey, data] of Object.entries(attributeData)) {
		indexByDataSourceKey[dsKey] = [...Object.keys(data)];
	}

	return indexByDataSourceKey;
}

// ============ actions ============
function actionRemoveSpatialIndex(filter, order) {
	return {
		type: actionTypes.SPATIAL_INDEX.REMOVE,
		filter,
		order,
	};
}

/**
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 */
function actionAddDataAndIndexBasedOnSpatialData(
	attributeDataSourceKey,
	data,
	attributeDataFilter,
	order,
	indexData,
	changedOn
) {
	return {
		type: actionTypes.ADD_WITH_SPATIAL_INDEX,
		attributeDataSourceKey,
		data,
		filter: attributeDataFilter,
		order,
		indexData,
		changedOn,
	};
}

/**
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total For how many features data relates.
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 * @param {Number?} limit Limitation for loading attributeData
 */
function actionAddDataAndIndex(
	attributeDataFilter,
	order,
	total,
	start,
	index,
	data,
	changedOn,
	limit
) {
	return {
		type: actionTypes.ADD_WITH_INDEX,
		filter: attributeDataFilter,
		order,
		total,
		start,
		index,
		data,
		changedOn,
		...(limit && {limit: limit}),
	};
}

function actionAddIndexWithSpatialIndex(
	attributeDataFilter,
	order,
	index,
	changedOn
) {
	return {
		type: actionTypes.SPATIAL_INDEX.ADD,
		filter: attributeDataFilter,
		order,
		indexData: index,
		changedOn,
	};
}

/**
 *
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Array} data
 * @param {Array?} start
 * @param {Number?} count
 * @param {string?} changedOn
 * @param {Number?} limit Limitation for loading attributeData
 * @returns
 */
function actionAddIndex(
	attributeDataFilter,
	order,
	data,
	start,
	count,
	changedOn,
	limit
) {
	return {
		type: actionTypes.INDEX.ADD,
		filter: attributeDataFilter,
		order,
		data: data,
		start,
		count,
		changedOn,
		...(limit && {limit: limit}),
	};
}

function actionUpdateStore(data) {
	return {
		type: actionTypes.UPDATE_STORE,
		data,
	};
}

// ============ export ===========

export default {
	addLoadingIndex,
	addLoadingSpatialIndex,
	getTiledIndexDataBySpatialData,
	getIndexData,
	receiveIndexedWithSpatialIndex,
	receiveIndexed,
	removeSpatialIndex: actionRemoveSpatialIndex,
	updateStore: actionUpdateStore, //do we use it?
};
