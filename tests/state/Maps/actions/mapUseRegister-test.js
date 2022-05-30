import {assert} from 'chai';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../../store';
import MapsReducers from '../../../../src/state/Maps/reducers';

describe('state/Maps/actions/mapUseRegister', function () {
	it('dispatch nothing', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {
				inUse: {
					maps: ['map1'],
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.mapUseRegister('map1'));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('dispatch register map', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {
				inUse: {
					maps: [],
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.mapUseRegister('map1'));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.MAP.USE.REGISTER',
					mapKey: 'map1',
				},
			]);
		});
	});
});
