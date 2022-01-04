import {assert} from 'chai';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../../store';
import MapsReducers from '../../../../src/state/Maps/reducers';
import {MapsSelectorsState as state} from '../selectors/_state';

describe('state/Maps/actions/updateMapAndSetView', function () {
	it('dispatch update lat in set1 _1', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {...state.maps},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.updateMapAndSetView('map1', {center: {lat: 40}}));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.SET.VIEW.UPDATE',
					setKey: 'set1',
					update: {center: {lat: 40}},
				},
			]);
		});
	});

	it('dispatch update lat in set1 _2', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {...state.maps},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.updateMapAndSetView('map2', {center: {lat: 40}}));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.SET.VIEW.UPDATE',
					setKey: 'set1',
					update: {center: {lat: 40}},
				},
			]);
		});
	});

	it('dispatch update lat in map3', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {...state.maps},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.updateMapAndSetView('map3', {center: {lat: 40}}));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.MAP.VIEW.UPDATE',
					mapKey: 'map3',
					update: {center: {lat: 40}},
				},
			]);
		});
	});

	it('dispatch update for center in sync for mapSet and borrange on map ', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {...state.maps},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(
			actions.updateMapAndSetView('map2', {center: {lat: 40}, boxRange: 3000})
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.SET.VIEW.UPDATE',
					setKey: 'set1',
					update: {center: {lat: 40}},
				},
				{
					type: 'MAPS.MAP.VIEW.UPDATE',
					mapKey: 'map2',
					update: {boxRange: 3000},
				},
			]);
		});
	});

	it('dispatch nothing if mapKey in not in state', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {...state.maps},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.updateMapAndSetView('map5', {center: {lat: 40}}));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});
});
