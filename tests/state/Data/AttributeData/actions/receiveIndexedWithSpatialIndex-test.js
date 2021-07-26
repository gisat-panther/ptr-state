import {assert} from 'chai';
import getStoreSet from '../../../../store';
import actions from '../../../../../src/state/Data/AttributeData/actions';

describe('state/Data/AttributeData/actions/receiveIndexedWithSpatialIndex', function () {
	it('Dispatch ADD_WITH_SPATIAL_INDEX one datasource', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
		};

		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
			},
		};

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const spatialIndexData = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);
		dispatch(
			actions.receiveIndexedWithSpatialIndex(
				attributeData,
				spatialIndexData,
				attributeDataFilter,
				order,
				changedOn
			)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_TILED_INDEX',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					data: {
						18502: '27',
					},
					filter: attributeDataFilter,
					order,
					indexData: [
						{
							7: {
								'0,1': {
									'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
								},
							},
						},
					],
					changedOn,
				},
			]);
		});
	});

	it('Dispatch ADD_WITH_SPATIAL_INDEX two datasourcea', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
			'848e2559-936d-4262-a808-4c87aa60217d': {
				data: {
					18503: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18503],
					},
				},
			},
		};

		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
			},
			'87560e4f-abb7-4d46-aa58-db23dba872a6': {
				18503: '30',
			},
		};

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const spatialIndexData = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);
		dispatch(
			actions.receiveIndexedWithSpatialIndex(
				attributeData,
				spatialIndexData,
				attributeDataFilter,
				order,
				changedOn
			)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_TILED_INDEX',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					data: {
						18502: '27',
					},
					filter: attributeDataFilter,
					order,
					indexData: [
						{
							7: {
								'0,1': {
									'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
									//FIXME - is it correct?
									'87560e4f-abb7-4d46-aa58-db23dba872a6': [18503],
								},
							},
						},
					],
					changedOn,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_TILED_INDEX',
					attributeDataSourceKey: '87560e4f-abb7-4d46-aa58-db23dba872a6',
					data: {
						18503: '30',
					},
					filter: attributeDataFilter,
					order,
					indexData: [
						{
							7: {
								'0,1': {
									//FIXME - is it correct?
									'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
									'87560e4f-abb7-4d46-aa58-db23dba872a6': [18503],
								},
							},
						},
					],
					changedOn,
				},
			]);
		});
	});

	it('RecieveIndexed with empty attribute data', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
			'848e2559-936d-4262-a808-4c87aa60217d': {
				data: {
					18503: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18503],
					},
				},
			},
		};

		const attributeData = {};

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const spatialIndexData = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);
		dispatch(
			actions.receiveIndexedWithSpatialIndex(
				attributeData,
				spatialIndexData,
				attributeDataFilter,
				order,
				changedOn
			)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
					filter: attributeDataFilter,
					order,
					indexData: [
						{
							7: {
								'0,1': {},
							},
						},
					],
					changedOn,
				},
			]);
		});
	});
});
