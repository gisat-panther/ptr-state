import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'Missing keys',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				let action;
				// for common testing
				if (actionTypes && options) {
					action = actions.delete(
						options.getSubstate,
						options.dataType,
						actionTypes,
						options.categoryPath
					);
				} else {
					action = actions.delete;
				}

				return dispatch(action({key: 'k1'}));
			};
		},
		getState: dataType => () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			[dataType]: {
				indexes: [
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 5,
						changedOn: '2020-01-01',
						index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
					},
				],
			},
		}),
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(`http://localhost/rest/${categoryPath}`, slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {[dataType]: [{key: 'k1'}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(JSON.parse(options.body));
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		},
		dispatchedActionsModificator: dispatchedActions => {
			return dispatchedActions.map(action => {
				if (action.type === 'MARK_DELETED') {
					// remove date from 'MARK_DLETED' action
					// date is add inside action and can not be controlled
					delete action.date;
				}
				return action;
			});
		},
		dispatchedActions: options => {
			return [
				{
					key: 'k1',
					type: 'MARK_DELETED',
				},
				{
					type: 'COMMON.EDITED.REMOVE_PROPERTY_VALUES',
					dataType: options.dataType,
					keys: ['k1'],
				},
			];
		},
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'delete',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
