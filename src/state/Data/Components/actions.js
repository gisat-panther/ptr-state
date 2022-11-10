import {merge as _merge, isEmpty as _isEmpty} from 'lodash';
import {setState} from '@jvitela/recompute';
import {configDefaults} from '@gisatcz/ptr-core';
import ActionTypes from '../../../constants/ActionTypes';
import request from '../../_common/request';
import commonActions from '../../_common/actions';
import attributeRelations from '../AttributeRelations/actions';
import attributeData from '../AttributeData/actions';
import Select from '../../Select';
import {getPagination, getNullishPagination, getMissingPages} from './helpers';

import {getPageSize} from '../helpers';

const DEFAULT_PAGE_PAGINATION = {
	offset: 0,
	limit: configDefaults.requestPageSize,
};

/**
 * Update whole data.components.components object with given components
 * @param components {Object}
 */
function addComponentsFromView(components) {
	return dispatch => {
		if (components) {
			dispatch(actionAddOrReplaceComponents(components));
		}
	};
}

/**
 * Update whole data.components.sets object with given sets
 * @param sets {Object}
 */
function addSetsFromView(sets) {
	return dispatch => {
		if (sets) {
			dispatch(actionAddOrReplaceSets(sets));
		}
	};
}

/**
 * Update component deeply with new data
 * @param componentKey {string}
 * @param update {Object}
 */
function updateComponent(componentKey, update) {
	return (dispatch, getState) => {
		const state = getState();
		const componentState =
			Select.data.components.getComponentStateByKey(state, componentKey) || {};

		dispatch(
			actionAddOrReplaceComponents({
				[componentKey]: _merge({}, componentState, update),
			})
		);
	};
}

/**
 * Ensure load attribute data and relations.
 * Useful if no indexes are registered for relations and attribute data.
 * Function has two phases, it loads data and relations in first and determinate and loads what is missing in second phase.
 * @param {String} componentKey Related component
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Number} start Position of first asked item after ordered.
 * @param {Number} length How many attribute data asking for.
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @param {Boolean} loadRelations Whether to load relations.
 * @param {Boolean} loadData Whether to load attribute data.
 * @param {Object} attributePagination Paginations for attributes {offset: Number, limit: Number}
 * @param {Object} relationsPagination Paginations for relations {offset: Number, limit: Number}
 * @return {function}
 */
