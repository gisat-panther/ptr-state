import {createStore, combineReducers} from 'redux';
import _ from 'lodash';
import actions from '../../../../src/state/Users/actions';
import AppReducers from '../../../../src/state/App/reducers';
import UsersReducers from '../../../../src/state/Users/reducers';
import testBatchRunner from '../../helpers';

const tests = [
	{
		name: 'useIndexedUsersClear',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				dispatch(actions.useIndexedUsersClear('cid'));
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
						requestPageSize: 100,
					},
				},
				users: {inUse: {}, groups: {inUse: {}}},
			};

			return createStore(reducers, defaultState);
		},
		dispatchedActions: [
			{
				componentId: 'cid',
				type: 'USERS.USE.INDEXED.CLEAR',
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
const actionsTypes = null;

describe(
	'Users/useIndexedUsersClear',
	testBatchRunner(dataType, categoryPath, tests, actions, actionsTypes)
);
