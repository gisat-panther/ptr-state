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
import AttributesReducers from '../../../../src/state/Attributes/reducers';
import testBatchRunner from '../../helpers';

const tests = [
	{
		name: 'useIndexedGroups',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				dispatch(
					actions.useIndexedGroups(
						{name: 'afil'},
						{name: 'fil'},
						'asc',
						1,
						5,
						'cid'
					)
				);
			};
		},
		getState: (dataType, store) => () => {
			return store.getState();
		},
		getStore: () => {
			const reducers = combineReducers({
				app: AppReducers,
				users: UsersReducers,
				attributes: AttributesReducers,
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
						requestPageSize: 100,
					},
				},
				users: {inUse: {}, groups: {inUse: {}}},
				attributes: {activeKey: 'k1'},
				scopes: {activeKey: 'k1'},
				periods: {activeKey: 'k1'},
				places: {activeKey: 'k1'},
			};

			return createStore(reducers, defaultState);
		},
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(
				'http://localhost/backend/rest/user/filtered/groups',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {name: 'fil'},
					offset: 0,
					order: 'asc',
					limit: 100,
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {groups: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					groups: '2020-01-01',
				},
			};

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(body);
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: JSON.stringify(body),
			});
		},
		dispatchedActions: [
			{
				componentId: 'cid',
				filterByActive: {name: 'afil'},
				filter: {name: 'fil'},
				order: 'asc',
				start: 1,
				length: 5,
				type: 'USERS.GROUPS.USE.INDEXED.REGISTER',
			},
			{
				filter: {name: 'fil'},
				order: 'asc',
				count: 2,
				start: 1,
				data: {k1: {}, k2: {}},
				changedOn: '2020-01-01',
				type: 'USERS.GROUPS.INDEX.ADD',
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
	'Users/useIndexedGroups',
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
