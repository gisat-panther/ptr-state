import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeRelations/actions';
import getStoreSet from '../../../../store';
describe('state/Data/AttributeRelations/actions', function () {
	it('updateStore', function () {
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
					type: 'DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE',
					data: storeData,
				},
			]);
		});
	});
});
