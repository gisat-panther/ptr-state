import {configDefaults} from '@gisatcz/ptr-core';
import attributeRelations from './AttributeRelations/actions';
import attributeDataSources from './AttributeDataSources/actions';
import attributeData from './AttributeData/actions';
import spatialRelations from './SpatialRelations/actions';
import spatialDataSources from './SpatialDataSources/actions';
import spatialData from './SpatialData/actions';
import request from '../_common/request';
import commonActions from '../_common/actions';

import Select from '../Select';
import {getMissingTiles, tileAsArray} from './helpers';
import {TILED_VECTOR_LAYER_TYPES} from './constants';

const DEFAULT_RELATIONS_PAGE = {
	offset: 0,
	limit: 100,
};

/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} state App state
 * @return {Number}
 */
const getPageSize = state => {
	const localConfig = Select.app.getCompleteLocalConfiguration(state);
	const PAGE_SIZE =
		localConfig.requestPageSize || configDefaults.requestPageSize;
	return PAGE_SIZE;
};

const getRestRelationsPages = (
	attributeRelationsCount,
	spatialRelationsCount,
	PAGE_SIZE
) => {
	// What is higer to load? attributeRelations or spatialRelations
	const maxCountValue = Math.max(
		attributeRelationsCount,
		spatialRelationsCount
	);
	if (maxCountValue === 0) {
		return 0;
	} else {
		const remainingPageCount = Math.ceil(
			(maxCountValue - PAGE_SIZE) / PAGE_SIZE
		);
		return remainingPageCount;
	}
};

/**
 * Helper function. Usually second step in requesting data.
 * Calculate if relations requests are missing based on attributeRelationsCount and spatialRelationsCount.
 * Each relations request loads one next tile from spatialFilter.
 * Rest tiles are loaded without relatiions.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} mergedSpatialFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Number} attributeRelationsCount Count of known attribute relations. Used for determinate further requests.
 * @param {Number} spatialRelationsCount Count of known spatial relations. Used for determinate further requests.
 * @param {Array} preloadedSpatialDataSources SpatialDataSources loaded by previous request.
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	loadGeometry,
	spatialFilter,
	styleKey,
	order,
	mergedSpatialFilter,
	mergedAttributeFilter,
	attributeRelationsCount,
	spatialRelationsCount,
	preloadedSpatialDataSources = []
) {
	return (dispatch, getState) => {
		const PAGE_SIZE = getPageSize(getState());

		// FIXME - add attributeFilter support
		// attributeFilter is null at the moment
		const attributeFilter = null;
		const dataSourceKeys = null;
		const featureKeys = null;
		const promises = [];

		// load remaining relations pages
		const remainingRelationsPageCount = getRestRelationsPages(
			attributeRelationsCount,
			spatialRelationsCount,
			PAGE_SIZE
		);
		let tilesPagination = 0;
		const loadRelations = true;
		for (let i = 1; i <= remainingRelationsPageCount; i++) {
			const relations = {
				offset: i * PAGE_SIZE,
				limit: PAGE_SIZE,
			};

			tilesPagination = i;
			const spatialIndex = {
				tiles: [spatialFilter.tiles[tilesPagination]],
			};
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						featureKeys,
						spatialIndex,
						spatialFilter,
						attributeFilter,
						loadGeometry,
						loadRelations,
						dataSourceKeys,
						order,
						mergedSpatialFilter,
						mergedAttributeFilter
					)
				)
			);
		}

		//
		//load rest of tiles
		//
		const remainingTilesPageCount = spatialFilter.tiles.length;

		//first tile was loaded before loadMissingRelationsAndData first request
		for (let i = tilesPagination + 1; i < remainingTilesPageCount; i++) {
			const spatialIndex = {
				tiles: [spatialFilter.tiles[i]],
			};

			const relations = {};
			const loadRestTilesRelations = false;
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						featureKeys,
						spatialIndex,
						spatialFilter,
						attributeFilter,
						loadGeometry,
						loadRestTilesRelations,
						dataSourceKeys,
						order,
						mergedSpatialFilter,
						mergedAttributeFilter
					)
				)
			);
		}

		return Promise.all(promises).then((response = []) => {
			// All relations are loaded at this moment.
			// Check if all spatialDataSources relations from response and preloadedSpatialDataSources are type of "unsupported" like raster/wms/wmts.
			// If all spatialDataSources are unsupported, then received data are empty and indexes needs to be removed.
			// If only some of spatialDataSources relations are unsupported, then loading status on index will be replaced by data.
			const spatialDataSourcesTypes = _.flattenDeep(
				response.map(r =>
					r?.data?.spatialDataSources?.map(sds => ({
						type: sds.data.type,
						key: sds.key,
					}))
				)
			);
			const spatialDataSourcesPairs = [
				...spatialDataSourcesTypes,
				...preloadedSpatialDataSources,
			];
			const allSourcesAreUnsupported = spatialDataSourcesPairs.every(
				ds => !TILED_VECTOR_LAYER_TYPES.includes(ds.type)
			);

			// Check if all of returned spatialDataSources are unsupported type.
			// Indexes for unsupported layers can be cleared.
			if (allSourcesAreUnsupported) {
				// AttributeData and spatialData index represented by mergedSpatialFilter, mergedAttributeFilter and order can be deleted
				dispatch(spatialData.removeIndex(mergedSpatialFilter, order));
				dispatch(attributeData.removeIndex(mergedAttributeFilter, order));
			}
		});
	};
}

/**
 * Ensure load missing attribute data for tiles defined in spatialFilter that are not loaded or loading in state.
 *
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} mergedSpatialFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @return {function}
 */
