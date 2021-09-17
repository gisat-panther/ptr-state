import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import createCachedSelector from 're-reselect';
import {
	isEmpty as _isEmpty,
	forIn as _forIn,
	isMatch as _isMatch,
	isNumber as _isNumber,
	includes as _includes,
} from 'lodash';

import commonHelpers from '../../_common/helpers';
import commonSelectors from '../../_common/selectors';
import attributeDataSelectors from '../AttributeData/selectors';
import attributeRelationsSelectors from '../AttributeRelations/selectors';
import componentsSelectors from '../../Components/selectors';

const getAllComponentsInUse = state => state.data.components.components.inUse;
const getComponentStateByKey = (state, key) =>
	state.data.components.components.byKey[key] || null;

const getComponentStateByKeyObserver = createRecomputeObserver(
	getComponentStateByKey
);

/**
 * Check if component is in use
 * @param state {Object}
 * @param componentKey {string}
 * @return {boolean}
 */
const isComponentInUse = createCachedSelector(
	[getAllComponentsInUse, (state, componentKey) => componentKey],
	(componentsInUse, componentKey) => {
		if (componentsInUse?.length && componentKey) {
			return !!_includes(componentsInUse, componentKey);
		} else {
			return false;
		}
	}
)((state, componentKey) => componentKey);

/**
 * Check if component's filter by active matches give filterByActive
 * @param state {Object}
 * @param componentKey {string}
 * @param filterByActive {Object} {scope: true, place: true, ...}
 * @return {boolean}
 */
const componentMatchesFilterByActive = createCachedSelector(
	[
		getComponentStateByKey,
		(state, componentKey, filterByActive) => filterByActive,
	],
	(componentState, filterByActive) => {
		if (componentState?.filterByActive && filterByActive) {
			return _isMatch(componentState.filterByActive, filterByActive);
		} else {
			return false;
		}
	}
)(
	(state, componentKey, filterByActive) =>
		`${componentKey}_${JSON.stringify(filterByActive)}`
);

/**
 * Get filter params which are specific for attribute data
 * @param componentKey {string}
 * @return {Object}
 */
const getAttributeDataFilterExtensionByComponentKey = createRecomputeSelector(
	componentKey => {
		const componentState = getComponentStateByKeyObserver(componentKey);

		if (componentState) {
			const {
				attributeFilter,
				dataSourceKeys,
				featureKeys,
				spatialFilter,
			} = componentState;

			return {
				...(attributeFilter !== undefined && {attributeFilter}),
				...(dataSourceKeys !== undefined && {dataSourceKeys}),
				...(featureKeys !== undefined && {featureKeys}),
				...(spatialFilter !== undefined && {spatialFilter}),
			};
		} else {
			return {};
		}
	}
);

/**
 * Get filter params which are common to both attributeRelations and attributeData
 * @param componentKey {string}
 * @return {{modifiers: Object, areaTreeLevelKey: string, layerTemplateKey: string, attributeKeys: Array}}
 */
const getCommonFilterByComponentKey = createRecomputeSelector(componentKey => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	if (componentState) {
		const {
			areaTreeLevelKey,
			attributeKeys,
			filterByActive,
			layerTemplateKey,
			metadataModifiers,
		} = componentState;

		// modifiers defined by key
		const metadataDefinedByKey = metadataModifiers
			? {...metadataModifiers}
			: {};

		if (layerTemplateKey) {
			metadataDefinedByKey[layerTemplateKey] = layerTemplateKey;
		} else if (areaTreeLevelKey) {
			metadataDefinedByKey[areaTreeLevelKey] = areaTreeLevelKey;
		}

		// Get actual metadata keys defined by filterByActive
		const activeMetadataKeys = filterByActive
			? commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive)
			: null;

		// Merge metadata, metadata defined by key have priority
		const mergedMetadataKeys = commonHelpers.mergeMetadataKeys(
			metadataDefinedByKey,
			activeMetadataKeys
		);

		// Decouple modifiers from templates
		const {
			areaTreeLevelKey: modifiedAreaTreeLevelKey,
			layerTemplateKey: modifiedLayerTemplateKey,
			...modifiers
		} = mergedMetadataKeys;

		// It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
		const modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(
			modifiers
		);

		let filter = {};

		if (modifiersForRequest) {
			filter.modifiers = modifiersForRequest;
		}

		if (areaTreeLevelKey || modifiedAreaTreeLevelKey !== undefined) {
			filter.areaTreeLevelKey = areaTreeLevelKey || modifiedAreaTreeLevelKey;
		}

		if (layerTemplateKey || modifiedLayerTemplateKey !== undefined) {
			filter.layerTemplateKey = layerTemplateKey || modifiedLayerTemplateKey;
		}

		if (attributeKeys !== undefined) {
			filter.attributeKeys = attributeKeys;
		}

		return filter;
	} else {
		return {};
	}
});

/**
 * Select attribute data indexes by component key
 * @param componentKey {string}
 */
