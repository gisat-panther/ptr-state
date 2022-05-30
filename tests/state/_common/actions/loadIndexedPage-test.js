import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatched loadIndexedPage.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				const action = actions.loadIndexedPage(
					options.dataType,
					{name: 'fil'},
					'asc',
					1,
					'2020-01-01',
					actionTypes,
					options.categoryPath
				);

				return dispatch(action);
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
			assert.strictEqual(
				`http://localhost/rest/${categoryPath}/filtered/${dataType}`,
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
				data: {[dataType]: {k1: {}, k2: {}}},
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
				type: 'INDEX.ADD',
				filter: {name: 'fil'},
				order: 'asc',
				count: 2,
				start: 1,
				data: {k1: {}, k2: {}},
				changedOn: '2020-01-01',
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'loadIndexedPage',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
