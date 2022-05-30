import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeDataSources/actions';
import getStoreSet from '../../../../store';
describe('state/Data/AttributeDataSources/actions/receiveIndexed', function () {
	it('receiveIndexed', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const attributeDataSources = [
			{
				key: '55f48ed1-ee67-47bd-a044-8985662ec29f',
				data: {
					nameInternal: 'gadm36_fra_4#num4',
					attribution: null,
					tableName: 'gadm36_FRA_4',
					columnName: 'num4',
					fidColumnName: 'ogc_fid',
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
				attributeDataSources,
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
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
					filter,
					data: attributeDataSources,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.INDEX.ADD',
					filter,
					order,
					count: total,
					start,
					data: attributeDataSources,
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

		const attributeDataSources = [];
		const filter = {appKey: 'testKey'};
		const order = null;
		const start = 1;
		const total = null;
		const changedOn = null;
		dispatch(
			actions.receiveIndexed(
				attributeDataSources,
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
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.INDEX.ADD',
					filter,
					order,
					count: total,
					start,
					data: attributeDataSources,
					changedOn,
				},
			]);
		});
	});
});
