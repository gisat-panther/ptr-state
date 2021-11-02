import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {createStore, combineReducers} from 'redux';
import getStoreSet from '../../../../store';
import actions from '../../../../../src/state/Data/TimeSerie/actions';
import TimeSerieReducer from '../../../../../src/state/Data/TimeSerie/reducers';
describe('state/Data/TimeSerieRelations/actions/addLoadingIndex', function () {
	it('Dispatch action with LoadingIndex', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			data: combineReducers({
				timeSerie: TimeSerieReducer,
			}),
		});

		const defaultState = {
			data: {
				timeSerie: {
					timeSerieIndexes: [],
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
					type: 'DATA.TIMESERIE.INDEX.ADD',
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

	it('Dispatch action that set loading index for each tsDS in existing index.', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			data: combineReducers({
				timeSerie: TimeSerieReducer,
			}),
		});

		const defaultState = {
			data: {
				timeSerie: {
					timeSerieIndexes: [
						{
							order: null,
							changedOn: null,
							filter: {appKey: 'testKey'},
							index: {
								ds1: {
									featureKey1: {
										5: {period: '2020', value: 'apple'},
									},
								},
							},
						},
					],
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
					type: 'DATA.TIMESERIE.INDEX.ADD_FOR_EACH_DS',
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
				timeSerie: TimeSerieReducer,
			}),
		});

		const defaultState = {
			data: {
				timeSerie: {
					timeSerieIndexes: [],
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
					type: 'DATA.TIMESERIE.INDEX.ADD',
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
