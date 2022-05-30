import {assert} from 'chai';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../../store';
import MapsReducers from '../../../../src/state/Maps/reducers';

describe('state/Maps/actions/mapSetUseRegister', function () {
	it('dispatch nothing', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {
				inUse: {
					sets: ['mapSet1'],
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.mapSetUseRegister('mapSet1'));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('dispatch register mapSet', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {
				inUse: {
					sets: [],
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.mapSetUseRegister('mapSet1'));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.SET.USE.REGISTER',
					mapSetKey: 'mapSet1',
				},
			]);
		});
	});
});
