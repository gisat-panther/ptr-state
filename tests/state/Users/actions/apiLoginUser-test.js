import {createStore, combineReducers} from 'redux';
import {assert} from 'chai';
import _ from 'lodash';
import slash from 'slash';
import actions from '../../../../src/state/Users/actions';
import AppReducers from '../../../../src/state/App/reducers';
import UsersReducers from '../../../../src/state/Users/reducers';
import ScopesReducers from '../../../../src/state/Scopes/reducers';
import PlacesReducers from '../../../../src/state/Places/reducers';
import PeriodsReducers from '../../../../src/state/Periods/reducers';
import testBatchRunner from '../../helpers';

const tests = [
	{
		name: 'Login user',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				dispatch(actions.apiLoginUser('user@example.com', 'pwd'));
			};
		},
		getState: (dataType, store) => () => {
			return store.getState();
		},
		getStore: () => {
			const reducers = combineReducers({
				app: AppReducers,
				users: UsersReducers,
				scopes: ScopesReducers,
				places: PlacesReducers,
				periods: PeriodsReducers,
			});

			//default state includes loaded attribute relations
			const defaultState = {
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: 'backend',
						requestPageSize: 1,
					},
				},
				users: {inUse: {}, groups: {inUse: {}}},
				scopes: {inUse: {}},
				places: {inUse: {}},
				periods: {inUse: {}},
			};

			return createStore(reducers, defaultState);
		},
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.equal(
				true,
				['http://localhost/backend/api/login/login'].includes(slash(url))
			);

			if (
				_.isEqual(options, {
					body: JSON.stringify({
						username: 'user@example.com',
						password: 'pwd',
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve({
							data: {
								status: 'ok',
							},
						});
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
				});
			}

			if (
				_.isEqual(options, {
					body: null,
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'GET',
				})
			) {
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve({
							key: 1,
							groups: [{key: 1}, {key: 2}],
							data: {},
						});
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
				});
			}
		},
		dispatchedActions: [
			{
				type: 'USERS.LOGIN.REQUEST',
			},
			{
				type: 'COMMON.DATA.SET_OUTDATED',
			},
			// {
			// 	data: [],
			// 	type: 'USERS.GROUPS.ADD',
			// },
			{
				key: undefined,
				type: 'USERS.SET_ACTIVE_KEY',
			},
			{
				data: [
					{
						data: {
							status: 'ok',
						},
						groups: [],
						permissions: {
							guest: {
								get: false,
							},
						},
					},
				],
				filter: undefined,
				type: 'USERS.ADD',
			},
			{
				type: 'SCOPES.INDEX.CLEAR_ALL',
			},
			{
				type: 'PLACES.INDEX.CLEAR_ALL',
			},
			{
				type: 'PERIODS.INDEX.CLEAR_ALL',
			},
			{
				type: 'USERS.INDEX.CLEAR_ALL',
			},
			{
				type: 'USERS.GROUPS.INDEX.CLEAR_ALL',
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
const actionsTypes = null;

const before = () => {
	global.document = {cookie: {}};
};

const after = () => {
	delete global.document;
};

describe(
	'Users/apiLoginUser',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		actionsTypes,
		undefined,
		undefined,
		undefined,
		before,
		after
	)
);
