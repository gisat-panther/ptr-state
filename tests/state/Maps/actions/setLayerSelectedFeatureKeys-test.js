import {assert} from 'chai';
import {cloneDeep as _cloneDeep} from 'lodash';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../../store';
import MapsReducers from '../../../../src/state/Maps/reducers';
import SelectionsReducers from '../../../../src/state/Selections/reducers';
import {MapsSelectorsState as mapsState} from '../selectors/_state';

describe('state/Maps/actions/setLayerSelectedFeatureKeys', function () {
	it('dispatch nothing if layer is not selecteble', function () {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
		});

		const defaultState = {
			maps: {..._cloneDeep(mapsState.maps)},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		const selectedFeatureKeys = [1, 2, 3];
		dispatch(
			actions.setLayerSelectedFeatureKeys('map1', 'layer1', selectedFeatureKeys)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('dispatch nothing, cause no features in layer are selected', function () {
		// todo - add active selection
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
			selections: SelectionsReducers,
		});

		const defaultState = {
			selections: {
				activeKey: [],
			},
			maps: {
				...mapsState.maps,
				...{
					maps: {
						...mapsState.maps.maps,
						map1: {
							...mapsState.maps.maps.map1,
							data: {
								...mapsState.maps.maps.map1.data,
								layers: [
									...mapsState.maps.maps.map1.data.layers,
									{
										key: 'layer4',
										name: 'Layer 4',
										layerTemplateKey: 'layerTemplate1',
										styleKey: 'style1',
										metadataModifiers: {
											placeKey: 'place1',
											scenarioKeys: ['scenario1', 'scenario2'],
										},
										filterByActive: {
											place: true,
											layerTemplateKey: true,
											applicationKey: true,
										},
										options: {
											selectable: true,
										},
									},
								],
							},
						},
					},
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		const selectedFeatureKeys = [1, 2, 3];
		dispatch(
			actions.setLayerSelectedFeatureKeys('map1', 'layer4', selectedFeatureKeys)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('dispatch add selected features', function () {
		// todo - add active selection
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			maps: MapsReducers,
			selections: SelectionsReducers,
		});

		const defaultState = {
			selections: {
				activeKey: '1',
				byKey: {
					1: {
						data: {
							featureKeysFilter: {},
						},
					},
				},
			},
			maps: {
				...mapsState.maps,
				...{
					maps: {
						...mapsState.maps.maps,
						map1: {
							...mapsState.maps.maps.map1,
							data: {
								...mapsState.maps.maps.map1.data,
								layers: [
									...mapsState.maps.maps.map1.data.layers,
									{
										key: 'layer4',
										name: 'Layer 4',
										layerTemplateKey: 'layerTemplate1',
										styleKey: 'style1',
										metadataModifiers: {
											placeKey: 'place1',
											scenarioKeys: ['scenario1', 'scenario2'],
										},
										filterByActive: {
											place: true,
											layerTemplateKey: true,
											applicationKey: true,
										},
										options: {
											selectable: true,
											selected: {
												1: true,
												2: true,
											},
										},
									},
								],
							},
						},
					},
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		const selectedFeatureKeys = [1, 2, 3];
		dispatch(
			actions.setLayerSelectedFeatureKeys('map1', 'layer4', selectedFeatureKeys)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS',
					key: '1',
					featureKeys: [1, 2, 3],
				},
			]);
		});
	});
});
