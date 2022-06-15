import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';

describe('state/Data/Components/actions/addSetsFromView', function () {
	it('Dispatch addSetsFromView action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const sets = {
			analytics: {
				components: ['a'],
			},
		};

		dispatch(actions.addSetsFromView(sets));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.ADD_SETS',
					sets,
				},
			]);
		});
	});

	it('Dispatch nothing addSetsFromView action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const components = undefined;

		dispatch(actions.addSetsFromView(components));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});
});
