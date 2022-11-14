import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/setAttributeOrder', function () {
	it('Dispatch setAttributeOrder action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'app-results-table';
		const attributeOrder = [['aaa', 'desc']];

		dispatch(actions.setAttributeOrder(componentKey, attributeOrder));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
					componentKey,
					attributeOrder,
				},
			]);
		});
	});

	it('Dispatch setAttributeOrder action _2', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = undefined;
		const attributeOrder = undefined;

		dispatch(actions.setAttributeOrder(componentKey, attributeOrder));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
					componentKey,
					attributeOrder,
				},
			]);
		});
	});
});
