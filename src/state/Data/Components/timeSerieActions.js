import {merge as _merge, isEmpty as _isEmpty} from 'lodash';
import {setState} from '@jvitela/recompute';
import {configDefaults} from '@gisatcz/ptr-core';
import request from '../../_common/request';
import commonActions from '../../_common/actions';
import timeSerieRelations from '../TimeSerieRelations/actions';
import timeSerie from '../TimeSerie/actions';
import Select from '../../Select';
import {timeSerieDataType} from './constanst';
import {getPagination, getNullishPagination, getMissingPages} from './helpers';

import {getPageSize} from '../helpers';

const DEFAULT_PAGE_PAGINATION = {
	offset: 0,
	limit: configDefaults.requestPageSize,
};

/**
 * Ensure load data and relations.
 * Useful if no indexes are registered for relations and data.
 * Function has two phases, it loads data and relations in first and determinate and loads what is missing in second phase.
 * @param {String} componentKey Related component
 * @param {Array?} order Order for periods
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in dataFilter.
 * @param {Object} filterExtension Object contains values for extend commonFilter to create dataFilter.
 * @param {Number} start Position of first asked item after ordered.
 * @param {Array} length Length of asked data pairs per feature
 * @param {Number} PAGE_SIZE How many data pairs per feature items will be in one request.
 * @param {Boolean} loadRelations Whether to load relations.
 * @param {bool} loadData Whether response should contain data
 * @param {Object} dataPagination Paginations for data {offset: Number, limit: Number}
 * @param {Object} relationsPagination Paginations for relations {offset: Number, limit: Number}
 * @return {function}
 */
function ensureDataAndRelations(
	componentKey,
	order,
	commonFilter,
	filterExtension,
	start,
	length,
	PAGE_SIZE,
	loadRelations,
	loadData,
	dataPagination,
	relationsPagination
) {
	return (dispatch, getState) => {
		const state = getState();
		// Update recompute state before ask cached selectors.
		setState(state);
		const localConfig = Select.app.getCompleteLocalConfiguration(state);
		const PAGE_SIZE = getPageSize(localConfig);
		const RELATIONS_PAGE_SIZE = getPageSize(localConfig);

		return dispatch(
			loadIndexedPage(
				order,
				commonFilter,
				filterExtension,
				!!loadRelations,
				loadData,
				relationsPagination,
				dataPagination
			)
		).then(response => {
			if (response instanceof Error) {
				return;
				throw response;
			}

			setState(getState());

			const dataIndex =
				Select.data.components.getIndexForTimeSerieByComponentKey(
					componentKey
				) || {};
			// override index by first tsDS index
			// all tsDS index reflects fase structure with same loading data but different values
			dataIndex.index = dataIndex.index[Object.keys(dataIndex.index)[0]];

			const relationsFilter = {...commonFilter};
			const relationsIndex =
				Select.data.timeSerieRelations.getIndex(getState(), relationsFilter) ||
				{};

			// if loadData === false, then do not get missing relations pages
			const missingDataPages = loadData
				? getMissingPages(dataIndex, PAGE_SIZE, start, length)
				: [];

			// if loadRelations === false, then do not get missing relations pages
			const missingRelationsPages = loadRelations
				? getMissingPages(relationsIndex, RELATIONS_PAGE_SIZE, 1, null)
				: [];
			if (missingRelationsPages.length === 0 && missingDataPages.length === 0) {
				//nothing to load
				return;
			} else {
				//needs to load more relations or data
				return dispatch(
					loadMissingRelationsAndData(
						componentKey,
						order,
						commonFilter,
						filterExtension,
						missingRelationsPages,
						missingDataPages,
						start,
						length,
						PAGE_SIZE
					)
				);
			}
		});
	};
}