function loadMissingAttributeData(
	spatialFilter,
	styleKey,
	order,
	mergedSpatialFilter,
	mergedAttributeFilter
) {
	return (dispatch, getState) => {
		const PAGE_SIZE = getPageSize(getState());

		const relations = {
			// start: 0,
			// length: 1000,
			offset: 0,
			limit: PAGE_SIZE,
		};

		//
		// which attribute data to load
		//

		//get attribute data index with loaded and loading data
		const attributeDataIndex =
			Select.data.attributeData.getIndex(
				getState(),
				'spatialIndexes',
				mergedAttributeFilter,
				order
			) || [];

		//diff loaded attribute data from index with wanted spatial data
		const missingAttributeDataTiles =
			getMissingTiles(attributeDataIndex, spatialFilter) || [];
		const missingAttributeDataTilesAsArrays = missingAttributeDataTiles.map(
			tileAsArray
		);

		// Load relations and data sources in first request if they are not already loaded.
		const attributeRelations = Select.data.attributeRelations.getIndex(
			getState(),
			mergedAttributeFilter,
			order
		);
		const attributeDataSources = Select.data.attributeDataSources.getIndex(
			getState(),
			mergedAttributeFilter,
			order
		);
		let loadRelationsAndDS = !(
			!_.isEmpty(attributeRelations) && !_.isEmpty(attributeDataSources)
		);

		//load only attribute data
		const loadGeometry = false;

		//FIXME - add support for attributeFilter
		const attributeFilter = null;

		const dataSourceKeys = null;
		const featureKeys = null;

		// Modified spatial filter with only missing attribute data tiles
		const spatialFilterWithMissingTiles = {
			...spatialFilter,
			tiles: missingAttributeDataTilesAsArrays,
		};
		// Relations for given filters are missing
		if (loadRelationsAndDS) {
			const spatialIndex = null;
			const loadRelations = true;
			// Load relations
			return dispatch(
				loadIndexedPage(
					styleKey,
					relations,
					featureKeys,
					spatialIndex,
					spatialFilterWithMissingTiles,
					attributeFilter,
					loadGeometry,
					loadRelations,
					dataSourceKeys,
					order,
					mergedSpatialFilter,
					mergedAttributeFilter
				)
			).then(response => {
				if (response instanceof Error) {
					return;
					throw response;
				}

				const spatialDataSources = response?.data?.spatialDataSources || [];
				const preloadSpatialDataSources = spatialDataSources.map(sds => ({
					type: sds.data.type,
					key: sds.key,
				}));

				const attributeRelationsCount = response.total.attributeRelations;
				const spatialRelationsCount = response.total.spatialRelations;
				return dispatch(
					loadMissingRelationsAndData(
						loadGeometry,
						spatialFilterWithMissingTiles,
						styleKey,
						order,
						mergedSpatialFilter,
						mergedAttributeFilter,
						attributeRelationsCount,
						spatialRelationsCount,
						preloadSpatialDataSources
					)
				);
			});
		} else {
			const promises = [];
			const loadRelations = false;
			for (const tile of missingAttributeDataTiles) {
				const spatialIndex = {
					tiles: [tile],
				};

				promises.push(
					dispatch(
						loadIndexedPage(
							styleKey,
							relations,
							featureKeys,
							spatialIndex,
							spatialFilter,
							attributeFilter,
							loadGeometry,
							loadRelations,
							dataSourceKeys,
							order,
							mergedSpatialFilter,
							mergedAttributeFilter
						)
					)
				);
			}
			return Promise.all(promises);
		}
	};
}

