import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {createStore, combineReducers} from 'redux';
import _ from 'lodash';
import slash from 'slash';
import actions from '../../../../../src/state/Data/Components/timeSerieActions';
import {resetFetch, setFetch} from '../../../../../src/state/_common/request';
import getStoreSet from '../../../../store';

import ComponentsReducer from '../../../../../src/state/Data/Components/reducers';
import TimeSerieRelationsReducer from '../../../../../src/state/Data/TimeSerieRelations/reducers';
import TimeSerieReducer from '../../../../../src/state/Data/TimeSerie/reducers';
import AppReducers from '../../../../../src/state/App/reducers';

import {first} from './mockData/_1';
import {inTwoFirst, inTwoSecond} from './mockData/_2';

describe('state/Data/Components/timeSerieActions/ensure', function () {
	afterEach(function () {
		resetFetch();
	});

	it('dispatch actions for load data and relations in one request', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			app: AppReducers,
			data: combineReducers({
				components: ComponentsReducer,
				timeSerieRelations: TimeSerieRelationsReducer,
				timeSerie: TimeSerieReducer,
			}),
		});

		const defaultState = {
			app: {
				key: 'testKey',
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 2,
				},
			},
			data: {
				components: {
					components: {
						byKey: {
							table: {
								// start: 0
								type: 'timeSerie',
								filterByActive: {
									application: true,
								},
							},
						},
					},
				},
				timeSerie: {
					indexes: [],
				},
				timeSerieRelations: {
					indexes: [],
				},
			},
		};

		const store = createStore(reducers, defaultState);
		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/timeSeries/filtered',
				slash(url)
			);
			if (
				_.isEqual(JSON.parse(options.body), {
					modifiers: {applicationKey: 'testKey'},
					relations: {
						offset: 0,
						limit: 2,
					},
					data: {
						offset: 0,
						limit: 2,
						orderPeriods: null,
					},
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(first);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
		});

		const componentKey = 'table';
		dispatch(actions.ensure(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					data: [
						{
							key: true,
						},
						{
							key: true,
						},
					],
					start: 1,
					count: null,
					changedOn: null,
				},
				{
					type: 'DATA.TIMESERIE.INDEX.ADD',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					data: [
						{
							key: true,
						},
						{
							key: true,
						},
					],
					start: 1,
					count: null,
					changedOn: null,
				},
				{
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								timeSerieKey: 'timeSerieDataSourceKey1',
								applicationKey: 'testKey',
							},
						},
					],
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					type: 'DATA.TIMESERIE_RELATIONS.ADD',
				},
				{
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					count: 1,
					start: 1,
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								timeSerieKey: 'timeSerieDataSourceKey1',
								applicationKey: 'testKey',
							},
						},
					],
					changedOn: null,
					limit: 2,
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
				},
				{
					type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					total: 2,
					start: 1,
					index: ['feature-id1', 'feature-id2'],
					data: {
						timeSerieDataSourceKey1: {
							'feature-id1': [
								{
									period: '2021-01',
									value: 1,
								},
								{
									period: '2021-02',
									value: 4,
								},
							],
							'feature-id2': [
								{
									period: '2021-10',
									value: 1.2,
								},
								{
									period: '2021-12',
									value: 4,
								},
							],
						},
					},
					changedOn: null,
				},
			]);
		});
	});

	it('dispatch actions for load data and relations in two request', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			app: AppReducers,
			data: combineReducers({
				components: ComponentsReducer,
				timeSerieRelations: TimeSerieRelationsReducer,
				timeSerie: TimeSerieReducer,
			}),
		});

		const defaultState = {
			app: {
				key: 'testKey',
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 1,
				},
			},
			data: {
				components: {
					components: {
						byKey: {
							table: {
								// start: 0
								type: 'timeSerie',
								filterByActive: {
									application: true,
								},
							},
						},
					},
				},
				timeSerie: {
					indexes: [],
				},
				timeSerieRelations: {
					indexes: [],
				},
			},
		};

		const store = createStore(reducers, defaultState);
		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/timeSeries/filtered',
				slash(url)
			);
			if (
				_.isEqual(JSON.parse(options.body), {
					modifiers: {applicationKey: 'testKey'},
					relations: {
						offset: 0,
						limit: 1,
					},
					data: {
						offset: 0,
						limit: 1,
						orderPeriods: null,
					},
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(inTwoFirst);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
			if (
				_.isEqual(JSON.parse(options.body), {
					modifiers: {applicationKey: 'testKey'},
					relations: {
						offset: 1,
						limit: 1,
					},
					data: {
						offset: 1,
						limit: 1,
						orderPeriods: null,
					},
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(inTwoSecond);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
		});

		const componentKey = 'table';

		dispatch(actions.ensure(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					data: [
						{
							key: true,
						},
					],
					start: 1,
					count: null,
					changedOn: null,
				},
				{
					type: 'DATA.TIMESERIE.INDEX.ADD',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					data: [
						{
							key: true,
						},
					],
					start: 1,
					count: null,
					changedOn: null,
				},
				{
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								timeSerieKey: 'timeSerieDataSourceKey1',
								applicationKey: 'testKey',
							},
						},
					],
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					type: 'DATA.TIMESERIE_RELATIONS.ADD',
				},
				{
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					count: 2,
					start: 1,
					data: [
						{
							key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								timeSerieKey: 'timeSerieDataSourceKey1',
								applicationKey: 'testKey',
							},
						},
					],
					changedOn: null,
					limit: 1,
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
				},
				{
					type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					total: 2,
					start: 1,
					index: ['feature-id1', 'feature-id3'],
					data: {
						timeSerieDataSourceKey1: {
							'feature-id1': [
								{
									period: '2021-01',
									value: 1,
								},
								{
									period: '2021-02',
									value: 4,
								},
							],
						},
						timeSerieDataSourceKey2: {
							'feature-id3': [
								{
									period: '2021-01',
									value: 'apple',
								},
								{
									period: '2021-02',
									value: 'orange',
								},
							],
						},
					},
					changedOn: null,
				},
				{
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					data: [
						{
							key: true,
						},
					],
					start: 2,
					count: null,
					changedOn: null,
				},
				{
					type: 'DATA.TIMESERIE.INDEX.ADD',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					data: [
						{
							key: true,
						},
					],
					start: 2,
					count: null,
					changedOn: null,
				},
				{
					data: [
						{
							key: '333e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								timeSerieKey: 'timeSerieDataSourceKey2',
								applicationKey: 'testKey',
							},
						},
					],
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					type: 'DATA.TIMESERIE_RELATIONS.ADD',
				},
				{
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					count: 2,
					start: 2,
					data: [
						{
							key: '333e266c-40d4-4bfe-ad75-964d9af1f57f',
							data: {
								timeSerieKey: 'timeSerieDataSourceKey2',
								applicationKey: 'testKey',
							},
						},
					],
					changedOn: null,
					limit: 1,
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
				},
				{
					type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
					filter: {
						modifiers: {
							applicationKey: 'testKey',
						},
					},
					order: null,
					total: 2,
					start: 2,
					index: ['feature-id2', 'feature-id4'],
					data: {
						timeSerieDataSourceKey1: {
							'feature-id2': [
								{
									period: '2021-01',
									value: 10,
								},
								{
									period: '2021-02',
									value: 40,
								},
							],
						},
						timeSerieDataSourceKey2: {
							'feature-id4': [
								{
									period: '2021-01',
									value: 'orange',
								},
								{
									period: '2021-02',
									value: 'melone',
								},
							],
						},
					},
					changedOn: null,
				},
			]);
		});
	});
});
