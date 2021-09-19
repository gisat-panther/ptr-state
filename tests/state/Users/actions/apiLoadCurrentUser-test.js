import {createStore, combineReducers} from 'redux';
import {assert} from 'chai';
import _ from 'lodash';
import slash from 'slash';
import actions from '../../../../src/state/Users/actions';
import AppReducers from '../../../../src/state/App/reducers';
import UsersReducers from '../../../../src/state/Users/reducers';
import testBatchRunner from '../../helpers';

const tests = [
	{
		name: 'Load current user',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				dispatch(actions.apiLoadCurrentUser());
			};
		},
		getState: (dataType, store) => () => {
			return store.getState();
		},
		getStore: () => {
			const reducers = combineReducers({
				app: AppReducers,
				users: UsersReducers,
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
				users: {},
			};

			return createStore(reducers, defaultState);
		},
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(
				'http://localhost/backend/api/login/getLoginInfo',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: null,
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'GET',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({
						key: 1,
						// Current BE does not support groups
						// groups: [{key: 1}, {key: 2}],
						data: {},
					});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
			});
		},
		dispatchedActions: [
			{
				type: 'USERS.CURRENT.REQUEST',
			},
			{
				key: 1,
				type: 'USERS.SET_ACTIVE_KEY',
			},
			{
				data: [
					{
						data: {},
						groups: [],
						key: 1,
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
			// {
			// 	data: [],
			// 	type: 'USERS.GROUPS.ADD',
			// },
		],
	},
];

const dataType = null;
const categoryPath = null;
const actionsTypes = null;
describe(
	'Users/apiLoadCurrentUser',
	testBatchRunner(dataType, categoryPath, tests, actions, actionsTypes)
);