/**
 * Ensure load missing spatial data for tiles defined in spatialFilter that are not loaded or loading in state.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} mergedSpatialFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @return {function}
 */
function loadMissingSpatialData(
	spatialFilter,
	styleKey,
	order,
	mergedSpatialFilter,
	mergedAttributeFilter
) {
	return (dispatch, getState) => {
		//
		//which spatial data to load
		//

		//get spatial data index with loaded and loading data
		const spatialDataIndex =
			Select.data.spatialData.getIndex(
				getState(),
				mergedSpatialFilter,
				order
			) || [];

		//diff spatial data loaded/loading and to load
		const missingSpatialDataTiles =
			getMissingTiles(spatialDataIndex, spatialFilter) || [];
		const promises = [];
		for (const tile of missingSpatialDataTiles) {
			const spatialIndex = {
				tiles: [tile],
			};

			const relations = {};
			const attributeFilter = null;
			const loadGeometry = true;
			const loadRelations = false;
			const dataSourceKeys = null;
			const featureKeys = null;
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						featureKeys,
						spatialIndex,
						spatialFilter,
						attributeFilter,
						loadGeometry,
						loadRelations,
						dataSourceKeys,
						order,
						mergedSpatialFilter,
						mergedAttributeFilter
					)
				)
			);
		}
		return Promise.all(promises);
	};
}

/**
 * Ensure load spatial data, attribute data and relations for tiles defined in spatialFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} mergedSpatialFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @return {function}
 */
