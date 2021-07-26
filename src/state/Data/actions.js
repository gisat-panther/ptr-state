import {
	isEmpty as _isEmpty,
	reduce as _reduce,
	flattenDeep as _flattenDeep,
	difference as _difference,
	intersection as _intersection,
} from 'lodash';
import {setState} from '@jvitela/recompute';
import {configDefaults} from '@gisatcz/ptr-core';
import attributeRelations from './AttributeRelations/actions';
import attributeDataSources from './AttributeDataSources/actions';
import attributeData from './AttributeData/actions';
import components from './Components/actions';
import spatialRelations from './SpatialRelations/actions';
import spatialDataSources from './SpatialDataSources/actions';
import spatialData from './SpatialData/actions';
import request from '../_common/request';
import commonActions from '../_common/actions';

import Select from '../Select';
import {
	getMissingTiles,
	tileAsString,
	getPageSize,
	tileAsStringArray,
} from './helpers';
import {TILED_VECTOR_LAYER_TYPES} from './constants';
import helpers from '../_common/helpers';

const DEFAULT_RELATIONS_PAGE = {
	offset: 0,
	limit: configDefaults.requestPageSize,
};

/**
 * Calculates how many page of relations is missing.
 * It assume that one page of size PAGE_SIZE was loaded.
 * @param {Number} attributeRelationsCount Wanted attributeRelations items
 * @param {Number} spatialRelationsCount Wanted spatialRelations items
 * @param {Number} PAGE_SIZE How many items fit to one page
 * @returns Number How many pages remaining
 */
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
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Number} attributeRelationsCount Count of known attribute relations. Used for determinate further requests.
 * @param {Number} spatialRelationsCount Count of known spatial relations. Used for determinate further requests.
 * @param {Array} preloadedSpatialDataSources SpatialDataSources loaded by previous request.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	loadGeometry,
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeRelationsCount,
	spatialRelationsCount,
	preloadedSpatialDataSources = [],
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = getPageSize(localConfig);

		const promises = [];

		// load remaining relations pages
		// ignoring first page
		const remainingRelationsPageCount = getRestRelationsPages(
			attributeRelationsCount,
			spatialRelationsCount,
			PAGE_SIZE
		);
		let tilesPagination = 0;
		for (let i = 1; i <= remainingRelationsPageCount; i++) {
			//load only needed relations
			const loadAttributeRelations = attributeRelationsCount - i > 0;
			const loadSpatialRelations = spatialRelationsCount - i > 0;
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
						spatialIndex,
						spatialFilter,
						loadGeometry,
						loadAttributeRelations,
						loadSpatialRelations,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}

		//
		//load rest of tiles
		//
		const remainingTilesPageCount = spatialFilter?.tiles?.length || 0;

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
						spatialIndex,
						spatialFilter,
						loadGeometry,
						loadRestTilesRelations,
						loadRestTilesRelations,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}
		if (promises.length > 0) {
			return Promise.all(promises).then((response = []) => {
				// All relations are loaded at this moment.
				// Check if all spatialDataSources relations from response and preloadedSpatialDataSources are type of "unsupported" like raster/wms/wmts.
				// If all spatialDataSources are unsupported, then received data are empty and indexes needs to be removed.
				// If only some of spatialDataSources relations are unsupported, then loading status on index will be replaced by data.
				const spatialDataSourcesTypes = _flattenDeep(
					response.map(r =>
						r?.spatialAttributeRelationsDataSources?.spatialDataSources?.map(
							sds => ({
								type: sds.data.type,
								key: sds.key,
							})
						)
					)
				);
				const spatialDataSourcesPairs = [
					...spatialDataSourcesTypes,
					...preloadedSpatialDataSources,
				];

				//test spatialDataSources only if some come from BE
				const allSourcesAreUnsupported = !_isEmpty(spatialDataSourcesPairs)
					? spatialDataSourcesPairs.every(
							ds => !TILED_VECTOR_LAYER_TYPES.includes(ds.type)
					  )
					: false;

				// Check if all of returned spatialDataSources are unsupported type.
				// Indexes for unsupported layers can be cleared.
				if (allSourcesAreUnsupported) {
					// AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
					dispatch(spatialData.removeIndex(spatialRelationsFilter, order));
					dispatch(
						attributeData.removeSpatialIndex(attributeDataFilter, order)
					);
				}
			});
		} else {
			return Promise.resolve();
		}
	};
}

