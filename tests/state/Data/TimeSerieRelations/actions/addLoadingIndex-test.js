import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {createStore, combineReducers} from 'redux';
import actions from '../../../../../src/state/Data/TimeSerieRelations/actions';
import getStoreSet from '../../../../store';
import TimeSerieRelationsReducer, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/TimeSerieRelations/reducers';
describe('state/Data/TimeSerieRelations/actions/addLoadingIndex', function () {
	it('Dispatch action with LoadingIndex', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			data: combineReducers({
				timeSerieRelations: TimeSerieRelationsReducer,
			}),
		});

		const defaultState = {
			data: {
				timeSerieRelations: {
					...INITIAL_STATE,
				},
			},
		};

		const store = createStore(reducers, defaultState);
		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		const timeSerieFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const pagination = {
			offset: 0,
			limit: 1,
		};

		dispatch(actions.addLoadingIndex(pagination, timeSerieFilter, order));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
					filter: timeSerieFilter,
					order,
					data: [{key: true}],
					start: 1,
					count: null,
					changedOn,
				},
			]);
		});
	});

	it('Dispatch action with LoadingIndex with offset 100', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			data: combineReducers({
				timeSerieRelations: TimeSerieRelationsReducer,
			}),
		});

		const defaultState = {
			data: {
				timeSerieRelations: {
					...INITIAL_STATE,
				},
			},
		};

		const store = createStore(reducers, defaultState);
		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		const timeSerieFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const pagination = {
			offset: 100,
			limit: 5,
		};

		dispatch(actions.addLoadingIndex(pagination, timeSerieFilter, order));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
					filter: timeSerieFilter,
					order,
					data: [
						{key: true},
						{key: true},
						{key: true},
						{key: true},
						{key: true},
					],
					start: 101,
					count: null,
					changedOn,
				},
			]);
		});
	});
});