function ensureDataAndRelations(
	spatialFilter,
	styleKey,
	order,
	mergedSpatialFilter,
	mergedAttributeFilter
) {
	return (dispatch, getState) => {
		const PAGE_SIZE = getPageSize(getState());

		const relations = {
			// start: 0,
			// length: 1000,
			offset: 0,
			limit: PAGE_SIZE,
		};

		// FIXME - add attributeFilter support
		// attributeFilter is null at the moment
		const attributeFilter = null;
		const loadGeometry = true;
		const loadRelations = true;
		const dataSourceKeys = null;
		const featureKeys = null;
		const spatialIndex = null;
		if (spatialFilter && !_.isEmpty(spatialFilter)) {
			return dispatch(
				loadIndexedPage(
					styleKey,
					relations,
					featureKeys,
					spatialIndex,
					spatialFilter,
					attributeFilter,
					loadGeometry,
					loadRelations,
					dataSourceKeys,
					order,
					mergedSpatialFilter,
					mergedAttributeFilter
				)
			)
				.then(response => {
					if (response instanceof Error) {
						return;
						throw response;
					}

					const attributeRelationsCount = response.total.attributeRelations;
					const spatialRelationsCount = response.total.spatialRelations;

					const restRelationsPages = getRestRelationsPages(
						attributeRelationsCount,
						spatialRelationsCount,
						PAGE_SIZE
					);

					const spatialDataSources = response?.data?.spatialDataSources || [];
					const preloadSpatialDataSources = spatialDataSources.map(sds => ({
						type: sds.data.type,
						key: sds.key,
					}));
					const allSourcesAreUnsupported = spatialDataSources.every(
						ds => !TILED_VECTOR_LAYER_TYPES.includes(ds.data?.type)
					);

					// Check if all of returned spatialDataSources are unsupported type.
					// If so, is no reason to make further requests.
					// Indexes for unsupported layers can be cleared.
					if (restRelationsPages === 0 && allSourcesAreUnsupported) {
						// AttributeData and spatialData index represented by mergedSpatialFilter, mergedAttributeFilter and order can be deleted
						dispatch(spatialData.removeIndex(mergedSpatialFilter, order));
						dispatch(attributeData.removeIndex(mergedAttributeFilter, order));
						return;
					} else {
						return dispatch(
							loadMissingRelationsAndData(
								loadGeometry,
								spatialFilter,
								styleKey,
								order,
								mergedSpatialFilter,
								mergedAttributeFilter,
								attributeRelationsCount,
								spatialRelationsCount,
								preloadSpatialDataSources
							)
						);
					}
				})
				.catch(err => {
					if (err?.message === 'Index outdated') {
						dispatch(
							refreshIndex(
								getSubstate,
								dataType,
								filter,
								order,
								actionTypes,
								categoryPath
							)
						);
					} else {
						throw new Error(`data/actions#ensure: ${err}`);
					}
				});
		} else {
			return dispatch(
				commonActions.actionGeneralError(new Error('Missing spatial filter'))
			);
		}
	};
}

/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} attributeDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */
const hasMissingAttributesData = (attributeDataIndex, spatialFilter) => {
	const missingAttributeDataTiles =
		getMissingTiles(attributeDataIndex, spatialFilter) || spatialFilter.tiles;
	return missingAttributeDataTiles &&
		missingAttributeDataTiles.length &&
		missingAttributeDataTiles.length > 0
		? true
		: false;
};

/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} spatialDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */
const hasMissingSpatialData = (spatialDataIndex, spatialFilter) => {
	const missingSpatialDataTiles =
		getMissingTiles(spatialDataIndex, spatialFilter) || spatialFilter.tiles;
	return missingSpatialDataTiles &&
		missingSpatialDataTiles.length &&
		missingSpatialDataTiles.length > 0
		? true
		: false;
};

/**
 * It find out if for given ltKey/atlKey and mergedSpatialFilter exists relations index.
 * The Existence of index means it is loading or loaded.
 * TODO - add support of areaTrees
 * @param {Object} state App state object
 * @param {string?} areaTreeLevelKey Optional area tree key
 * @param {string?} layerTemplateKey Optional layer template key
 * @param {Object} mergedSpatialFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array} order
 * @return {bool}
 */
const hasSpatialOrAreaRelations = (
	state,
	areaTreeLevelKey,
	layerTemplateKey,
	mergedSpatialFilter,
	order
) => {
	let spatialRelationsIndex = null;
	let areaRelationsIndex = null;

	if (layerTemplateKey) {
		spatialRelationsIndex = Select.data.spatialRelations.getIndex(
			state,
			mergedSpatialFilter,
			order
		);
	}

	// FIXME - add support for areaTreeLevels
	if (areaTreeLevelKey) {
		// areaRelationsIndex = Select.data.areaRelations.getIndex(getState(), mergedSpatialFilter, order);
	}

	return spatialRelationsIndex !== null || areaRelationsIndex !== null;
};

