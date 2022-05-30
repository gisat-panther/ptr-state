import {assert} from 'chai';
import actions from '../../../../../src/state/Data/SpatialDataSources/actions';
import getStoreSet from '../../../../store';
describe('state/Data/SpatialDataSources/actions/receiveIndexed', function () {
	it('receiveIndexed', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const spatialDataSources = [
			{
				key: '848e2559-936d-4262-a808-4c87aa60217d',
				data: {
					nameInternal: 'gadm36_deu_4',
					attribution: null,
					type: 'tiledVector',
					layerName: null,
					tableName: 'gadm36_DEU_4',
					fidColumnName: 'ogc_fid',
					geometryColumnName: 'geom',
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
				spatialDataSources,
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
					type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
					filter,
					data: spatialDataSources,
				},
				{
					type: 'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
					filter,
					order,
					count: total,
					start,
					data: spatialDataSources,
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

		const spatialDataSources = [];
		const filter = {appKey: 'testKey'};
		const order = null;
		const start = 1;
		const total = null;
		const changedOn = null;
		dispatch(
			actions.receiveIndexed(
				spatialDataSources,
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
					type: 'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
					filter,
					order,
					count: total,
					start,
					data: spatialDataSources,
					changedOn,
				},
			]);
		});
	});
});
