import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/addComponentsFromView', function () {
	it('Dispatch addComponentsFromView action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const components = {
			chart: {
				theme: 'red',
			},
		};

		dispatch(actions.addComponentsFromView(components));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.ADD_COMPONENTS',
					components,
				},
			]);
		});
	});

	it('Dispatch nothing addComponentsFromView action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const components = undefined;

		dispatch(actions.addComponentsFromView(components));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});
});
