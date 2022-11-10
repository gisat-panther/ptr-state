import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/setFeatureKeys', function () {
	it('Dispatch setFeatureKeys action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'app-results-table';
		const featureKeys = ['aaa', 'bbb'];

		dispatch(actions.setFeatureKeys(componentKey, featureKeys));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
					componentKey,
					featureKeys,
				},
			]);
		});
	});

	it('Dispatch setFeatureKeys action _2', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = undefined;
		const featureKeys = undefined;

		dispatch(actions.setFeatureKeys(componentKey, featureKeys));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
					componentKey,
					featureKeys,
				},
			]);
		});
	});
});
