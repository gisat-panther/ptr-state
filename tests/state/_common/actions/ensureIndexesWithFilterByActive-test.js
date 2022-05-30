import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';
import _ from 'lodash';

const tests = [
	{
		name: 'Ensure missing data by active.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				const action = actions.ensureIndexesWithFilterByActive(
					options.getSubstate,
					options.dataType,
					actionTypes,
					options.categoryPath
				);

				const filterByActive = {
					place: true,
				};
				return dispatch(action(filterByActive));
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
				inUse: {
					indexes: {
						ComponentA: [
							{
								filter: {
									scopeKey: 'scope1',
								},
								filterByActive: {
									place: true,
								},
								order: null,
								start: 1,
								length: 10,
							},
						],
						ComponentB: [
							{
								filter: {
									scopeKey: 'scope1',
								},
								filterByActive: {
									place: true,
								},
								order: null,
								start: 3,
								length: 7,
							},
						],
						ComponentE: [
							{
								filter: {
									scopeKey: 'scope2',
								},
								order: null,
								start: 1,
								length: 5,
							},
						],
					},
				},
			},
		}),
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(
				`http://localhost/rest/${categoryPath}/filtered/${dataType}`,
				slash(url)
			);

			if (
				_.isEqual(options, {
					body: JSON.stringify({
						filter: {
							scopeKey: 'scope1',
						},
						offset: 0,
						order: null,
						limit: 100,
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				const body = {
					data: {[dataType]: {k3: {}, k4: {}}},
					total: 5,
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
			}
		},
		dispatchedActions: [
			{
				type: 'INDEX.ADD',
				filter: {
					scopeKey: 'scope1',
				},
				order: null,
				start: 1,
				data: {k3: {}, k4: {}},
				changedOn: '2020-01-01',
				count: 5,
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'ensureIndexesWithFilterByActive',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
