import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../../store';
import {cloneDeep as _cloneDeep} from 'lodash';

describe('state/Data/Components/actions/updateComponent', function () {
	it('Dispatch updateComponent action', function () {
		const storeHelpers = getStoreSet();

		const components = {
			components: {
				byKey: {
					table: {
						selected: 11,
					},
					map: {
						hidden: true,
					},
				},
			},
		};

		const getState = () => ({
			data: {
				components,
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'table';
		const update = {
			selected: 22,
			order: 'desc',
		};

		dispatch(actions.updateComponent(componentKey, update));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.ADD_COMPONENTS',
					components: {
						table: {
							selected: 22,
							order: 'desc',
						},
					},
				},
			]);
		});
	});

	it('Dispatch updateComponent action _2', function () {
		const storeHelpers = getStoreSet();

		const components = {
			components: {
				byKey: {
					table: {
						selected: 11,
						somethingDeeper: {
							soDeep: true,
							nested: {
								isNested: true,
							},
						},
					},
					map: {
						hidden: true,
					},
				},
			},
		};

		const getState = () => ({
			data: {
				components,
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'table';
		const update = {
			selected: 22,
			order: 'desc',
			somethingDeeper: {
				nested: {
					isNested: false,
				},
			},
		};

		dispatch(actions.updateComponent(componentKey, update));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.ADD_COMPONENTS',
					components: {
						table: {
							selected: 22,
							order: 'desc',
							somethingDeeper: {
								soDeep: true,
								nested: {
									isNested: false,
								},
							},
						},
					},
				},
			]);
		});
	});

	it('Dispatch updateComponent action even if component is not in state yet', function () {
		const storeHelpers = getStoreSet();

		const components = {
			components: {
				byKey: {
					map: {
						hidden: true,
					},
				},
			},
		};

		const getState = () => ({
			data: {
				components,
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'table';
		const update = {
			selected: 22,
			order: 'desc',
		};

		dispatch(actions.updateComponent(componentKey, update));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.ADD_COMPONENTS',
					components: {
						table: {
							selected: 22,
							order: 'desc',
						},
					},
				},
			]);
		});
	});

	it('Dispatch updateComponent action will not mutate original component state.', function () {
		const storeHelpers = getStoreSet();

		const components = {
			components: {
				byKey: {
					table: {
						selected: 11,
					},
					map: {
						hidden: true,
					},
				},
			},
		};

		const originalComponents = _cloneDeep(components);

		const getState = () => ({
			data: {
				components,
			},
		});
		const dispatch = storeHelpers.getDispatch(getState);

		const componentKey = 'table';
		const update = {
			selected: 22,
			order: 'desc',
		};

		dispatch(actions.updateComponent(componentKey, update));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(originalComponents, components);
		});
	});
});
