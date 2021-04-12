import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import {
	createSelector as createRecomputeSelector,
	createObserver as createRecomputeObserver,
} from '@jvitela/recompute';
import {
	compact as _compact,
	flatten as _flatten,
	isEmpty as _isEmpty,
	includes as _includes,
	find as _find,
	forEach as _forEach,
} from 'lodash';

import {map as mapUtils} from '@gisatcz/ptr-utils';
import {mapConstants} from '@gisatcz/ptr-core';

import common from '../_common/selectors';
import commonHelpers from '../_common/helpers';
import {recomputeSelectorOptions} from '../_common/recomputeHelpers';
import selectorHelpers from './selectorHelpers';

import DataSelectors from '../Data/selectors';
import SelectionsSelectors from '../Selections/selectors';
import StylesSelectors from '../Styles/selectors';
import helpers from './selectorHelpers';

/* === SELECTORS ======================================================================= */

const getSubstate = state => state.maps;

const getAllMapSetsInUse = state => state.maps.inUse.sets;
const getAllMapsInUse = state => state.maps.inUse.maps;
const getActiveMapKey = state => state.maps.activeMapKey;
const getMapsAsObject = state => state.maps.maps;
const getMapSetsAsObject = state => state.maps.sets;

const isMapSetInUse = createCachedSelector(
	[getAllMapSetsInUse, (state, mapSetKey) => mapSetKey],
	(mapSetsInUse, mapSetKey) => {
		if (mapSetsInUse.length && mapSetKey) {
			return !!_includes(mapSetsInUse, mapSetKey);
		} else {
			return false;
		}
	}
)((state, mapSetKey) => (mapSetKey ? mapSetKey : ''));

const isMapInUse = createCachedSelector(
	[getAllMapsInUse, (state, mapKey) => mapKey],
	(mapsInUse, mapKey) => {
		if (mapsInUse.length && mapKey) {
			return !!_includes(mapsInUse, mapKey);
		} else {
			return false;
		}
	}
)((state, mapKey) => (mapKey ? mapKey : ''));

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapByKey = createSelector(
	[getMapsAsObject, (state, key) => key],
	(maps, key) => {
		return maps?.[key] || null;
	}
);

/**
 * @param state {Object}
 */
const getMapSets = createSelector([getMapSetsAsObject], sets => {
	if (sets && !_isEmpty(sets)) {
		return Object.values(sets);
	} else {
		return null;
	}
});

/**
 * @param state {Object}
 */