const getIndexForAttributeDataByComponentKey = createRecomputeSelector(
	componentKey => {
		const componentState = getComponentStateByKeyObserver(componentKey);

		if (componentState) {
			const {attributeOrder} = componentState;

			const attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(
				componentKey
			);

			const commonFilter = getCommonFilterByComponentKey(componentKey);

			const attributeDataFilter = {
				...commonFilter,
				...attributeDataFilterExtension,
			};

			const attributeDataIndex =
				attributeDataSelectors.getIndex_recompute(
					attributeDataFilter,
					attributeOrder
				) || [];

			return !_isEmpty(attributeDataIndex) ? attributeDataIndex : null;
		} else {
			return null;
		}
	}
);

// Data selectors ------------------------------------------------------------------------------------------------------

/**
 * General selector for assembling attribute data for component
 * @param componentKey {string}
 * @return {Array} A collection of features, where each feature has following format: {featureKey: string, data: {attributeKey: string|number|boolean|null}}
 */
const getData = createRecomputeSelector(componentKey => {
	const componentState = getComponentStateByKeyObserver(componentKey);
	if (componentState) {
		// TODO cached selector for data of only relevant data sources needed!!!
		const data = attributeDataSelectors.getAllAsObjectObserver();
		const attributeKeys = componentState?.attributeKeys;

		if (!_isEmpty(data) && attributeKeys?.length) {
			const attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(
				componentKey
			);

			const commonFilter = getCommonFilterByComponentKey(componentKey);

			const attributeFilter = {
				...commonFilter,
				...attributeDataFilterExtension,
			};

			const attributeOrder = componentState.attributeOrder || null;

			const relationsFilter = {
				...commonFilter,
			};

			// Get relations
			const attributeRelations = attributeRelationsSelectors.getIndexed(
				relationsFilter
			);

			if (attributeRelations?.length) {
				// Get from relations, which data source is associated with which attribute
				let attributeDsKeyAttributeKeyPairs = {};
				attributeRelations.forEach(relation => {
					attributeDsKeyAttributeKeyPairs[
						relation.data.attributeDataSourceKey
					] = relation.data.attributeKey;
				});

				// Find data index
				// TODO more sophisticated index with attributeFilter & attributeOrder
				const attributeDataIndex = attributeDataSelectors.getIndex_recompute(
					attributeFilter,
					attributeOrder
				);

				// Get indexed features
				let indexedFeatureKeysAsObject = attributeDataIndex?.index;

				if (
					indexedFeatureKeysAsObject &&
					!_isEmpty(indexedFeatureKeysAsObject)
				) {
					let {start, length} = componentState;
					start = start || 1;
					length = length || attributeDataIndex.count;
					let end = Math.min(start + length - 1, attributeDataIndex.count);

					let finalFeaturesAsObject = [];

					// Loop through indexed features
					for (let i = start; i <= end; i++) {
						const featureKey = indexedFeatureKeysAsObject[i];
						if (featureKey) {
							// We don't know which feature is in which attribute DS
							// also there could be more attributes for the feature
							_forIn(
								attributeDsKeyAttributeKeyPairs,
								(attributeKey, attributeDsKey) => {
									let value = data[attributeDsKey]?.[featureKey];

									if (value !== undefined) {
										// existing feature
										if (finalFeaturesAsObject[i - start]) {
											finalFeaturesAsObject[i - start].data[
												attributeKey
											] = value;
										}

										// new feature
										else {
											// TODO temporary fix for buggy BE values datatype
											value = isNaN(value)
												? value
												: _isNumber(value)
												? value
												: Number(value);

											// TODO format?
											finalFeaturesAsObject[i - start] = {
												key: featureKey,
												data: {
													[attributeKey]: value,
												},
											};
										}
									}
								}
							);
						} else {
							// no feature key at index
							finalFeaturesAsObject.push(null);
						}
					}
					return finalFeaturesAsObject;
				} else {
					return null;
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	} else {
		return null;
	}
});

/**
 * Specific selector to assembling the attribute data & settings of the cartesian chart
 * @param props {Object} component props
 * @param props.stateComponentKey {string} component key, needed for data assembling
 * @return {Object} Cartesian chart data & settings
 */
const getDataForCartesianChart = createRecomputeSelector(props => {
	const componentSettings = componentsSelectors.getByComponentKey_recompute(
		props.stateComponentKey
	);
	const chartSettings = {...componentSettings, ...props};
	const data = getData(props.stateComponentKey);

	return {
		data: data || [],
		...chartSettings,
	};
});

export default {
	componentMatchesFilterByActive,

	getAllComponentsInUse,
	getAttributeDataFilterExtensionByComponentKey,
	getCommonFilterByComponentKey,
	getComponentStateByKey,
	getComponentStateByKeyObserver,
	getIndexForAttributeDataByComponentKey,

	isComponentInUse,

	// Data selectors
	getData,
	getDataForCartesianChart,
};