function ensureDataAndRelations(
	componentKey,
	order,
	commonFilter,
	attributeDataFilterExtension,
	start,
	length,
	PAGE_SIZE,
	loadRelations,
	loadData,
	attributePagination,
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
				attributeDataFilterExtension,
				!!loadRelations,
				loadData,
				relationsPagination,
				attributePagination
			)
		).then(response => {
			if (response instanceof Error) {
				return;
			}

			setState(getState());

			const attributeDataIndex =
				Select.data.components.getIndexForAttributeDataByComponentKey(
					componentKey
				) || [];

			const relationsFilter = {...commonFilter};
			const attributeRelationsIndex =
				Select.data.attributeRelations.getIndex(getState(), relationsFilter) ||
				[];

			// if loadData === false, then do not get missing relations pages
			const missingAttributesPages = loadData
				? getMissingPages(attributeDataIndex, PAGE_SIZE, start, length)
				: [];

			// if loadRelations === false, then do not get missing relations pages
			const missingRelationsPages = loadRelations
				? getMissingPages(attributeRelationsIndex, RELATIONS_PAGE_SIZE, 1, null)
				: [];

			if (
				missingRelationsPages.length === 0 &&
				missingAttributesPages.length === 0
			) {
				//nothing to load
				return;
			} else {
				//needs to load more relations or data
				return dispatch(
					loadMissingRelationsAndData(
						componentKey,
						order,
						commonFilter,
						attributeDataFilterExtension,
						missingRelationsPages,
						missingAttributesPages,
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
 * Load all relations and attributeData based on its remaining page counts.
 * @param {String} componentKey
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array} remainingRelationsPages Missing page indexes of ralations defined in array. [0,1,2,3] || [2,5]
 * @param {Array} remainingAttributeDataPages Missing page indexes of attributes defined in array. [0,1,2,3] || [2,5]
 * @param {Array} start Starting position of first requested item. Defualt is 1.
 * @param {Array} length Length of asked attributeData
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	componentKey,
	order,
	commonFilter,
	attributeDataFilterExtension,
	remainingRelationsPages,
	remainingAttributeDataPages,
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

		const attributeDataIndex =
			Select.data.components.getIndexForAttributeDataByComponentKey(
				componentKey
			) || {};
		const attributeCount = attributeDataIndex.count;

		// load remaining relations pages
		let pagination = 0;
		const loadRelations = true;

		for (let i = 1; i <= remainingRelationsPages.length; i++) {
			const relationsPagination = getPagination(
				remainingRelationsPages[i - 1],
				1,
				RELATIONS_PAGE_SIZE
			);

			//only if missing attribute data pages missing
			let attributePagination = getNullishPagination();
			let loadData = false;
			if (pagination < remainingAttributeDataPages.length) {
				attributePagination = getPagination(
					remainingAttributeDataPages[i - 1],
					start,
					PAGE_SIZE,
					length,
					attributeCount
				);
				loadData = true;
				pagination = i;
			}

			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						commonFilter,
						attributeDataFilterExtension,
						loadRelations,
						loadData,
						relationsPagination,
						attributePagination
					)
				)
			);
		}

		// If its still needed, load remaining data pages
		for (let i = pagination + 1; i <= remainingAttributeDataPages.length; i++) {
			const relationsPagination = getNullishPagination();
			const attributePagination = getPagination(
				remainingAttributeDataPages[i - 1],
				start,
				PAGE_SIZE,
				length,
				attributeCount
			);
			const loadRelations = false;
			const loadData = true;
			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						commonFilter,
						attributeDataFilterExtension,
						loadRelations,
						loadData,
						relationsPagination,
						attributePagination
					)
				)
			);
		}

		return Promise.all(promises);
	};
}

/**
 * Check if for given componentKey missing data or relations and load them.
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

			if (componentState) {
				const {
					attributeOrder: order = null,
					start = 1,
					length,
				} = componentState;

				const attributeDataFilterExtension =
					Select.data.components.getAttributeDataFilterExtensionByComponentKey(
						componentKey
					);

				const commonFilter =
					Select.data.components.getCommonFilterByComponentKey(componentKey);

				const relationsFilter = {
					...commonFilter,
				};

				const attributeDataIndex =
					Select.data.components.getIndexForAttributeDataByComponentKey(
						componentKey
					) || [];

				const attributeRelationsIndex =
					Select.data.attributeRelations.getIndex(state, relationsFilter) || [];

				let loadRelations = true;
				let loadData = true;

				const localConfig = Select.app.getCompleteLocalConfiguration(state);
				const RELATIONS_PAGE_SIZE = getPageSize(localConfig);

				// Attribute data page size is same like app page size
				// In case of need PAGE_SIZE could be modified here
				const PAGE_SIZE = RELATIONS_PAGE_SIZE;

				let relationsPagination = getPagination(0, 1, RELATIONS_PAGE_SIZE);
				let attributePagination = getPagination(0, start, PAGE_SIZE, length);

				let missingRelationsPages, missingAttributesPages;
				// Relations index exist
				// find if all required relations are loaded
				if (!_isEmpty(attributeRelationsIndex)) {
					missingRelationsPages = getMissingPages(
						attributeRelationsIndex,
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

				// Attribute data index exist
				// find if all required data are loaded
				if (!_isEmpty(attributeDataIndex)) {
					missingAttributesPages = getMissingPages(
						attributeDataIndex,
						PAGE_SIZE,
						start,
						length
					);
					attributePagination = getPagination(
						missingAttributesPages[0] || 0,
						start,
						PAGE_SIZE,
						length,
						attributeDataIndex.count
					);
					if (missingAttributesPages.length > 0) {
						loadData = true;
					} else {
						loadData = false;
					}
				}

				// Attribute and relation index is loaded. We know exactly which attribute or relations pages we need.
				if (
					!_isEmpty(attributeDataIndex) &&
					!_isEmpty(attributeRelationsIndex)
				) {
					// Some of data or relations are needed
					if (loadData || loadRelations) {
						// Load just missing data and relations defined by missingPages
						return dispatch(
							loadMissingRelationsAndData(
								componentKey,
								order,
								commonFilter,
								attributeDataFilterExtension,
								missingRelationsPages,
								missingAttributesPages,
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
					// Attribute or relations or both index is not loaded.
				} else {
					// We could have a relations but no data
					// Load relations and data
					return dispatch(
						ensureDataAndRelations(
							componentKey,
							order,
							commonFilter,
							attributeDataFilterExtension,
							start,
							length,
							PAGE_SIZE,
							loadRelations,
							loadData,
							attributePagination,
							relationsPagination
						)
					).then(resolve);
				}
			}
		});
	};
};

const ensureWithFilterByActive = filterByActive => {
	return (dispatch, getState) => {
		const state = getState();
		const componentsInUse = Select.data.components.getAllComponentsInUse(state);
		if (componentsInUse.length) {
			componentsInUse.forEach(componentKey => {
				const fitsFilterByActive =
					Select.data.components.componentMatchesFilterByActive(
						state,
						componentKey,
						filterByActive
					);
				if (fitsFilterByActive) {
					dispatch(ensure(componentKey));
				}
			});
		}
	};
};

/**
 * Entry point for ensuring data for component
 * @param {string} componentKey
 */
