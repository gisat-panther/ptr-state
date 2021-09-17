import {assert} from 'chai';
import getStoreSet from '../store';
import {resetFetch, setFetch} from '../../src/state/_common/request';
import {set as _set} from 'lodash';

/**
 * Returns empty state
 * @returns {Object}
 */
const defaultGetState = () => ({});

/**
 * Run set of actions tests in scope of parameters like store, dataType, categoryPath.
 * @param {String} dataType String identifier of store. It is also used in request url like `/rest/${categoryPath}/filtered/${dataType}`.
 * @param {String} categoryPath String name of category used in request url like `/rest/${categoryPath}/filtered/${dataType}`
 * @param {Array} tests Array of test suites.
 * @param {String} tests.name Name of test
 * @param {function} tests.action Self test action which get [actions, actionTypes, options] in parameters.
 *                                  - actions is set of actions in scope of store or commonActions
 *                                  - actionTypes is Object with types. Variable should be defined only for common actions.
 *                                  - options is Object with getSubstate, dataType, categoryPath
 * @param {Array|function} tests.dispatchedActions Array or function which returns array of dispatched actions which is compared with truly dispatched actions by test [action].
 * @param {Array|function} tests.dispatchedActionsModificator Optional function gets dispatchedActions as a parameter. Function needs to return array of actions. Could serve to modificetion of actions before comparing.
 * @param {function} tests.getState Function that returns function that returns predifined state for test.
 * @param {function} tests.setFetch Optional setter for fetch requests called with [dataType, categoryPath] parameters. SetFetch should return function that gets
 *                                     [url, options] for each request. That function can prepare mock response returned as a Promise.
 * @param {Object} actions Object of actions relating to the store or it could be set of common actions.
 * @param {Object} actionTypes Object of types. Used only for testing common actions, other stores related actions should pass null.
 * @param {function} dispatchedActionsModificator Function that is called before comparing dispatched actions by action and tests.dispatchedActions. Gets tests.dispatchedActions as a parameter and can modify them.
 *                                                Used in store related actions to add STORE prefix to the action types.
 * @param {string} storeName Name of the store used in actionTypes like [CASES, PLACES, ...]
 * @param {string} storePath Optional definition of where store is. Store path is by default same like dataType. Use this variable if store is nested. Path defined as a string. Particular substores are separated by [.] `[substore].[substore].[substore]`
 * @returns {function}
 */
const testBatchRunner = (
	dataType,
	categoryPath,
	tests,
	actions,
	actionTypes,
	dispatchedActionsModificator,
	storeName,
	storePath
) => () => {
	const storeHelpers = getStoreSet();

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
		resetFetch();
	});

	tests.forEach(test => {
		it(test.name, () => {
			const store =
				typeof test.getStore === 'function' ? test.getStore() : null;
			storePath = storePath || dataType;
			const getState =
				typeof test.getState === 'function'
					? test.getState(dataType, store, storePath)
					: defaultGetState;
			const dispatch = store
				? storeHelpers.getDispatch(getState, store.dispatch)
				: storeHelpers.getDispatch(getState);
			const options = {
				getSubstate: state => state[storePath],
				dataType,
				categoryPath,
			};

			if (test.setFetch) {
				setFetch(test.setFetch(dataType, categoryPath));
			}

			dispatch(test.action(actions, actionTypes, options));

			return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
				const expectedDispatchedActions =
					typeof test.dispatchedActions === 'function'
						? test.dispatchedActions(options)
						: test.dispatchedActions;
				// For debugging dispatchedActions
				// debugger
				assert.deepStrictEqual(
					typeof test.dispatchedActionsModificator === 'function'
						? test.dispatchedActionsModificator(
								storeHelpers.getDispatchedActions(),
								storeName
						  )
						: storeHelpers.getDispatchedActions(),
					typeof dispatchedActionsModificator === 'function'
						? dispatchedActionsModificator(expectedDispatchedActions)
						: expectedDispatchedActions
				);
			});
		});
	});
};

/**
 * Most used dispatchedActionsModificator that adds STORE name to dispatched action types.
 * @param {String} store
 * @returns {function}
 */
export const getDispatchedActionsModificator = store => dispatchedActions => {
	return dispatchedActions.map(action => ({
		...action,
		// Do not modify action.type, whe action starts with "ERROR" or "COMMON"
		type:
			action.type === 'ERROR' || action.type.split('.')[0] === 'COMMON'
				? action.type
				: `${store}.${action.type}`,
	}));
};

/**
 * Filter and flat tests by actionNames.
 * @param {Array} actionNames Array of test actions names
 * @param {Object} actionsTests Set of tests for actions
 * @returns Flat array of tests across all action tests.
 */
export const getTestsByActionName = (actionNames, actionsTests) => {
	return actionNames.reduce((acc, actionName) => {
		return [...acc, ...actionsTests[actionName]];
	}, []);
};

/**
 * Save substore on given path to the store object
 * @param {Object} store Store object which will be extendet
 * @param {String} path Path defined as a string. Particular substores are separated by [.] `[substore].[substore].[substore]`
 * @param {Object} subStore Object of store
 * @returns {Object}
 */
export const extendStoreOnPath = (store, path, subStore) => {
	return _set(store, path, subStore);
};

export default testBatchRunner;
