import {assert} from 'chai';
import slash from 'slash';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'Create index',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				let action;
				// for common testing
				if (actionTypes && options) {
					action = actions.create(
						options.getSubstate,
						options.dataType,
						actionTypes,
						options.categoryPath
					);
				} else {
					action = actions.create;
				}

				return dispatch(action('k1', 'ak'));
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
				indexes: [{filter: {applicationKey: 'ak'}}],
			},
		}),
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(`http://localhost/rest/${categoryPath}`, slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {[dataType]: [{key: 'k1', data: {applicationKey: 'ak'}}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
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
		dispatchedActions: options => {
			return [
				{
					type: 'ADD',
					filter: undefined,
					data: [
						{
							key: 'k1',
							data: {
								applicationKey: 'ak',
							},
						},
					],
				},
				{
					type: 'INDEX.CLEAR_INDEX',
					filter: {
						applicationKey: 'ak',
					},
					order: undefined,
				},
			];
		},
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'create',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
