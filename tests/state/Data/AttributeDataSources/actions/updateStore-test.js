import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeDataSources/actions';
import getStoreSet from '../../../../store';
describe('state/Data/AttributeDataSources/actions/updateStore', function () {
	it('Dispatch updateStore action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const storeData = {indexes: [], byKey: 'key'};
		dispatch(actions.updateStore(storeData));
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE',
					data: storeData,
				},
			]);
		});
	});
});