/**
 * Entry function for requesting of loading new data. In first step are identified loaded indexes based on filters.
 * Next phase is request only data that are missing.
 * @param filter {Object}
 * @return {function}
 */
function ensure(filter) {
	return (dispatch, getState) => {
		// Filter params - see Panther docs: Code/API/Data endpoint
		const {styleKey, data, mergedFilter} = filter;
		const {spatialFilter} = data;
		const {areaTreeLevelKey, layerTemplateKey} = mergedFilter;
		const mergedSpatialFilter = mergedFilter;
		const mergedAttributeFilter = {...mergedFilter, styleKey};

		// select indexes
		const order = null;

		const spatialDataIndex =
			Select.data.spatialData.getIndex(
				getState(),
				mergedSpatialFilter,
				order
			) || [];
		const attributeDataIndex =
			Select.data.attributeData.getIndex(
				getState(),
				'spatialIndexes',
				mergedAttributeFilter,
				order
			) || [];
		const missingAttributesData = hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		const missingSpatialData = hasMissingSpatialData(
			spatialDataIndex,
			spatialFilter
		);
		const filterHasSpatialOrAreaRelations = hasSpatialOrAreaRelations(
			getState(),
			areaTreeLevelKey,
			layerTemplateKey,
			mergedSpatialFilter,
			order
		);

		//
		// Skip over load request on already loaded/loading data
		//
		if (!filterHasSpatialOrAreaRelations && missingSpatialData) {
			return dispatch(
				ensureDataAndRelations(
					spatialFilter,
					styleKey,
					order,
					mergedSpatialFilter,
					mergedAttributeFilter
				)
			);
		}

		if (missingSpatialData) {
			return dispatch(
				loadMissingSpatialData(
					spatialFilter,
					styleKey,
					order,
					mergedSpatialFilter,
					mergedAttributeFilter
				)
			);
		}

		if (missingAttributesData) {
			return dispatch(
				loadMissingAttributeData(
					spatialFilter,
					styleKey,
					order,
					mergedSpatialFilter,
					mergedAttributeFilter
				)
			);
		}
	};
}

/**
 *
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Array?} featureKeys Array of feature keys that should be loaded.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {Object?} attributeFilter Filter for requested attribute data.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadRelations Whether response should contain relations
 * @param {Array?} dataSourceKeys Another optional filter parameter. Possible to use insted of layerTemplateKey or areaTreeKey
 * @param {Array?} order
 * @param {Object} mergedSpatialFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 */
