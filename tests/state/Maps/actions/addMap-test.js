import {assert} from 'chai';
import slash from 'slash';
import {isEqual as _isEqual} from 'lodash';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../../store';

import {resetFetch, setFetch} from '../../../../src/state/_common/request';
import MapsReducers from '../../../../src/state/Maps/reducers';
import AttributeDataReducer from '../../../../src/state/Data/AttributeData/reducers';
import AttributeRelationsReducer from '../../../../src/state/Data/AttributeRelations/reducers';
import AttributeDataSourcesReducer from '../../../../src/state/Data/AttributeDataSources/reducers';
import SpatialDataReducer from '../../../../src/state/Data/SpatialData/reducers';
import SpatialRelationsReducer from '../../../../src/state/Data/SpatialRelations/reducers';
import SpatialDataSourcesReducer from '../../../../src/state/Data/SpatialDataSources/reducers';
import StylesReducer from '../../../../src/state/Styles/reducers';
import AppReducers from '../../../../src/state/App/reducers';
import {expectedActions1} from './helpers/addMap/expectedActions';

describe('state/Maps/actions/addMap', function () {
	this.timeout(1000);
	afterEach(function () {
		resetFetch();
	});

	const defaultState = {
		app: {
			key: 'testApp',
			localConfiguration: {
				apiBackendProtocol: 'http',
				apiBackendHost: 'localhost',
				apiBackendPath: 'backend',
				requestPageSize: 1,
			},
		},
		maps: {
			activeSetKey: null,
			activeMapKey: null,
			inUse: {
				maps: [],
				sets: [],
			},
			maps: {},
			sets: {},
		},
		data: {
			attributeData: {
				indexes: [],
				byDataSourceKey: {},
			},
			attributeRelations: {
				indexes: [],
			},
			attributeDataSources: {
				indexes: [],
			},
			spatialData: {
				indexes: [],
				byDataSourceKey: {},
			},
			spatialRelations: {
				indexes: [],
			},
			spatialDataSources: {
				indexes: [],
			},
		},
	};

	it('Dispatch addMap', function (done) {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			app: AppReducers,
			data: combineReducers({
				attributeData: AttributeDataReducer,
				attributeRelations: AttributeRelationsReducer,
				attributeDataSources: AttributeDataSourcesReducer,
				spatialData: SpatialDataReducer,
				spatialRelations: SpatialRelationsReducer,
				spatialDataSources: SpatialDataSourcesReducer,
			}),
			maps: MapsReducers,
			styles: StylesReducer,
		});

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};

		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(
			actions.addMap({
				key: 'map1',
				data: {
					viewport: {
						width: 10,
						height: 10,
					},
				},
			})
		);

		setTimeout(() => {
			storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
				const dispatchedActions = storeHelpers.getDispatchedActions();
				if (_isEqual(dispatchedActions, expectedActions1)) {
					done();
				} else {
					done(
						new Error(
							`Dispatched actions are different from expected. Dispatched: ${JSON.stringify(
								dispatchedActions
							)}, expected: ${JSON.stringify(expectedActions1)}`
						)
					);
				}
			});
		}, 50);
	});

	it('dispatch error, if no map given', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.addMap());

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'ERROR',
				},
			]);
		});
	});

	it('dispatch error, if no map key given', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.addMap({data: 'a'}));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'ERROR',
				},
			]);
		});
	});
});
