import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch make success request.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				const apiPath = 'rest/test';
				const method = 'POST';
				const query = null;
				const payload = {data: {views: {key11: {key: 'key11'}}}};
				const successAction = data => ({
					type: 'REQUEST.SUCCESS',
					data,
				});
				const errorAction = data => ({
					type: 'REQUEST.ERROR',
				});

				return actions.request(
					apiPath,
					method,
					query,
					payload,
					successAction,
					errorAction
				);
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
		}),
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(`http://localhost/rest/test`, slash(url));
			const body = {
				data: {data: {views: {key11: {key: 'key11'}}}},
				total: 1,
				changes: {
					[dataType]: '2020-01-01',
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
				type: 'REQUEST.SUCCESS',
				data: {data: {views: {key11: {key: 'key11'}}}},
			},
		],
	},
	{
		name: 'It dispatch error after failed request.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				const apiPath = 'rest/test';
				const method = 'POST';
				const query = null;
				const payload = {data: {views: {key11: {key: 'key11'}}}};
				const successAction = data => ({
					type: 'REQUEST.SUCCESS',
					data,
				});
				const errorAction = data => ({
					type: 'REQUEST.ERROR',
				});

				return actions.request(
					apiPath,
					method,
					query,
					payload,
					successAction,
					errorAction
				);
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
		}),
		setFetch: (dataType, categoryPath) => (url, options) => {
			return Promise.reject();
		},
		dispatchedActions: [
			{
				type: 'REQUEST.ERROR',
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'request',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