/**
 * Helper function. Usually second step in requesting data.
 * Load all relations and data based on its remaining page counts.
 * @param {String} componentKey
 * @param {Array?} order Order for periods
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in dataFilter.
 * @param {Object} filterExtension Object contains values for extend commonFilter to create dataFilter.
 * @param {Array} remainingRelationsPages Missing page indexes of ralations defined in array. [0,1,2,3] || [2,5]
 * @param {Array} remainingDataPages Missing page indexes of data pairs defined in array. [0,1,2,3] || [2,5]
 * @param {Array} start Starting position of first requested item. Defualt is 1.
 * @param {Array} length Length of asked data pairs per feature
 * @param {Number} PAGE_SIZE How many data pairs per feature items will be in one request.
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	componentKey,
	order,
	commonFilter,
	filterExtension,
	remainingRelationsPages,
	remainingDataPages,
	start,
	length,
	PAGE_SIZE
) {
	return (dispatch, getState) => {
		const state = getState();
		// Update recompute state before ask cached selectors.
		setState(state);
		const localConfig = Select.app.getCompleteLocalConfiguration(state);
		const RELATIONS_PAGE_SIZE = getPageSize(localConfig);

		const promises = [];

		const dataIndex =
			Select.data.components.getIndexForTimeSerieByComponentKey(componentKey) ||
			{};
		const dataCount = dataIndex.count;

		// override index by first tsDS index
		// all tsDS index reflects fase structure with same loading data but different values
		dataIndex.index = dataIndex.index[Object.keys(dataIndex.index)[0]];

		// load remaining relations pages
		let pagination = 0;
		const loadRelations = true;

		for (let i = 1; i <= remainingRelationsPages.length; i++) {
			const relationsPagination = getPagination(
				remainingRelationsPages[i - 1],
				1,
				RELATIONS_PAGE_SIZE
			);

			//only if missing data pages missing
			let dataPagination = getNullishPagination();
			let loadData = false;
			if (pagination < remainingDataPages.length) {
				dataPagination = getPagination(
					remainingDataPages[i - 1],
					start,
					PAGE_SIZE,
					length,
					dataCount
				);
				loadData = true;
				pagination = i;
			}

			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						commonFilter,
						filterExtension,
						loadRelations,
						loadData,
						relationsPagination,
						dataPagination
					)
				)
			);
		}

		// If its still needed, load remaining data pages
		for (let i = pagination + 1; i <= remainingDataPages.length; i++) {
			const relationsPagination = getNullishPagination();
			const dataPagination = getPagination(
				remainingDataPages[i - 1],
				start,
				PAGE_SIZE,
				length,
				dataCount
			);
			const loadRelations = false;
			const loadData = true;
			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						commonFilter,
						filterExtension,
						loadRelations,
						loadData,
						relationsPagination,
						dataPagination
					)
				)
			);
		}

		return Promise.all(promises);
	};
}

/**
 * Check if for given componentKey missing timeSerie data or relations and load them.
 * @param {String} componentKey
 */
