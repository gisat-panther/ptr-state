import {assert} from 'chai';
import getStoreSet from '../../../../store';
import actions from '../../../../../src/state/Data/TimeSerieRelations/actions';

describe('state/Daa/TimeSerieRelations/actions/receiveIndexed', function () {
	it('Dispatch action with data', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const timeSerieRelationsData = [
			{
				key: '530c6982-af2a-4c2a-8fad-69c07f7d76e7',
				data: {
					scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
					periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
					placeKey: '8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
					attributeDataSourceKey: '55f48ed1-ee67-47bd-a044-8985662ec29f',
					layerTemplateKey: '758b72dd-76a8-4792-8e9f-bbf13784e992',
					scenarioKey: null,
					caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
					attributeSetKey: null,
					attributeKey: '528ac373-b82f-44cb-a883-4f3ef5b13d07',
					areaTreeLevelKey: null,
					applicationKey: null,
				},
			},
		];

		const timeSerieFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const start = 1;
		const total = 1;
		const limit = 1;

		dispatch(
			actions.receiveIndexed(
				timeSerieRelationsData,
				timeSerieFilter,
				order,
				start,
				total,
				changedOn
				// limit,
			)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.TIMESERIE_RELATIONS.ADD',
					filter: timeSerieFilter,
					data: timeSerieRelationsData,
				},
				{
					type: 'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
					filter: timeSerieFilter,
					order,
					count: total,
					start,
					data: timeSerieRelationsData,
					changedOn,
				},
			]);
		});
	});
});
