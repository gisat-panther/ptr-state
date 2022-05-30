import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeDataSources/actions';
import getStoreSet from '../../../../store';
describe('state/Data/SpatialDataSources/actions/add', function () {
	it('Dispatch add action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const filter = {appKey: 'testKey'};
		const data = [{11: 'Prague'}];
		dispatch(actions.add(data, filter));
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
					filter,
					data,
				},
			]);
		});
	});
});