const getAllMapSetsMaps = createSelector([getMapSets], mapSets => {
	if (mapSets) {
		return _flatten(mapSets.map(mapSet => mapSet.maps));
	} else {
		return null;
	}
});

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetByKey = createSelector(
	[getMapSetsAsObject, (state, key) => key],
	(sets, key) => {
		return sets?.[key] || null;
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetByMapKey = createSelector(
	[getMapSets, (state, mapKey) => mapKey],
	(sets, mapKey) => {
		if (sets && !_isEmpty(sets) && mapKey) {
			return (
				_find(sets, set => set.maps && _includes(set.maps, mapKey)) || null
			);
		} else {
			return null;
		}
	}
);

/**
 * Get active map key for set. Either local, or global.
 *
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetActiveMapKey = createSelector(
	[getActiveMapKey, getMapSetByKey],
	(mapKey, set) => {
		if (set) {
			let mapKeyInSet = _includes(set.maps, mapKey);
			return set.activeMapKey || (mapKeyInSet && mapKey) || null;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetActiveMapView = createCachedSelector(
	[getMapSetActiveMapKey, getMapSetByKey, getMapsAsObject],
	(mapKey, set, maps) => {
		let map = maps?.[mapKey];
		if (map) {
			return selectorHelpers.getView(map, set);
		} else {
			return null;
		}
	}
)((state, setKey) => setKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewByMapKey = createCachedSelector(
	[getMapByKey, getMapSetByMapKey],
	selectorHelpers.getView
)((state, mapKey) => mapKey);

const getViewByMapKeyObserver = createRecomputeObserver(getViewByMapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewportByMapKey = createCachedSelector([getMapByKey], map => {
	return map?.data?.viewport || null;
})((state, mapKey) => mapKey);

const getViewportByMapKeyObserver = createRecomputeObserver(
	getViewportByMapKey
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewLimitsByMapKey = createCachedSelector(
	[getMapByKey, getMapSetByMapKey],
	(map, set) => {
		if (map) {
			if (set) {
				let mapViewLimits = map.data?.viewLimits;
				let mapSetViewLimits = set.data?.viewLimits;
				return mapViewLimits || mapSetViewLimits || null;
			} else {
				return map.data?.viewLimits || null;
			}
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetMapKeys = createSelector([getMapSetByKey], set => {
	return set?.maps?.length ? set.maps : null;
});

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetMaps = createSelector(
	[getMapsAsObject, getMapSetMapKeys],
	(maps, mapKeys) => {
		if (!_isEmpty(maps) && mapKeys?.length) {
			return mapKeys.map(key => maps[key]);
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetView = createSelector([getMapSetByKey], set => {
	if (set) {
		return mapUtils.view.mergeViews(
			mapConstants.defaultMapView,
			set.data?.view
		);
	} else {
		return null;
	}
});

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetViewLimits = createSelector([getMapSetByKey], set => {
	return set?.data?.viewLimits || null;
});

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapBackgroundLayerStateByMapKey = createSelector(
	[getMapByKey],
	map => {
		return map?.data?.backgroundLayer || null;
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapLayersStateByMapKey = createSelector([getMapByKey], map => {
	return map?.data?.layers || null;
});

/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 */
const getMapLayerStateByMapKeyAndLayerKey = createSelector(
	[getMapLayersStateByMapKey, (state, mapKey, layerKey) => layerKey],
	(layers, layerKey) => {
		if (layers && layerKey) {
			return layers.find(layer => layer.key === layerKey) || null;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetBackgroundLayerStateByMapKey = createSelector(
	[getMapSetByMapKey],
	set => {
		return set?.data?.backgroundLayer || null;
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetLayersStateByMapKey = createSelector(
	[getMapSetByMapKey],
	set => {
		return set?.data?.layers || null;
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapMetadataModifiersByMapKey = createSelector([getMapByKey], map => {
	return map?.data?.metadataModifiers || null;
});

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetMetadataModifiersByMapKey = createSelector(
	[getMapSetByMapKey],
	set => {
		return set?.data?.metadataModifiers || null;
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMetadataModifiersByMapKey = createCachedSelector(
	[getMapMetadataModifiersByMapKey, getMapSetMetadataModifiersByMapKey],
	(mapModifiers, setModifiers) => {
		if (mapModifiers && setModifiers) {
			return {...setModifiers, ...mapModifiers};
		} else {
			return setModifiers || mapModifiers || null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapFilterByActiveByMapKey = createSelector([getMapByKey], map => {
	return map?.data?.filterByActive || null;
});

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetFilterByActiveByMapKey = createSelector(
	[getMapSetByMapKey],
	set => {
		return set?.data?.filterByActive || null;
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getFilterByActiveByMapKey = createCachedSelector(
	[getMapFilterByActiveByMapKey, getMapSetFilterByActiveByMapKey],
	(mapFilter, setFilter) => {
		if (mapFilter && setFilter) {
			return {...mapFilter, ...setFilter};
		} else {
			return setFilter || mapFilter || null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getBackgroundLayerStateByMapKey = createCachedSelector(
	[getMapBackgroundLayerStateByMapKey, getMapSetBackgroundLayerStateByMapKey],
	(mapBackgroundLayer, setBackgroundLayer) => {
		return mapBackgroundLayer || setBackgroundLayer || null;
	}
)((state, mapKey) => mapKey);

const getBackgroundLayerStateByMapKeyObserver = createRecomputeObserver(
	getBackgroundLayerStateByMapKey
);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapSetState with metadataModifiers and filterByActive.
 */
const getMapSetLayersStateWithModifiersByMapKey = createCachedSelector(
	[
		getMapSetLayersStateByMapKey,
		getMapSetMetadataModifiersByMapKey,
		getMapSetFilterByActiveByMapKey,
	],
	(setLayers, metadataModifiers, mapSetFilterByActive) => {
		if (setLayers?.length) {
			return selectorHelpers.mergeModifiersAndFilterByActiveToLayerStructure(
				setLayers,
				metadataModifiers,
				mapSetFilterByActive
			);
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapState with metadataModifiers and filterByActive.
 */
const getMapLayersStateWithModifiersByMapKey = createCachedSelector(
	[
		getMapLayersStateByMapKey,
		getMetadataModifiersByMapKey,
		getFilterByActiveByMapKey,
	],
	(mapLayers, metadataModifiers, mapFilterByActive) => {
		if (mapLayers?.length) {
			return selectorHelpers.mergeModifiersAndFilterByActiveToLayerStructure(
				mapLayers,
				metadataModifiers,
				mapFilterByActive
			);
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 */
const getLayersStateByMapKey = createCachedSelector(
	[
		getMapSetLayersStateWithModifiersByMapKey,
		getMapLayersStateWithModifiersByMapKey,
	],
	(setLayers, mapLayers) => {
		if (mapLayers && setLayers) {
			return [...setLayers, ...mapLayers];
		} else if (mapLayers) {
			return mapLayers;
		} else if (setLayers) {
			return setLayers;
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

const getLayersStateByMapKeyObserver = createRecomputeObserver(
	getLayersStateByMapKey
);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @return {Object | null}
 */
const getLayerStateByLayerKeyAndMapKey = createSelector(
	[getLayersStateByMapKey, (state, mapKey, layerKey) => layerKey],
	(layers, layerKey) => {
		if (layers) {
			const layer = _find(layers, layer => layer.key === layerKey);
			return layer || null;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getAllLayersStateByMapKey = createCachedSelector(
	[getBackgroundLayerStateByMapKey, getLayersStateByMapKey],
	(backgroundLayer, layers) => {
		if (layers || backgroundLayer) {
			return selectorHelpers.mergeBackgroundLayerWithLayers(
				backgroundLayer,
				layers
			);
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param layerState {Object}
 */
const getSpatialRelationsFilterFromLayerState = createRecomputeSelector(
	layerState => {
		if (layerState) {
			// TODO at least a part is the same as in Maps/actions/layerUse?
			const layer = layerState;

			// modifiers defined by key
			let metadataDefinedByKey = layer.metadataModifiers
				? {...layer.metadataModifiers}
				: {};

			// Get actual metadata keys defined by filterByActive
			const activeMetadataKeys = common.getActiveKeysByFilterByActiveObserver(
				layer.filterByActive
			);

			// Merge metadata, metadata defined by key have priority
			const mergedMetadataKeys = commonHelpers.mergeMetadataKeys(
				metadataDefinedByKey,
				activeMetadataKeys
			);

			const relationsFilter = {};
			// It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
			relationsFilter.modifiers = commonHelpers.convertModifiersToRequestFriendlyFormat(
				mergedMetadataKeys
			);

			// add layerTemplate od areaTreeLevelKey
			if (layer.layerTemplateKey) {
				relationsFilter.layerTemplateKey = layer.layerTemplateKey;
			} else if (layer.areaTreeLevelKey) {
				relationsFilter.areaTreeLevelKey = layer.areaTreeLevelKey;
			}
			return relationsFilter;
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

/**
 * @param {string} mapKey
 * @param {number} mapWidth
 * @param {number} mapHeight
 */
const getSpatialFilterByMapKey = createCachedSelector(
	[
		getViewByMapKey,
		(state, mapKey, mapWidth) => mapWidth,
		(state, mapKey, mapWidth, mapHeight) => mapHeight,
	],
	(view, mapWidth, mapHeight) => {
		if (view?.center && view?.boxRange && mapWidth && mapHeight) {
			const tiles = helpers.getTiles(
				mapWidth,
				mapHeight,
				view.center,
				view.boxRange
			);
			const level = helpers.getZoomLevel(mapWidth, mapHeight, view.boxRange);

			return {
				tiles,
				level,
			};
		} else {
			return null;
		}
	}
)((state, mapKey, mapWidth, mapHeight) => `${mapKey}_${mapWidth}_${mapHeight}`);

/**
 * @param layerState {Object}
 */
const getAttributeDataFilterFromLayerState = createRecomputeSelector(
	layerState => {
		if (layerState) {
			const commonFilter = common.getCommmonDataRelationsFilterFromComponentState_recompute(
				layerState
			);
			if (!_isEmpty(commonFilter)) {
				let attributeFilter = {...commonFilter};
				const attributeDataFilterExtension = {
					...(layerState?.options?.attributeFilter && {
						attributeFilter: layerState.options.attributeFilter,
					}),
					...(layerState?.options?.dataSourceKeys && {
						dataSourceKeys: layerState.options.dataSourceKeys,
					}),
					...(layerState?.options?.featureKeys && {
						featureKeys: layerState.options.featureKeys,
					}),
					...(layerState?.styleKey && {styleKey: layerState.styleKey}),
				};

				return {...attributeFilter, ...attributeDataFilterExtension};
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

/**
 * @param layerState {Object}
 */
const getAttributeRelationsFilterFromLayerState = createRecomputeSelector(
	layerState => {
		if (layerState) {
			const commonFilter = common.getCommmonDataRelationsFilterFromComponentState_recompute(
				layerState
			);
			if (!_isEmpty(commonFilter)) {
				let attributeFilter = {...commonFilter};
				if (layerState.styleKey) {
					// add styleKey
					attributeFilter.styleKey = layerState.styleKey;
				}
				return attributeFilter;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

/**
 * @param spatialDataSource {Object}
 * @param layerState {Object} layer definition from state or passed to the Map component
 * @param layerKey {string} layer unique identifier
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param mapKey {string} map unique identifier
 * @param spatialRelationsFilter {Object} see getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} see getAttributeRelationsFilterFromLayerState
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */
const getFinalLayerByDataSourceAndLayerState = createRecomputeSelector(
	(
		spatialDataSource,
		layerState,
		layerKey,
		attributeDataSourceKeyAttributeKeyPairs,
		mapKey,
		spatialRelationsFilter,
		attributeRelationsFilter,
		attributeDataFilter
	) => {
		let {
			attribution,
			nameInternal,
			type,
			fidColumnName,
			geometryColumnName,
			...dataSourceOptions
		} = spatialDataSource?.data;
		let {key, name, opacity, styleKey, options: layerStateOptions} = layerState;

		layerKey = layerKey || key;

		let options = {...dataSourceOptions, ...layerStateOptions};

		if (type === 'wmts') {
			options.url = dataSourceOptions.url || dataSourceOptions.urls?.[0];
		} else if (type === 'wms') {
			const {url, params, configuration, ...rest} = dataSourceOptions;
			const singleTile =
				configuration && configuration.hasOwnProperty('singleTile')
					? configuration.singleTile
					: false;

			const styles = rest.styles;

			options = {
				params: {
					...params,
					...(styles && {styles}),
					layers: rest.layers,
				},
				singleTile,
				url,
			};
		} else if (
			type === 'vector' ||
			type === 'tiledVector' ||
			type === 'tiled-vector'
		) {
			let features,
				tiles = null;

			if (type === 'vector') {
				features = DataSelectors.getFeatures(
					spatialDataSource.key,
					fidColumnName,
					attributeDataSourceKeyAttributeKeyPairs
				);
			} else if (type === 'tiledVector' || type === 'tiled-vector') {
				const view = getViewByMapKeyObserver(mapKey);
				const viewport = getViewportByMapKeyObserver(mapKey);
				const tileList = selectorHelpers.getTiles(
					viewport.width,
					viewport.height,
					view.center,
					view.boxRange
				);
				const level = selectorHelpers.getZoomLevel(
					viewport.width,
					viewport.height,
					view.boxRange
				);
				tiles = DataSelectors.getTiles(
					spatialDataSource.key,
					fidColumnName,
					level,
					tileList,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				);
			}

			let selected = null;
			let style = options?.style;

			if (options?.selected) {
				selected = SelectionsSelectors.prepareSelectionByLayerStateSelected(
					options.selected
				);
			}

			if (!style && styleKey) {
				style = StylesSelectors.getDefinitionByKey(styleKey);
			}

			options = {
				...options,
				...(selected && {selected}),
				...(style && {style}),
				...(features && {features}),
				...(tiles && {tiles}),
				fidColumnName,
				geometryColumnName,
			};
		}

		return {
			key: layerKey + '_' + spatialDataSource.key,
			layerKey,
			opacity: opacity || opacity === 0 ? opacity : 1,
			name,
			type,
			options,
		};
	},
	recomputeSelectorOptions
);

/**
 * @param mapKey {string} map unique identifier
 * @param layerState {Object} layer definition in state (see getBackgroundLayerState) or passed to the Map component
 * @return {Array} It returns a list of end format definitions of the background layer (per data source). See: https://gisat.github.io/ > Architecture > System data types > Layers
 */
const getMapBackgroundLayer = createRecomputeSelector((mapKey, layerState) => {
	if (!layerState) {
		layerState = getBackgroundLayerStateByMapKeyObserver(mapKey);
	}

	if (layerState) {
		if (layerState.type) {
			return layerState;
		} else {
			const layerKey = 'pantherBackgroundLayer';
			const spatialDataSources = DataSelectors.spatialDataSources.getIndexed_recompute(
				layerState
			);
			if (spatialDataSources) {
				const layers = _compact(
					spatialDataSources.map(dataSource => {
						const dataSourceType = dataSource?.data?.type;

						// TODO currently only wms or wmts is supported; add filterByActive & metadata modifiers to support vectors
						if (dataSourceType === 'wmts' || dataSourceType === 'wms') {
							return getFinalLayerByDataSourceAndLayerState(
								dataSource,
								layerState,
								layerKey
							);
						} else {
							return null;
						}
					})
				);

				return layers.length ? layers : null;
			} else {
				return null;
			}
		}
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * @param mapKey {string} map unique identifier
 * @param layerState {Object} layer definition in state (see getBackgroundLayerState) or passed to the Map component
 * @return {Array} It returns a list of end format definitions of the background layer (per data source). See: https://gisat.github.io/ > Architecture > System data types > Layers
 */
const getMapLayers = createRecomputeSelector((mapKey, layersState) => {
	if (!layersState) {
		layersState = getLayersStateByMapKeyObserver(mapKey);
	}

	if (layersState) {
		let finalLayers = [];

		_forEach(layersState, layerState => {
			// layer is already defined by the end format suitable for presentational map component
			if (layerState.type) {
				if (layerState.type === 'vector' && layerState.options?.selected) {
					layerState = {
						...layerState,
						options: {
							...layerState.options,
							selected: SelectionsSelectors.prepareSelectionByLayerStateSelected(
								layerState.options.selected
							),
						},
					};
				}

				finalLayers.push(layerState);
			}
			// necessary to assemble data for the end format
			else {
				const spatialRelationsFilter = getSpatialRelationsFilterFromLayerState(
					layerState
				);
				const attributeRelationsFilter = getAttributeRelationsFilterFromLayerState(
					layerState
				);
				const attributeDataFilter = getAttributeDataFilterFromLayerState(
					layerState
				);
				const spatialDataSources = DataSelectors.spatialDataSources.getIndexed_recompute(
					spatialRelationsFilter
				);
				const attributeDataSourceKeyAttributeKeyPairs = DataSelectors.attributeRelations.getFilteredAttributeDataSourceKeyAttributeKeyPairs(
					attributeRelationsFilter
				);
				if (spatialDataSources) {
					_forEach(spatialDataSources, dataSource => {
						finalLayers.push(
							getFinalLayerByDataSourceAndLayerState(
								dataSource,
								layerState,
								null,
								attributeDataSourceKeyAttributeKeyPairs,
								mapKey,
								spatialRelationsFilter,
								attributeRelationsFilter,
								attributeDataFilter
							)
						);
					});
				}
			}
		});

		return finalLayers.length ? finalLayers : null;
	} else {
		return null;
	}
}, recomputeSelectorOptions);

export default {
	isMapInUse,
	isMapSetInUse,

	getSubstate,

	getAllLayersStateByMapKey,
	getAllMapSetsMaps,
	getAllMapsInUse,
	getAllMapSetsInUse,

	getAttributeDataFilterFromLayerState,
	getAttributeRelationsFilterFromLayerState,

	getBackgroundLayerStateByMapKey,
	getFilterByActiveByMapKey,
	getFinalLayerByDataSourceAndLayerState,
	getLayerStateByLayerKeyAndMapKey,
	getLayersStateByMapKey,
	getMetadataModifiersByMapKey,

	getMapBackgroundLayerStateByMapKey,
	getMapBackgroundLayer,
	getMapByKey,
	getMapFilterByActiveByMapKey,
	getMapLayerStateByMapKeyAndLayerKey,
	getMapLayersStateByMapKey,
	getMapLayers,
	getMapLayersStateWithModifiersByMapKey,
	getMapMetadataModifiersByMapKey,

	getMapSetActiveMapKey,
	getMapSetActiveMapView,
	getMapSetBackgroundLayerStateByMapKey,
	getMapSetByMapKey,
	getMapSetByKey,
	getMapSetFilterByActiveByMapKey,
	getMapSetLayersStateByMapKey,
	getMapSetLayersStateWithModifiersByMapKey,
	getMapSetMetadataModifiersByMapKey,
	getMapSetMapKeys,
	getMapSetMaps,
	getMapSets,
	getMapSetView,
	getMapSetViewLimits,

	getSpatialFilterByMapKey,
	getSpatialRelationsFilterFromLayerState,

	getViewByMapKey,
	getViewportByMapKey,
	getViewLimitsByMapKey,
};
