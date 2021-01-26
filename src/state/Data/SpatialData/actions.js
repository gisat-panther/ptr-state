import ActionTypes from '../../../constants/ActionTypes';
import _ from "lodash";
import common from '../../_common/actions';
import {tileAsString} from '../helpers';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
/**
 * It ensure adding index and adding recieved data from BE.
 * Add data to state only when spatialData recieved, in case of empty spatialData it adds only index.
 * @param {Object} spatialData Object recieved from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. 
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {string?} changedOn 
 */
const receiveIndexed = (spatialData, filter, order, changedOn) => {
    return dispatch => {
		// NEW WAY
		if (spatialData) {
			return dispatch(addDataAndIndex(spatialData, filter, order, changedOn));
		} else {
			// add to index
			return dispatch(createAndAddIndex(filter, order, spatialData, changedOn));
		}
    }
}

/**
 * Add data and index at the same time
 *
 * @param spatialDataByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @param spatialFilter {Object}
 * @param order {Array}
 * @param changedOn {string}
 */
function addDataAndIndex(spatialDataByDataSourceKey, spatialFilter, order, changedOn) {
	return (dispatch) => {
		const indexByLevelByTileByDataSourceKey = getIndexData(spatialDataByDataSourceKey);

		for(const dataSourceKey of Object.keys(spatialDataByDataSourceKey)) {
			if(!_.isEmpty(spatialDataByDataSourceKey[dataSourceKey].data)) {

				//spatialData should be only from one level
				const levels = Object.keys(spatialDataByDataSourceKey[dataSourceKey].spatialIndex);
				for (const level of levels) {
                    // It dispatch addDataWithIndex for each datasource and level in response with same indexByLevelByTileByDataSourceKey.
                    // Multiple datasources in one response is edge case at the moment.
					dispatch(addDataAndIndexAction(dataSourceKey, spatialDataByDataSourceKey[dataSourceKey].data, level, spatialFilter, order, [indexByLevelByTileByDataSourceKey], changedOn));
				}
			}
		}
	}
}

/**
 * Create and add spatial index based on spatialDataSourceKey, level and tiles.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Object} spatialData Object recieved from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. 
 * @param {string?} changedOn 
 */
function createAndAddIndex(filter, order, spatialData, changedOn) {
	const indexByLevelByTileByDataSourceKey = getIndexData(spatialData);
    return addIndexAction(filter, order, [indexByLevelByTileByDataSourceKey], changedOn);
}

/**
 * Dispatch addDataAction for each given spatialDataKey and its level.
 * @param {Object} spatialData Object recieved from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.  
 */
function addData(spatialData) {
    return (dispatch, getState) => {
        for(const key of Object.keys(spatialData)) {
            if(!_.isEmpty(spatialData[key].data)) {
                //spatialData should be only from one level
                const levels = Object.keys(spatialData[key].spatialIndex);
                for (const level of levels) {
                    dispatch(addDataAction(key, spatialData[key].data, level));
                }
            }
        }
    }
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
    const loadingTiles = _.reduce(tiles, (acc, tile) => {
        const tileId = tileAsString(tile);
        acc[tileId] = true; 
        return acc
    }, {})
    const index = {
        [level]: loadingTiles
    };
    return addIndexAction(filter, order, [index], changedOn);
}

// ============ helpers ============

/**
 * Get data for indexing
 * @param spatialDataByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @return {Object}
 */
function getIndexData(spatialDataByDataSourceKey) {
	const indexByLevelByTileByDataSourceKey = {};
	for (const [dsKey, datasource] of Object.entries(spatialDataByDataSourceKey)) {
		for (const [level, tiles] of Object.entries(datasource.spatialIndex)) {
			if(!indexByLevelByTileByDataSourceKey[level]) {
				indexByLevelByTileByDataSourceKey[level] = {};
			}
			for (const [tile, tileData] of Object.entries(tiles)) {
				if(indexByLevelByTileByDataSourceKey?.[level]?.[tile]) {
					indexByLevelByTileByDataSourceKey[level][tile] = {
						...indexByLevelByTileByDataSourceKey[level][tile],
						[dsKey]: tileData,
					}
				} else {
					indexByLevelByTileByDataSourceKey[level][tile] = {
						[dsKey]: tileData
					}
				}
			}
		}
	}

	return indexByLevelByTileByDataSourceKey;
}


// ============ actions ============
function addDataAction(key, data, level) {
    return {
        type: actionTypes.ADD,
        key,
        data,
        level,
    }
}

function addDataAndIndexAction(dataSourceKey, data, level, spatialFilter, order, indexData, changedOn) {
	return {
		type: actionTypes.ADD_WITH_INDEX,
		dataSourceKey, data, level, spatialFilter, order, indexData, changedOn
	}
}

function addIndexAction(filter, order, index, changedOn) {
	return {
		type: actionTypes.INDEX.ADD,
		spatialFilter: filter,
		order,
		indexData: index,
		changedOn
	}
}

// ============ export ===========

export default {
    receiveIndexed,
    addLoadingIndex,
}