const use = componentKey => {
	return dispatch => {
		dispatch(componentUseRegister(componentKey));
		return new Promise(resolve => {
			dispatch(ensure(componentKey)).then(() => {
				resolve();
			});
		});
	};
};

/**
 * Clear use of the component
 * @param componentKey {string}
 */
const componentUseClear = componentKey => {
	return (dispatch, getState) => {
		const registered = Select.data.components.isComponentInUse(
			getState(),
			componentKey
		);
		if (registered) {
			dispatch(actionComponentUseClear(componentKey));
		}
	};
};

/**
 * Register use of the component
 * @param componentKey {string}
 */
const componentUseRegister = componentKey => {
	return (dispatch, getState) => {
		const alreadyRegistered = Select.data.components.isComponentInUse(
			getState(),
			componentKey
		);
		if (!alreadyRegistered) {
			dispatch(actionComponentUseRegister(componentKey));
		}
	};
};

/**
 * Compose payload for request from given parameters
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} relationsPagination Pagination for relations. Example `{relations: true, limit:100, offset:0}`.
 * @param {Object?} attributeDataPagination Pagination for attributeData. Example `{data: true, limit:100, offset:0}`.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array?} order Order object for attributes
 * @returns {Object}
 */
const getPayload = (
	commonFilter,
	relationsPagination,
	attributeDataPagination,
	attributeDataFilterExtension,
	order
) => {
	const {attributeFilter, dataSourceKeys, featureKeys, spatialFilter} =
		attributeDataFilterExtension;

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
		// TODO add support for relations:false on BE
		// ...(loadRelations && {relations: usedRelationsPagination}),
		relations: relationsPagination,

		data: {
			...(attributeDataPagination && attributeDataPagination),

			...(attributeFilter && {attributeFilter}),

			attributeOrder: order || null,

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
 * @param {Object} attributeDataFilter Object contains values extended by commonFilter.
 * @param {Array?} order Order object for attributes
 * @param {Number} relationsLimit Numeric limitation for loading relations
 * @param {Number} attributeDataLimit Numeric limitation for loading attributeData
 * @returns
 */
const processResult = (
	result,
	loadRelations,
	relationsFilter,
	relationsOrder,
	attributeDataFilter,
	order,
	relationsLimit,
	attributeDataLimit
) => {
	return dispatch => {
		if (result.attributeData || result.attributeRelationsDataSources) {
			if (loadRelations) {
				const changes = null;
				dispatch(
					attributeRelations.receiveIndexed(
						result.attributeRelationsDataSources.attributeRelations,
						relationsFilter,
						relationsOrder,
						result.attributeRelationsDataSources.offset + 1,
						result.attributeRelationsDataSources.total,
						changes,
						relationsLimit
					)
				);
			}

			if (result.attributeData.attributeData) {
				const changes = null;
				dispatch(
					attributeData.receiveIndexed(
						result.attributeData,
						attributeDataFilter,
						order,
						result.attributeData.offset + 1,
						result.attributeData.total,
						changes,
						attributeDataLimit
					)
				);
			}
		}
	};
};

/**
 *
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {bool} loadData Whether response should contain data
 * @param {Object?} relationsPagination Pagination for relations.
 * @param {Object?} attributeDataPagination Pagination for attributeData.
 */
function loadIndexedPage(
	order,
	commonFilter,
	attributeDataFilterExtension,
	loadRelations,
	loadData,
	relationsPagination,
	attributeDataPagination
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/attributeData/filtered';
		const relationsOrder = null;

		const relationsFilter = {...commonFilter};
		const attributeDataFilter = {
			...commonFilter,
			...attributeDataFilterExtension,
		};

		const usedRelationsPagination = relationsPagination
			? {...relationsPagination}
			: DEFAULT_PAGE_PAGINATION;

		if (loadRelations) {
			usedRelationsPagination.relations = true;
			//set relations loading
			dispatch(
				attributeRelations.addLoadingIndex(
					usedRelationsPagination,
					relationsFilter,
					relationsOrder
				)
			);
		} else {
			usedRelationsPagination.relations = false;
		}

		const usedAttributeDataPagination = attributeDataPagination
			? {...attributeDataPagination}
			: DEFAULT_PAGE_PAGINATION;

		if (loadData) {
			usedAttributeDataPagination.data = true;
			//set attributeData loading
			dispatch(
				attributeData.addLoadingIndex(
					usedAttributeDataPagination,
					attributeDataFilter,
					order
				)
			);
		} else {
			usedAttributeDataPagination.data = false;
		}

		const payload = getPayload(
			commonFilter,
			usedRelationsPagination,
			usedAttributeDataPagination,
			attributeDataFilterExtension,
			order
		);

		return request(localConfig, apiPath, 'POST', null, payload, undefined, null)
			.then(result => {
				if (result.errors) {
					throw new Error('no data');
				} else {
					if (result.attributeData || result.attributeRelationsDataSources) {
						const relationsLimit = usedRelationsPagination.limit;
						const attributeDataLimit = usedAttributeDataPagination.limit;
						dispatch(
							processResult(
								result,
								loadRelations,
								relationsFilter,
								relationsOrder,
								attributeDataFilter,
								order,
								relationsLimit,
								attributeDataLimit
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
/**
 *
 * @param componentKey {string}
 * @param attributeKeys {Array}
 * @returns
 */
const actionSetAttributeKeys = (componentKey, attributeKeys) => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS,
		componentKey,
		attributeKeys,
	};
};

/**
 *
 * @param componentKey {string}
 * @param featureKeys {Array}
 * @returns
 */
const actionSetFeatureKeys = (componentKey, featureKeys) => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS,
		componentKey,
		featureKeys,
	};
};

const actionAddOrReplaceComponents = components => {
	return {
		type: ActionTypes.DATA.COMPONENTS.ADD_COMPONENTS,
		components,
	};
};

const actionAddOrReplaceSets = sets => {
	return {
		type: ActionTypes.DATA.COMPONENTS.ADD_SETS,
		sets,
	};
};

const actionComponentUseClear = componentKey => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.USE.CLEAR,
		componentKey,
	};
};

const actionComponentUseRegister = componentKey => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.USE.REGISTER,
		componentKey,
	};
};

export default {
	addComponentsFromView,
	addSetsFromView,
	componentUseClear,
	componentUseRegister,
	ensure,
	ensureDataAndRelations,
	ensureWithFilterByActive,
	getPayload,
	loadIndexedPage,
	loadMissingRelationsAndData,
	processResult,
	setAttributeKeys: actionSetAttributeKeys,
	setFeatureKeys: actionSetFeatureKeys,
	updateComponent,
	use,
};
