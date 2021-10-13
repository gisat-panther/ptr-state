import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reduxBatch} from '@manaflair/redux-batch';
import {
	setState as setRecomputeState,
	createSelector as createRecomputeSelector,
	createObserver as createRecomputeObserver,
} from '@jvitela/recompute';
import {connect, Provider, ReactReduxContext} from 'react-redux';

import connects from './components/connects';
import MountWrapper from './components/MountWrapper';

import commonActionTypes from './constants/ActionTypes';
import Action from './state/Action';
import Select from './state/Select';

import commonActions from './state/_common/actions';
import commonHelpers from './state/_common/helpers';
import commonReducers, {DEFAULT_INITIAL_STATE} from './state/_common/reducers';
import commonSelectors from './state/_common/selectors';

import activeMetadataActions from './state/_activeMetadata/actions';
import {STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE} from './state/_activeMetadata/constants';

import * as appReducers from './state/App/reducers';
import * as areasReducers from './state/Areas/reducers';
import * as areaRelationsReducers from './state/AreaRelations/reducers';
import * as attributesReducers from './state/Attributes/reducers';
import * as attributeSetsReducers from './state/AttributeSets/reducers';
import * as casesReducers from './state/Cases/reducers';
import * as componentsReducers from './state/Components/reducers';
import * as dataReducers from './state/Data/reducers';
import * as layerTemplatesReducers from './state/LayerTemplates/reducers';
import * as layerTreesReducers from './state/LayerTrees/reducers';
import * as mapsReducers from './state/Maps/reducers';
import * as periodsReducers from './state/Periods/reducers';
import * as placesReducers from './state/Places/reducers';
import * as scenariosReducers from './state/Scenarios/reducers';
import * as scopesReducers from './state/Scopes/reducers';
import * as screensReducers from './state/Screens/reducers';
import * as selectionsReducers from './state/Selections/reducers';
import * as stylesReducers from './state/Styles/reducers';
import * as tagsReducers from './state/Tags/reducers';
import * as usersReducers from './state/Users/reducers';
import * as viewsReducers from './state/Views/reducers';
import * as windowsReducers from './state/Windows/reducers';

const baseStores = {
	app: appReducers.default,
	areas: areasReducers.default,
	areaRelations: areaRelationsReducers.default,
	attributes: attributesReducers.default,
	attributeSets: attributeSetsReducers.default,
	cases: casesReducers.default,
	components: componentsReducers.default,
	data: dataReducers.default,
	layerTemplates: layerTemplatesReducers.default,
	layerTrees: layerTreesReducers.default,
	maps: mapsReducers.default,
	periods: periodsReducers.default,
	places: placesReducers.default,
	scenarios: scenariosReducers.default,
	scopes: scopesReducers.default,
	screens: screensReducers.default,
	selections: selectionsReducers.default,
	styles: stylesReducers.default,
	tags: tagsReducers.default,
	users: usersReducers.default,
	views: viewsReducers.default,
	windows: windowsReducers.default,
};

const initialStates = {
	app: appReducers.INITIAL_STATE,
	areas: areasReducers.INITIAL_STATE,
	areaRelations: areaRelationsReducers.INITIAL_STATE,
	attributes: attributesReducers.INITIAL_STATE,
	attributeSets: attributeSetsReducers.INITIAL_STATE,
	cases: casesReducers.INITIAL_STATE,
	components: componentsReducers.INITIAL_STATE,
	data: dataReducers.INITIAL_STATE,
	layerTemplates: layerTemplatesReducers.INITIAL_STATE,
	layerTrees: layerTreesReducers.INITIAL_STATE,
	maps: mapsReducers.INITIAL_STATE,
	periods: periodsReducers.INITIAL_STATE,
	places: placesReducers.INITIAL_STATE,
	scenarios: scenariosReducers.INITIAL_STATE,
	scopes: scopesReducers.INITIAL_STATE,
	screens: screensReducers.INITIAL_STATE,
	selections: selectionsReducers.INITIAL_STATE,
	styles: stylesReducers.INITIAL_STATE,
	tags: tagsReducers.INITIAL_STATE,
	users: usersReducers.INITIAL_STATE,
	views: viewsReducers.INITIAL_STATE,
	windows: windowsReducers.INITIAL_STATE,
};

/**
 * Helper function for creating redux store.
 * @param {Object} specificStores Object with speficic store/stores. Stores will by available in state under "specific" key.
 * @param {Array} rootStores Array of redux stores
 * @param {Array} middleware Array of redux middlewares.
 * @param {Object?} preloadedState Optional object used for store initialization as a default state.
 * @returns {Object} redux store instance
 */
const createBaseStore = (
	specificStores,
	rootStores = [],
	middleware = [],
	preloadedState
) => {
	const enhancedThunk = thunk.withExtraArgument(activeMetadataActions);

	let appliedMiddleware = applyMiddleware(enhancedThunk, ...middleware);
	if (process.env.NODE_ENV === 'development') {
		appliedMiddleware = applyMiddleware(enhancedThunk, logger, ...middleware);
	}
	let stores = specificStores
		? {...baseStores, ...rootStores, specific: combineReducers(specificStores)}
		: {...baseStores, ...rootStores};
	if (preloadedState) {
		return createStore(
			combineReducers(stores),
			preloadedState,
			compose(reduxBatch, appliedMiddleware, reduxBatch)
		);
	} else {
		return createStore(
			combineReducers(stores),
			compose(reduxBatch, appliedMiddleware, reduxBatch)
		);
	}
};

export {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
	connect,
	initialStates,
	Provider,
	ReactReduxContext,
	MountWrapper,
	baseStores,
	createBaseStore,
	connects,
	commonActionTypes,
	Action,
	Select,
	commonActions,
	commonHelpers,
	commonReducers,
	commonSelectors,
	DEFAULT_INITIAL_STATE,
	activeMetadataActions,
	STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE,
	thunk,
	logger,
	reduxBatch,
	createRecomputeObserver,
	createRecomputeSelector,
	setRecomputeState,
};

// TODO remove?
export default {
	commonActionTypes,
	Action,
	Select,

	commonActions,
	commonHelpers,
	commonReducers,
	commonSelectors,

	initialStates,
	DEFAULT_INITIAL_STATE,
};
