import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner, {extendStoreOnPath} from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch refreshUses.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				let action;
				// for common testing
				if (actionTypes && options) {
					action = actions.refreshUses(
						options.getSubstate,
						options.dataType,
						actionTypes,
						options.categoryPath
					);
				} else {
					action = actions.refreshUses;
				}

				return dispatch(action());
			};
		},
		getState: (dataType, store, storePath) => () => {
			const baseState = {
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
			};
			const storeState = {
				inUse: {
					keys: ['k1', 'k2'],
					indexes: [
						[
							{
								filter: {name: 'fil'},
								order: 'asc',
								start: 1,
								length: 3,
							},
						],
					],
				},
				byKey: {
					k1: {key: 'k1'},
					k2: {key: 'k2'},
				},
			};

			return extendStoreOnPath(baseState, storePath, storeState);
		},
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
			{type: 'INDEX.CLEAR_ALL'},
			{
				filter: {name: 'fil'},
				order: 'asc',
				count: 2,
				start: 1,
				data: {k1: {}, k2: {}},
				changedOn: '2020-01-01',
				type: 'INDEX.ADD',
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'refreshUses',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