const ensure = componentKey => {
	return (dispatch, getState) => {
		return new Promise(resolve => {
			const state = getState();
			// Update recompute state before ask cached selectors.
			setState(state);
			const componentState = Select.data.components.getComponentStateByKey(
				state,
				componentKey
			);

			if (componentState && componentState.type === timeSerieDataType) {
				const {orderPeriods: order = null, start = 1, length} = componentState;

				const timeSerieFilterExtension =
					Select.data.components.getTimeSerieFilterExtensionByComponentKey(
						componentKey
					);

				const commonFilter =
					Select.data.components.getCommonFilterByComponentKey(componentKey);

				const relationsFilter = {
					...commonFilter,
				};

				const timeSerieDataIndex =
					Select.data.components.getIndexForTimeSerieByComponentKey(
						componentKey
					) || [];

				const timeSerieRelationsIndex =
					Select.data.timeSerieRelations.getIndex(state, relationsFilter) || [];

				let loadRelations = true;
				let loadData = true;

				const localConfig = Select.app.getCompleteLocalConfiguration(state);
				const RELATIONS_PAGE_SIZE = getPageSize(localConfig);

				// TimeSerie data page size is same like app page size
				// In case of need PAGE_SIZE could be modified here
				const PAGE_SIZE = RELATIONS_PAGE_SIZE;

				let relationsPagination = getPagination(0, 1, RELATIONS_PAGE_SIZE);
				let dataPagination = getPagination(0, start, PAGE_SIZE, length);

				let missingRelationsPages, missingDataPages;
				// Relations index exist
				// find if all required relations are loaded
				if (!_isEmpty(timeSerieRelationsIndex)) {
					missingRelationsPages = getMissingPages(
						timeSerieRelationsIndex,
						RELATIONS_PAGE_SIZE,
						1,
						null
					);
					relationsPagination = getPagination(
						missingRelationsPages[0] || 0,
						0,
						RELATIONS_PAGE_SIZE
					);
					if (missingRelationsPages.length > 0) {
						loadRelations = true;
					} else {
						loadRelations = false;
					}
				}

				// Time serie data index exist
				// find if all required data are loaded
				if (!_isEmpty(timeSerieRelationsIndex)) {
					// override index by first tsDS index
					// all tsDS index reflects fase structure with same loading data but different values
					timeSerieDataIndex.index =
						timeSerieDataIndex.index[Object.keys(timeSerieDataIndex.index)[0]];

					missingDataPages = getMissingPages(
						timeSerieDataIndex,
						PAGE_SIZE,
						start,
						length
					);
					dataPagination = getPagination(
						missingDataPages[0] || 0,
						start,
						PAGE_SIZE,
						length,
						timeSerieDataIndex.count
					);
					if (missingDataPages.length > 0) {
						loadData = true;
					} else {
						loadData = false;
					}
				}

				// TimeSerie and relation index is loaded. We know exactly which timeSerie or relations pages we need.
				if (
					!_isEmpty(timeSerieDataIndex) &&
					!_isEmpty(timeSerieRelationsIndex)
				) {
					// Some of data or relations are needed
					if (loadData || loadRelations) {
						// Load just missing data and relations defined by missingPages
						return dispatch(
							loadMissingRelationsAndData(
								componentKey,
								order,
								commonFilter,
								timeSerieFilterExtension,
								missingRelationsPages,
								missingDataPages,
								start,
								length,
								PAGE_SIZE
							)
						).then(resolve);
					} else {
						// All data are loaded
						resolve();
						return;
					}
					// TimeSerieData or relations or both index is not loaded.
				} else {
					// We could have a relations but no data
					// Load relations and data
					return dispatch(
						ensureDataAndRelations(
							componentKey,
							order,
							commonFilter,
							timeSerieFilterExtension,
							start,
							length,
							PAGE_SIZE,
							loadRelations,
							loadData,
							dataPagination,
							relationsPagination
						)
					).then(resolve);
				}
			}
		});
	};
};

/**
 * Compose payload for request from given parameters
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in dataFilter.
 * @param {Object} relationsPagination Pagination for relations. Example `{relations: true, limit:100, offset:0}`.
 * @param {Object?} dataPagination Pagination for data. Example `{data: true, limit:100, offset:0}`.
 * @param {Object} filterExtension Object contains values for extend commonFilter to create dataFilter.
 * @param {Array?} order Order for periods
 * @returns {Object}
 */
const getPayload = (
	commonFilter,
	relationsPagination,
	dataPagination,
	filterExtension,
	order
) => {
	const {dataSourceKeys, featureKeys, spatialFilter} = filterExtension;

	const {layerTemplateKey, areaTreeLevelKey, attributeKeys, modifiers} =
		commonFilter;

	// Create payload
	const payload = {
		modifiers,

		// which layer you want
		...(layerTemplateKey && {layerTemplateKey}),
		...(areaTreeLevelKey && {areaTreeLevelKey}),

		// which attributes you want
		...(attributeKeys && {attributeKeys}),

		// pagination for relations (& data sources)
		relations: relationsPagination,

		data: {
			...(dataPagination && dataPagination),

			orderPeriods: order || null,

			// list of specific features you want
			...(featureKeys && {featureKeys}),

			// extent
			...(spatialFilter && {spatialFilter}),

			// use data source keys instead of LayerTemplateKey/AreaTreeLevelKey + modifiers
			...(dataSourceKeys && {dataSourceKeys}),
		},
	};
	return payload;
};

