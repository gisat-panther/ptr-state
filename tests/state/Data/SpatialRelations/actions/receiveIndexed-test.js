import {assert} from 'chai';
import actions from '../../../../../src/state/Data/SpatialRelations/actions';
import getStoreSet from '../../../../store';
describe('state/Data/SpatialRelations/actions/receiveIndexed', function () {
	it('receiveIndexed', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const spatialRelations = [
			{
				key: '8b0e266c-40d4-4bfe-ad75-964d9af1f57f',
				data: {
					scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
					periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
					placeKey: '9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
					spatialDataSourceKey: '848e2559-936d-4262-a808-4c87aa60217d',
					layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
					scenarioKey: null,
					caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
					applicationKey: null,
				},
			},
		];
		const filter = {appKey: 'testKey'};
		const order = null;
		const start = 1;
		const total = null;
		const changedOn = null;
		dispatch(
			actions.receiveIndexed(
				spatialRelations,
				filter,
				order,
				start,
				total,
				changedOn
			)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.SPATIAL_RELATIONS.ADD',
					filter,
					data: spatialRelations,
				},
				{
					type: 'DATA.SPATIAL_RELATIONS.INDEX.ADD',
					filter,
					order,
					count: total,
					start,
					data: spatialRelations,
					changedOn,
				},
			]);
		});
	});

	it('receiveIndexed empty', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const spatialRelations = [];
		const filter = {appKey: 'testKey'};
		const order = null;
		const start = 1;
		const total = null;
		const changedOn = null;
		dispatch(
			actions.receiveIndexed(
				spatialRelations,
				filter,
				order,
				start,
				total,
				changedOn
			)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.SPATIAL_RELATIONS.INDEX.ADD',
					filter,
					order,
					count: total,
					start,
					data: spatialRelations,
					changedOn,
				},
			]);
		});
	});
});
