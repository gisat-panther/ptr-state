import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/setAttributeKeys', function () {
	it('Dispatch setAttributeKeys action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'app-results-table';
		const attributeKeys = ['aaa', 'bbb'];

		dispatch(actions.setAttributeKeys(componentKey, attributeKeys));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
					componentKey,
					attributeKeys,
				},
			]);
		});
	});

	it('Dispatch setAttributeKeys action _2', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = undefined;
		const attributeKeys = undefined;

		dispatch(actions.setAttributeKeys(componentKey, attributeKeys));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
					componentKey,
					attributeKeys,
				},
			]);
		});
	});
});