function loadIndexedPage(
	styleKey,
	relations,
	featureKeys,
	spatialIndex,
	spatialFilter,
	attributeFilter,
	loadGeometry,
	loadRelations,
	dataSourceKeys,
	order,
	mergedSpatialFilter,
	mergedAttributeFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/data/filtered';

		const {
			areaTreeLevelKey,
			layerTemplateKey,
			...modifiers
		} = mergedSpatialFilter;
		const usedRelations = relations ? {...relations} : DEFAULT_RELATIONS_PAGE;

		//register indexes

		////
		// Spatial
		////
		if (loadGeometry) {
			const loadingTilesGeometry = spatialIndex?.tiles || spatialFilter.tiles;
			dispatch(
				spatialData.addLoadingIndex(
					mergedSpatialFilter,
					order,
					spatialFilter.level,
					loadingTilesGeometry
				)
			);
		}

		////
		// Attribute
		////
		const loadingTilesAttributes = spatialIndex?.tiles || spatialFilter.tiles;
		dispatch(
			attributeData.addLoadingIndex(
				mergedAttributeFilter,
				order,
				spatialFilter.level,
				loadingTilesAttributes
			)
		);

		// Create payload

		const payload = {
			modifiers,

			// which layer you want
			...(layerTemplateKey && {layerTemplateKey}),
			...(areaTreeLevelKey && {areaTreeLevelKey}),

			// get attributes from style
			...(styleKey && {styleKey}),

			// pagination for relations (& data sources)
			relations: usedRelations,

			data: {
				// list of features you want
				...(featureKeys && {featureKeys}),

				// which tiles you want (pseudo-pagination)
				// spatialIndex: {
				//     tiles: [[lon, lat], ...],
				// },
				...(spatialIndex && {spatialIndex}),

				// extent
				spatialFilter,

				// filter features by attribute value
				// attributeFilter: {
				//     'attribute-uuid': "blue",
				//     'attribute-uuid': {
				//         in: [12, 13]
				//     },
				//     ...
				// },
				...(attributeFilter && {attributeFilter}),

				//request for geometry
				geometry: !!loadGeometry,

				//request for relations
				relations: !!loadRelations,

				// use data source keys as filter or add them to filter
				...(dataSourceKeys && {dataSourceKeys}),
			},
		};

		return request(localConfig, apiPath, 'POST', null, payload)
			.then(result => {
				if (result.errors) {
					throw new Error(result.errors[dataType] || 'no data');
				} else {
					if (result.data) {
						////
						// Attributes
						////
						if (
							!!loadRelations &&
							result.data.attributeRelations &&
							!_.isEmpty(result.data.attributeRelations)
						) {
							const changes = null;
							dispatch(
								attributeRelations.receiveIndexed(
									result.data.attributeRelations,
									mergedAttributeFilter,
									order,
									relations.offset,
									result.total.attributeRelations,
									changes
								)
							);
						}

						if (
							!!loadRelations &&
							result.data.attributeDataSources &&
							!_.isEmpty(result.data.attributeDataSources)
						) {
							const changes = null;
							dispatch(
								attributeDataSources.receiveIndexed(
									result.data.attributeDataSources,
									mergedAttributeFilter,
									order,
									relations.offset,
									result.total.attributeRelations,
									changes
								)
							);
						}

						if (result.data.spatialData && result.data.attributeData) {
							const changes = null;
							dispatch(
								attributeData.receiveIndexed(
									result.data.attributeData,
									result.data.spatialData,
									mergedAttributeFilter,
									order,
									changes
								)
							);
						}

						////
						// Spatial data
						////
						if (
							!!loadRelations &&
							result.data.spatialRelations &&
							!_.isEmpty(result.data.spatialRelations)
						) {
							const changes = null;
							dispatch(
								spatialRelations.receiveIndexed(
									result.data.spatialRelations,
									mergedSpatialFilter,
									order,
									relations.offset,
									result.total.spatialRelations,
									changes
								)
							);
						}

						if (
							!!loadRelations &&
							result.data.spatialDataSources &&
							!_.isEmpty(result.data.spatialDataSources)
						) {
							const changes = null;
							dispatch(
								spatialDataSources.receiveIndexed(
									result.data.spatialDataSources,
									mergedSpatialFilter,
									order,
									relations.offset,
									result.total.spatialRelations,
									changes
								)
							);
						}

						if (!!loadGeometry) {
							// Add data even if data are empty.
							// Override loading indicator in state index
							const changes = null;
							dispatch(
								spatialData.receiveIndexed(
									result.data.spatialData,
									mergedSpatialFilter,
									order,
									changes
								)
							);
						}

						return result;
					} else {
						const error = new Error('no data');
						dispatch(commonActions.actionGeneralError(error));
						return error;
					}
				}
			})
			.catch(error => {
				dispatch(commonActions.actionGeneralError(error));
				return error; //todo do we need to return this
			});
	};
}

export default {
	attributeData,
	attributeDataSources,
	attributeRelations,
	spatialData,
	spatialDataSources,
	spatialRelations,

	ensure, //todo TESTS
	loadMissingSpatialData, //todo TESTS
	ensureDataAndRelations, //todo TESTS
};
