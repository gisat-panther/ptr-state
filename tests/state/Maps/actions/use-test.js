import {assert} from 'chai';
import slash from 'slash';
import {isEqual as _isEqual, cloneDeep as _cloneDeep} from 'lodash';
import {createStore, combineReducers} from 'redux';
import {setState} from '@jvitela/recompute';
import actions from '../../../../src/state/Maps/actions';
import getStoreSet from '../../_common/helpers/store';
import {MapsSelectorsState} from '../selectors/_state';

import {resetFetch, setFetch} from '../../../../src/state/_common/request';
import MapsReducers from '../../../../src/state/Maps/reducers';
import AttributeDataReducer from '../../../../src/state/Data/AttributeData/reducers';
import AttributeRelationsReducer from '../../../../src/state/Data/AttributeRelations/reducers';
import AttributeDataSourcesReducer from '../../../../src/state/Data/AttributeDataSources/reducers';
import SpatialDataReducer from '../../../../src/state/Data/SpatialData/reducers';
import SpatialRelationsReducer from '../../../../src/state/Data/SpatialRelations/reducers';
import SpatialDataSourcesReducer from '../../../../src/state/Data/SpatialDataSources/reducers';
import StylesReducer from '../../../../src/state/Styles/reducers';
import AppReducers from '../../../../src/state/App/reducers';

import {responseWithRelationsSpatialAndAttributeData_1} from './mockData/data_2';
import {dispatchedActions} from './mockData/dispatched_actions_1';

describe('state/Maps/actions/use', function () {
	this.timeout(1000);
	afterEach(function () {
		resetFetch();
	});

	it('Load one tile for each layer in map/set state', function (done) {
		const storeHelpers = getStoreSet();
		const reducers = combineReducers({
			app: AppReducers,
			data: combineReducers({
				attributeData: AttributeDataReducer,
				attributeRelations: AttributeRelationsReducer,
				attributeDataSources: AttributeDataSourcesReducer,
				spatialData: SpatialDataReducer,
				spatialRelations: SpatialRelationsReducer,
				spatialDataSources: SpatialDataSourcesReducer,
			}),
			maps: MapsReducers,
			styles: StylesReducer,
		});
		const mapsState = _cloneDeep(MapsSelectorsState);
		const defaultState = {
			app: {
				key: 'testApp',
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 1,
				},
			},
			maps: {
				...mapsState.maps,
				...{
					inUse: {maps: []},
					maps: {
						...mapsState.maps.maps,
						map1: {
							...mapsState.maps.maps.map1,
							data: {
								...mapsState.maps.maps.map1.data,
								viewport: {
									width: 10,
									height: 10,
								},
								view: {
									boxRange: 5000,
									center: {
										lat: 0.1,
										lon: 0.1,
									},
								},
							},
						},
					},
					sets: {
						...mapsState.maps.sets,
						set1: {
							...mapsState.maps.sets.set1,
							data: {
								...mapsState.maps.sets.set1.data,
								view: {
									center: {
										lat: 0.1,
										lon: 0.1,
									},
								},
							},
						},
					},
				},
			},
			data: {
				attributeData: {
					indexes: [],
					byDataSourceKey: {},
				},
				attributeRelations: {
					indexes: [],
				},
				attributeDataSources: {
					indexes: [],
				},
				spatialData: {
					indexes: [],
					byDataSourceKey: {},
				},
				spatialRelations: {
					indexes: [],
				},
				spatialDataSources: {
					indexes: [],
				},
			},
			styles: {
				indexes: [],
				inUse: {
					keys: [],
				},
			},
		};

		const store = createStore(reducers, defaultState);

		setState(store.getState());
		const getState = () => {
			return store.getState();
		};
		const dispatch = storeHelpers.getDispatch(getState, store.dispatch);

		setFetch(function (url, options) {
			if (
				_isEqual(options, {
					body: JSON.stringify({
						filter: {
							key: {
								in: ['style1'],
							},
						},
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				assert.strictEqual(
					'http://localhost/backend/rest/metadata/filtered/styles',
					slash(url)
				);
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve({
							data: {
								styles: [
									{
										key: 'styleKey1',
										data: {
											nameDisplay: null,
											nameInternal: null,
											description: null,
											source: null,
											nameGeoserver: null,
											definition: {
												rules: [
													{
														styles: [
															{
																attributeKey:
																	'528ac373-b82f-44cb-a883-4f3ef5b13d07',
															},
														],
													},
												],
											},
											applicationKey: null,
											tagKeys: null,
										},
									},
								],
							},
						});
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
			if (
				_isEqual(options, {
					body: JSON.stringify({
						layerTemplateKey: 'layerTemplateBackground',
						relations: {
							offset: 0,
							limit: 1,
							attribute: true,
							spatial: true,
						},
						data: {
							spatialFilter: {
								tiles: [['0', '0']],
								level: 7,
							},
							geometry: true,
						},
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				assert.strictEqual(
					'http://localhost/backend/rest/data/filtered',
					slash(url)
				);
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(
							responseWithRelationsSpatialAndAttributeData_1
						);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
			if (
				_isEqual(options, {
					body: JSON.stringify({
						modifiers: {
							scopeKey: 'scope1',
							periodKey: 'period1',
						},
						layerTemplateKey: 'layerTemplate2',
						relations: {
							offset: 0,
							limit: 1,
							attribute: true,
							spatial: true,
						},
						data: {
							spatialFilter: {
								tiles: [['0', '0']],
								level: 7,
							},
							geometry: true,
						},
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				assert.strictEqual(
					'http://localhost/backend/rest/data/filtered',
					slash(url)
				);
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(
							responseWithRelationsSpatialAndAttributeData_1
						);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
			if (
				_isEqual(options, {
					body: JSON.stringify({
						modifiers: {
							scopeKey: 'scope1',
							placeKey: 'place1',
							scenarioKey: {
								in: ['scenario1', 'scenario2'],
							},
						},
						layerTemplateKey: 'layerTemplate1',
						styleKey: 'style1',
						relations: {
							offset: 0,
							limit: 1,
							attribute: true,
							spatial: true,
						},
						data: {
							spatialFilter: {
								tiles: [['0', '0']],
								level: 7,
							},
							geometry: true,
						},
					}),
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			) {
				assert.strictEqual(
					'http://localhost/backend/rest/data/filtered',
					slash(url)
				);
				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve(
							responseWithRelationsSpatialAndAttributeData_1
						);
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
					data: options.body,
				});
			}
		});

		dispatch(actions.use('map1', null, null));
		setTimeout(() => {
			storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
				if (_isEqual(storeHelpers.getDispatchedActions(), dispatchedActions)) {
					done();
				} else {
					done(new Error());
				}
			});
		}, 50);
	});
});
