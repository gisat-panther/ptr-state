import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../../src/state/App/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'loadConfiguration',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				return actions.loadConfiguration();
			};
		},
		getState: (dataType, store, storePath) => () => {
			return {
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
			};
		},
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(
				'http://localhost/rest/application/filtered/configurations',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {configurations: [{key: 'k1', data: {data: {p1: 'v1'}}}]},
				total: 1,
				changes: {
					configurations: '2020-01-01',
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
				type: 'APP.RECEIVE_CONFIGURATION',
				configuration: {p1: 'v1'},
			},
		],
	},
];

const dataType = null;
const categoryPath = null;
describe(
	'state/App/actions/loadConfiguration',
	testBatchRunner(dataType, categoryPath, tests, actions, actionTypes)
);

export default tests;
