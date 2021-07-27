import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('updateMapView-test', function () {
	it('Should update map view', function () {
		const update = {
			center: {
				lon: 10,
				lat: 10,
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map2: {
					...state.maps.map2,
					data: {
						...state.maps.map2.data,
						view: {
							...state.maps.map2.data.view,
							...update,
						},
						previousView: {
							boxRange: 1000,
						},
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.VIEW.UPDATE',
			mapKey: 'map2',
			update,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should create map view, if does not exist for given map', function () {
		const update = {
			center: {
				lon: 10,
				lat: 10,
			},
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						view: update,
						previousView: null,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.VIEW.UPDATE',
			mapKey: 'map1',
			update,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no update given', function () {
		const action = {
			type: 'MAPS.MAP.VIEW.UPDATE',
			mapKey: 'map1',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