/**
 * Process result into smaller actions that pass loaded data into store.
 * @param {Object} result Result from BE
 * @param {bool} loadRelations Wether BE should return relations
 * @param {Object} relationsFilter Filter object with modifiers
 * @param {Object?} relationsOrder Order object for relations
 * @param {Object} dataFilter Object contains values extended by commonFilter.
 * @param {Array?} order Order for periods
 * @param {Number} relationsLimit Numeric limitation for loading relations
 * @returns
 */
const processResult = (
	result,
	loadRelations,
	relationsFilter,
	relationsOrder,
	dataFilter,
	order,
	relationsLimit
) => {
	return dispatch => {
		if (result.timeSerieData || result.timeSerieRelations) {
			if (loadRelations) {
				const changes = null;
				dispatch(
					timeSerieRelations.receiveIndexed(
						result.timeSerieRelations.timeSerieRelations,
						relationsFilter,
						relationsOrder,
						result.timeSerieRelations.offset + 1,
						result.timeSerieRelations.total,
						changes,
						relationsLimit
					)
				);
			}

			if (result.timeSerieData.timeSerieData) {
				const changes = null;
				dispatch(
					timeSerie.receiveIndexed(
						result.timeSerieData,
						dataFilter,
						order,
						result.timeSerieData.offset + 1,
						result.timeSerieData.total,
						changes
					)
				);
			}
		}
	};
};

/**
 *
 * @param {Array?} order Order for periods
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in dataFilter.
 * @param {Object} filterExtension Object contains values for extend commonFilter to create dataFilter.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {bool} loadData Whether response should contain data
 * @param {Object?} relationsPagination Pagination for relations.
 * @param {Object?} dataPagination Pagination for tata.
 */
function loadIndexedPage(
	order,
	commonFilter,
	filterExtension,
	loadRelations,
	loadData,
	relationsPagination,
	dataPagination
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/timeSeries/filtered';
		const relationsOrder = null;

		const relationsFilter = {...commonFilter};
		const dataFilter = {
			...commonFilter,
			...filterExtension,
		};

		const usedRelationsPagination = relationsPagination
			? {...relationsPagination}
			: DEFAULT_PAGE_PAGINATION;

		//set relations loading
		dispatch(
			timeSerieRelations.addLoadingIndex(
				usedRelationsPagination,
				relationsFilter,
				relationsOrder
			)
		);

		const usedDataPagination = dataPagination
			? {...dataPagination}
			: DEFAULT_PAGE_PAGINATION;

		//set data loading
		dispatch(timeSerie.addLoadingIndex(usedDataPagination, dataFilter, order));

		const payload = getPayload(
			commonFilter,
			usedRelationsPagination,
			usedDataPagination,
			filterExtension,
			order
		);

		return request(localConfig, apiPath, 'POST', null, payload, undefined, null)
			.then(result => {
				if (result.errors) {
					throw new Error(result.errors[dataType] || 'no data');
				} else {
					if (result.timeSerieData || result.timeSerieRelations) {
						const relationsLimit = usedRelationsPagination.limit;
						dispatch(
							processResult(
								result,
								loadRelations,
								relationsFilter,
								relationsOrder,
								dataFilter,
								order,
								relationsLimit
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

// Actions ------------------------------------------------------------------------------------------------------------

export default {
	ensure,
	ensureDataAndRelations,
	getPayload,
	loadIndexedPage,
	loadMissingRelationsAndData,
	processResult,
};
