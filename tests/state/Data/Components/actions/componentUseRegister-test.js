import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/componentUseRegister', function () {
	it('Dispatch nothing when is component registered in state', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({
			data: {
				components: {
					components: {
						inUse: ['app-results-table'],
					},
				},
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'app-results-table';

		dispatch(actions.componentUseRegister(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('Dispatch register if component is not registered in the state', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({
			data: {
				components: {
					components: {
						inUse: ['map'],
					},
				},
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'app-results-table';

		dispatch(actions.componentUseRegister(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.USE.REGISTER',
					componentKey,
				},
			]);
		});
	});

	it('Dispatch register if component is not registered in the state _2', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({
			data: {
				components: {
					components: {
						inUse: [],
					},
				},
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'app-results-table';

		dispatch(actions.componentUseRegister(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.USE.REGISTER',
					componentKey,
				},
			]);
		});
	});
});