/**
 * Ensure load missing attribute data and relations for tiles defined in spatialFilter that are not loaded or loading in state.
 *
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */
function loadMissingAttributeData(
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const state = getState();
		const localConfig = Select.app.getCompleteLocalConfiguration(state);
		const PAGE_SIZE = getPageSize(localConfig);

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
				state,
				'spatialIndexes',
				attributeDataFilter,
				order
			) || [];

		//diff loaded attribute data from index with wanted spatial data
		const missingAttributeDataTiles =
			getMissingTiles(attributeDataIndex, spatialFilter) || [];

		// Load relations and data sources in first request if they are not already loaded.
		const attributeRelations = Select.data.attributeRelations.getIndex(
			state,
			attributeRelationsFilter,
			order
		);
		const attributeDataSources = Select.data.attributeDataSources.getIndex(
			state,
			attributeRelationsFilter,
			order
		);
		let loadAttributeRelationsAndDS = !(
			!_isEmpty(attributeRelations) && !_isEmpty(attributeDataSources)
		);

		//load only attribute data
		const loadGeometry = false;

		// Modified spatial filter with only missing attribute data tiles
		const spatialFilterWithMissingTiles = {
			...spatialFilter,
			tiles: missingAttributeDataTiles,
		};
		// Relations for given filters are missing
		if (loadAttributeRelationsAndDS) {
			// Only if spatialIndex is null then is set whole spatialFilter.tiles as loading true in one step
			const spatialIndex = null;
			const loadAttributeRelations = true;
			const loadSpatialRelations = false;
			// Load relations
			return dispatch(
				loadIndexedPage(
					styleKey,
					relations,
					spatialIndex,
					spatialFilterWithMissingTiles,
					loadGeometry,
					loadAttributeRelations,
					loadSpatialRelations,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			).then(response => {
				if (response instanceof Error) {
					return;
					throw response;
				}

				const spatialDataSources =
					response?.spatialAttributeRelationsDataSources?.spatialDataSources ||
					[];
				const preloadSpatialDataSources = spatialDataSources.map(sds => ({
					type: sds.data.type,
					key: sds.key,
				}));

				const attributeRelationsCount =
					response.spatialAttributeRelationsDataSources.total
						.attributeRelations;
				const spatialRelationsCount =
					response.spatialAttributeRelationsDataSources.total.spatialRelations;
				return dispatch(
					loadMissingRelationsAndData(
						loadGeometry,
						spatialFilterWithMissingTiles,
						styleKey,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeRelationsCount,
						spatialRelationsCount,
						preloadSpatialDataSources,
						attributeDataFilter
					)
				);
			});
		} else {
			const promises = [];
			const loadAttributeRelations = false;
			const loadSpatialRelations = false;

			for (const tile of missingAttributeDataTiles) {
				const spatialIndex = {
					tiles: [tile],
				};

				promises.push(
					dispatch(
						loadIndexedPage(
							styleKey,
							relations,
							spatialIndex,
							spatialFilter,
							loadGeometry,
							loadAttributeRelations,
							loadSpatialRelations,
							order,
							spatialRelationsFilter,
							attributeRelationsFilter,
							attributeDataFilter
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
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */
function loadMissingSpatialData(
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		//
		//which spatial data to load
		//

		//get spatial data index with loaded and loading data
		const spatialDataIndex =
			Select.data.spatialData.getIndex(
				getState(),
				spatialRelationsFilter,
				order
			) || [];

		//diff spatial data loaded/loading and to load
		const missingSpatialDataTiles =
			getMissingTiles(spatialDataIndex, spatialFilter) || [];
		const loadGeometry = true;

		dispatch(
			setLoading(
				attributeDataFilter,
				{
					tiles: missingSpatialDataTiles,
				},
				spatialFilter,
				spatialRelationsFilter,
				order,
				loadGeometry
			)
		);
		const promises = [];
		for (const tile of missingSpatialDataTiles) {
			const spatialIndex = {
				tiles: [tile],
			};

			const relations = {};
			const loadRelations = false;
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						spatialIndex,
						spatialFilter,
						loadGeometry,
						loadRelations,
						loadRelations,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}
		return Promise.all(promises);
	};
}

/**
 * Ensure load spatial data, attribute data and relations for tiles defined in spatialFilter.
 * Makes load first page of data, if more date missing, pass filters to loadMissingRelationsAndData.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */
function ensureDataAndRelations(
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = getPageSize(localConfig);

		const relations = {
			// start: 0,
			// length: 1000,
			offset: 0,
			limit: PAGE_SIZE,
		};

		const loadGeometry = true;
		const loadAttributeRelations = true;
		const loadSpatialRelations = true;
		if (spatialFilter && !_isEmpty(spatialFilter)) {
			// Only if spatialIndex is null then is set whole spatialFilter.tiles as loading true in one step
			const spatialIndex = null;
			return dispatch(
				loadIndexedPage(
					styleKey,
					relations,
					spatialIndex,
					spatialFilter,
					loadGeometry,
					loadAttributeRelations,
					loadSpatialRelations,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			)
				.then(response => {
					if (response instanceof Error) {
						return;
						throw response;
					}

					const attributeRelationsCount =
						response.spatialAttributeRelationsDataSources.total
							.attributeRelations;
					const spatialRelationsCount =
						response.spatialAttributeRelationsDataSources.total
							.spatialRelations;

					const restRelationsPages = getRestRelationsPages(
						attributeRelationsCount,
						spatialRelationsCount,
						PAGE_SIZE
					);

					const spatialDataSources =
						response?.spatialAttributeRelationsDataSources
							?.spatialDataSources || [];

					//test spatialDataSources only if some come from BE
					const allSourcesAreUnsupported = loadSpatialRelations
						? spatialDataSources.every(
								ds => !TILED_VECTOR_LAYER_TYPES.includes(ds.data?.type)
						  )
						: false;

					// Check if all of returned spatialDataSources are unsupported type.
					// If so, is no reason to make further requests.
					// Indexes for unsupported layers can be cleared.
					if (restRelationsPages === 0 && allSourcesAreUnsupported) {
						// AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
						dispatch(spatialData.removeIndex(spatialRelationsFilter, order));
						dispatch(
							attributeData.removeSpatialIndex(attributeDataFilter, order)
						);
						return;
					} else {
						const preloadSpatialDataSources = spatialDataSources.map(sds => ({
							type: sds.data.type,
							key: sds.key,
						}));
						return dispatch(
							loadMissingRelationsAndData(
								loadGeometry,
								spatialFilter,
								styleKey,
								order,
								spatialRelationsFilter,
								attributeRelationsFilter,
								attributeRelationsCount,
								spatialRelationsCount,
								preloadSpatialDataSources,
								attributeDataFilter
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
 * It find out if for given spatialRelationsFilter exists relations index.
 * The Existence of index means it is loading or loaded or we can just find out missing data.
 * TODO - add support of areaTrees
 * TODO - add support of dataSourcesKeys
 * @param {Object} state App state object
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array} order
 * @return {bool}
 */
const hasSpatialOrAreaRelations = (state, spatialRelationsFilter, order) => {
	let spatialRelationsIndex = null;
	let areaRelationsIndex = null;

	if (spatialRelationsFilter.layerTemplateKey) {
		spatialRelationsIndex = Select.data.spatialRelations.getIndex(
			state,
			spatialRelationsFilter,
			order
		);
	}

	// FIXME - add support for areaTreeLevels
	if (spatialRelationsFilter.areaTreeLevelKey) {
		// areaRelationsIndex = Select.data.areaRelations.getIndex(getState(), spatialRelationsFilter, order);
	}

	return spatialRelationsIndex !== null || areaRelationsIndex !== null;
};

/**
 * Entry function for requesting of loading new data. In first step are identified loaded indexes based on filters.
 * Next phase is request only data that are missing.
 * @param styleKey {string}
 * @param commonRelationsFilter {Object} Filter object with modifiers, layerTemplateKey or areaTreeLevelKey. It defines spatialRealations and after add styleKey is used as a attributeRelations filter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param attributeDataFilterExtension {Object} Filter object with optional values for attributeFilter, dataSourceKeys and featureKeys. After merge with attributeRelationsFilter it defines filter for attributeData
 * @return {function}
 */
function ensure(
	styleKey,
	commonRelationsFilter,
	spatialFilter,
	attributeDataFilterExtension
) {
	return (dispatch, getState) => {
		// Filter params - see Panther docs: Code/API/Data endpoint
		const {areaTreeLevelKey, layerTemplateKey} = commonRelationsFilter;
		const spatialRelationsFilter = commonRelationsFilter;
		const attributeRelationsFilter = {...commonRelationsFilter, styleKey};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			...attributeDataFilterExtension,
		};

		// ensure string datatype for tiles in filter
		spatialFilter.tiles = spatialFilter.tiles.map(tileAsStringArray);

		// Order for spatialData if null at the moment
		const order = null;

		const spatialDataIndex =
			Select.data.spatialData.getIndex(
				getState(),
				spatialRelationsFilter,
				order
			) || [];
		const attributeDataIndex =
			Select.data.attributeData.getIndex(
				getState(),
				'spatialIndexes',
				attributeDataFilter,
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
			spatialRelationsFilter,
			order
		);

		const loadRelationsAndData =
			!filterHasSpatialOrAreaRelations && missingSpatialData;

		let modifiedSpatialFilterForAttributes = {...spatialFilter};
		let modifiedSpatialFilterForSpatial = {...spatialFilter};

		// If spatial relations are loaded and spatial and attribute date are missing,
		// find which only attribute tile are missing and which attribute tiles load with spatial data.
		if (!loadRelationsAndData && missingAttributesData) {
			const missingAttributeDataTiles =
				getMissingTiles(attributeDataIndex, spatialFilter) || [];
			const missingSpatialDataTiles =
				getMissingTiles(spatialDataIndex, spatialFilter) || [];

			const missingAttributeDataTilesToLoad = _difference(
				missingAttributeDataTiles,
				missingSpatialDataTiles
			);
			const missingSpatialAndAttributeDataTiles = _intersection(
				missingAttributeDataTiles,
				missingSpatialDataTiles
			);

			modifiedSpatialFilterForAttributes.tiles = missingAttributeDataTilesToLoad;

			modifiedSpatialFilterForSpatial.tiles = missingSpatialAndAttributeDataTiles;
		}

		const promises = [];

		if (loadRelationsAndData) {
			promises.push(
				dispatch(
					ensureDataAndRelations(
						spatialFilter,
						styleKey,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}

		if (
			filterHasSpatialOrAreaRelations &&
			missingSpatialData &&
			!_isEmpty(modifiedSpatialFilterForSpatial.tiles)
		) {
			promises.push(
				dispatch(
					loadMissingSpatialData(
						modifiedSpatialFilterForSpatial,
						styleKey,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}

		if (
			!loadRelationsAndData &&
			!_isEmpty(modifiedSpatialFilterForAttributes.tiles)
		) {
			promises.push(
				dispatch(
					loadMissingAttributeData(
						modifiedSpatialFilterForAttributes,
						styleKey,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}

		return Promise.all(promises);
	};
}

/**
 * Save result data to related stores.
 * If data are presented, then save them to attributeRelations, attributeDataSources, attributeData, spatialRelations, spatialDataSources, spatialData.
 * @param {Object} result result data from backend data endpoind
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} start
 */
function processResult(
	result,
	loadGeometry,
	loadAttributeRelations,
	loadSpatialRelations,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter,
	start
) {
	return (dispatch, getState) => {
		////
		// Attributes
		////
		if (
			!!loadAttributeRelations &&
			result.spatialAttributeRelationsDataSources.attributeRelations &&
			!_isEmpty(result.spatialAttributeRelationsDataSources.attributeRelations)
		) {
			const changes = null;
			dispatch(
				attributeRelations.receiveIndexed(
					result.spatialAttributeRelationsDataSources.attributeRelations,
					attributeRelationsFilter,
					order,
					start,
					result.spatialAttributeRelationsDataSources.total.attributeRelations,
					changes
				)
			);
		}

		if (
			!!loadAttributeRelations &&
			result.spatialAttributeRelationsDataSources.attributeDataSources &&
			!_isEmpty(
				result.spatialAttributeRelationsDataSources.attributeDataSources
			)
		) {
			const changes = null;
			dispatch(
				attributeDataSources.receiveIndexed(
					result.spatialAttributeRelationsDataSources.attributeDataSources,
					attributeRelationsFilter,
					order,
					start,
					result.spatialAttributeRelationsDataSources.total.attributeRelations,
					changes
				)
			);
		}

		if (result.spatialData && result.attributeData) {
			const changes = null;
			const spatialIndexData = attributeData.getTiledIndexDataBySpatialData(
				result.spatialData,
				result.attributeData
			);
			dispatch(
				attributeData.receiveIndexedWithSpatialIndex(
					result.attributeData,
					spatialIndexData,
					attributeDataFilter,
					order,
					changes
				)
			);
		}

		////
		// Spatial data
		////
		if (
			!!loadSpatialRelations &&
			result.spatialAttributeRelationsDataSources.spatialRelations &&
			!_isEmpty(result.spatialAttributeRelationsDataSources.spatialRelations)
		) {
			const changes = null;
			dispatch(
				spatialRelations.receiveIndexed(
					result.spatialAttributeRelationsDataSources.spatialRelations,
					spatialRelationsFilter,
					order,
					start,
					result.spatialAttributeRelationsDataSources.total.spatialRelations,
					changes
				)
			);
		}

		if (
			!!loadSpatialRelations &&
			result.spatialAttributeRelationsDataSources.spatialDataSources &&
			!_isEmpty(result.spatialAttributeRelationsDataSources.spatialDataSources)
		) {
			const changes = null;
			dispatch(
				spatialDataSources.receiveIndexed(
					result.spatialAttributeRelationsDataSources.spatialDataSources,
					spatialRelationsFilter,
					order,
					start,
					result.spatialAttributeRelationsDataSources.total.spatialRelations,
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
					result.spatialData,
					spatialRelationsFilter,
					order,
					changes
				)
			);
		}
	};
}

/**
 * Create request payload for data endpoint
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @returns
 */
function composeDataEndpointPayload(
	spatialRelationsFilter,
	styleKey,
	relations,
	attributeDataFilter,
	spatialIndex,
	loadGeometry,
	loadAttributeRelations,
	loadSpatialRelations,
	spatialFilter
) {
	const {areaTreeLevelKey, layerTemplateKey, modifiers} =
		spatialRelationsFilter || {};

	// Create payload
	const payload = {
		...(modifiers && {modifiers}),

		// which layer you want
		...(layerTemplateKey && {layerTemplateKey}),
		...(areaTreeLevelKey && {areaTreeLevelKey}),

		// get attributes from style
		...(styleKey && {styleKey}),

		// pagination for relations (& data sources)
		relations: {
			...relations,

			//should response contain attribute or spatial relations
			attribute: !!loadAttributeRelations,
			spatial: !!loadSpatialRelations,
			//FIXME temporary force add area relations true
			area: true,
		},

		data: {
			// list of features you want
			...(attributeDataFilter?.featureKeys && {
				featureKeys: attributeDataFilter.featureKeys,
			}),

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
			...(attributeDataFilter?.attributeFilter && {
				attributeFilter: attributeDataFilter.attributeFilter,
			}),

			//request for geometry
			geometry: !!loadGeometry,

			// use data source keys as filter or add them to filter
			...(attributeDataFilter?.dataSourceKeys && {
				dataSourceKeys: attributeDataFilter.dataSourceKeys,
			}),
		},
	};
	return payload;
}

/**
 * Set loading status to spatialData and attributeData stores to related indexes, level and tiles.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {bool} loadGeometry Whether response should contain geometry
 */
function setLoading(
	attributeDataFilter,
	spatialIndex,
	spatialFilter,
	spatialRelationsFilter,
	order,
	loadGeometry
) {
	return (dispatch, getState) => {
		setState(getState());
		const loadingTilesGeometry =
			spatialIndex?.tiles || spatialFilter?.tiles || [];

		//get loading tiles
		const spatialTilesInNotLoadingState = _reduce(
			loadingTilesGeometry,
			(acc = [], tile) => {
				const loading = Select.data.spatialData.isTileLoading(
					spatialRelationsFilter,
					spatialFilter.level,
					tileAsString(tile)
				);
				if (!loading) {
					return [...acc, tileAsStringArray(tile)];
				} else {
					return acc;
				}
			},
			[]
		);
		const attributesTilesInNotLoadingState = _reduce(
			loadingTilesGeometry,
			(acc = [], tile) => {
				const loading = Select.data.attributeData.isTileLoading(
					attributeDataFilter,
					spatialFilter.level,
					tileAsString(tile)
				);
				if (!loading) {
					return [...acc, tileAsStringArray(tile)];
				} else {
					return acc;
				}
			},
			[]
		);

		////
		// Spatial
		////
		if (loadGeometry && spatialTilesInNotLoadingState.length > 0) {
			dispatch(
				spatialData.addLoadingIndex(
					spatialRelationsFilter,
					order,
					spatialFilter.level,
					spatialTilesInNotLoadingState
				)
			);
		}

		////
		// Attribute
		////
		if (attributesTilesInNotLoadingState.length > 0) {
			dispatch(
				attributeData.addLoadingSpatialIndex(
					attributeDataFilter,
					order,
					spatialFilter.level,
					attributesTilesInNotLoadingState
				)
			);
		}
	};
}

/**
 * Central method for executing requests to data endpoint.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */
function loadIndexedPage(
	styleKey,
	relations,
	spatialIndex,
	spatialFilter,
	loadGeometry,
	loadAttributeRelations,
	loadSpatialRelations,
	order,
	spatialRelationsFilter = {},
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/data/filtered';

		//Register loading to related indexes and tiles
		dispatch(
			setLoading(
				attributeDataFilter,
				spatialIndex,
				spatialFilter,
				spatialRelationsFilter,
				order,
				loadGeometry
			)
		);

		const usedRelations = relations ? {...relations} : DEFAULT_RELATIONS_PAGE;

		const payload = composeDataEndpointPayload(
			spatialRelationsFilter,
			styleKey,
			usedRelations,
			attributeDataFilter,
			spatialIndex,
			loadGeometry,
			loadAttributeRelations,
			loadSpatialRelations,
			spatialFilter
		);

		const start = usedRelations.offset + 1;

		return request(localConfig, apiPath, 'POST', null, payload, undefined, null)
			.then(result => {
				if (result.errors) {
					const error = new Error(result.errors[dataType] || 'no data');
					dispatch(commonActions.actionGeneralError(error));
				} else {
					if (
						result.spatialAttributeRelationsDataSources &&
						result.spatialData &&
						result.attributeData
					) {
						dispatch(
							processResult(
								result,
								loadGeometry,
								loadAttributeRelations,
								loadSpatialRelations,
								order,
								spatialRelationsFilter,
								attributeRelationsFilter,
								attributeDataFilter,
								start
							)
						);
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
	//export of sub actions
	attributeData,
	attributeDataSources,
	attributeRelations,
	components,
	spatialData,
	spatialDataSources,
	spatialRelations,

	//export functions
	composeDataEndpointPayload,
	ensure,
	ensureDataAndRelations,
	getRestRelationsPages,
	hasMissingAttributesData,
	hasMissingSpatialData,
	hasSpatialOrAreaRelations,
	loadIndexedPage,
	loadMissingAttributeData,
	loadMissingRelationsAndData,
	loadMissingSpatialData,
	processResult,
	setLoading,
};
