import {assert} from 'chai';
import getStoreSet from '../../../../store';
import actions from '../../../../../src/state/Data/TimeSerie/actions';

describe('state/Data/TimeSerieRelations/actions/receiveIndexed', function () {
	it('Dispatch action with data', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const index = ['feature-id1', 'feature-id3', 'feature-id2', 'feature-id4'];
		const timeSerieData = [
			{
				key: '530c6982-af2a-4c2a-8fad-69c07f7d76e7',
				data: {
					timeSerieDataSourceKey1: {
						'feature-id1': [
							{
								period: '2021-01',
								value: 1,
							},
							{
								period: '2021-02',
								value: 'hehe',
							},
						],
						'feature-id2': [
							{
								period: '2021-10',
								value: 1,
							},
							{
								period: '2021-12',
								value: 'hehe',
							},
						],
					},
				},
			},
		];
		const data = {
			timeSerieData,
			index,
		};
		const timeSerieFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const start = 1;
		const total = 1;

		dispatch(
			actions.receiveIndexed(
				data,
				timeSerieFilter,
				order,
				start,
				total,
				changedOn
			)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.TIMESERIE.ADD_WITH_INDEX',
					filter: timeSerieFilter,
					order,
					total,
					start,
					index,
					data: timeSerieData,
					changedOn,
				},
			]);
		});
	});
});
