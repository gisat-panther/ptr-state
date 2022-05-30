import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "USE.KEYS.CLEAR".',
		action: (actions, actionTypes, options) => {
			// for common testing
			if (actionTypes && options) {
				const editedData = [{key: 'k1', data: {prop: 'val'}}];

				return actions.apiUpdate(
					options.getSubstate,
					options.dataType,
					actionTypes,
					options.categoryPath,
					editedData
				);
			} else {
				return null;
			}
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
				byKey: {k1: {key: 'k1'}},
				editedByKey: {k1: {key: 'k1', data: {prop: 'val'}}},
			},
		}),
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(`http://localhost/rest/${categoryPath}`, slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {[dataType]: [{key: 'k1', data: {prop: 'val'}}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			});

			const body = {
				data: {[dataType]: [{key: 'k1', data: {prop: 'val'}}]},
				total: 2,
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
				type: 'ADD',
				data: [{key: 'k1', data: {prop: 'val'}}],
				filter: undefined,
			},
			{
				type: 'EDITED.REMOVE_PROPERTY',
				key: 'k1',
				property: 'prop',
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'apiUpdate',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
