import {assert} from 'chai';
import {cloneDeep as _cloneDeep} from 'lodash';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../../store';
import MapsReducers from '../../../../src/state/Maps/reducers';
import {MapsSelectorsState as state} from '../selectors/_state';

describe('state/Maps/actions/setMapSetSync', function () {
	it('dispatch map set sync', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {..._cloneDeep(state.maps)},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		const sync = {center: true, boxRange: true};
		dispatch(actions.setMapSetSync('set1', sync));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'MAPS.SET.SET_SYNC',
					mapSetKey: 'set1',
					sync,
				},
			]);
		});
	});

	it('dispatch nothing, if map set does not exist', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {..._cloneDeep(state.maps)},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);
		dispatch(actions.setMapSetSync('setXY'));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});
});
