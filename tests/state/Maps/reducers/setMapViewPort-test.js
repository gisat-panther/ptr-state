import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setMapViewport-test', function () {
	it('Should set map viewport', function () {
		const viewport = {
			width: 50,
			height: 50,
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						viewport,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.VIEWPORT.SET',
			mapKey: 'map1',
			width: viewport.width,
			height: viewport.height,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set map viewport, even if no data prop exist', function () {
		const viewport = {
			width: 50,
			height: 50,
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map11: {
					...state.maps.map11,
					data: {
						viewport,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.VIEWPORT.SET',
			mapKey: 'map11',
			width: viewport.width,
			height: viewport.height,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no map key given', function () {
		const viewport = {
			width: 50,
			height: 50,
		};

		const action = {
			type: 'MAPS.MAP.VIEWPORT.SET',
			width: viewport.width,
			height: viewport.height,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no viewport given', function () {
		const action = {
			type: 'MAPS.MAP.VIEWPORT.SET',
			mapKey: 'map1',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no map exist for given key', function () {
		const viewport = {
			width: 50,
			height: 50,
		};

		const action = {
			type: 'MAPS.MAP.VIEWPORT.SET',
			mapKey: 'mapXY',
			width: viewport.width,
			height: viewport.height,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
