import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/componentUseClear', function () {
	it('Dispatch clearComponent when is component registered in state', function () {
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

		dispatch(actions.componentUseClear(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.COMPONENT.USE.CLEAR',
					componentKey,
				},
			]);
		});
	});

	it('Dispatch nothing if component is not registered in the state', function () {
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

		dispatch(actions.componentUseClear(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('Dispatch nothing if component is not registered in the state _2', function () {
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

		dispatch(actions.componentUseClear(componentKey));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});
});
