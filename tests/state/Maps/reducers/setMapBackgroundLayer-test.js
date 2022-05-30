import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setMapBackgroundLayer-test', function () {
	it('Should set map background layer', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						backgroundLayer,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.SET_BACKGROUND_LAYER',
			mapKey: 'map1',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set map background layer, even if no data prop exist', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map11: {
					...state.maps.map11,
					data: {
						backgroundLayer,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.SET_BACKGROUND_LAYER',
			mapKey: 'map11',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no map found for given key', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const action = {
			type: 'MAPS.MAP.SET_BACKGROUND_LAYER',
			mapKey: 'mapXY',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no mapKey given', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const action = {
			type: 'MAPS.MAP.SET_BACKGROUND_LAYER',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no background layer given', function () {
		const action = {
			type: 'MAPS.MAP.SET_BACKGROUND_LAYER',
			mapKey: 'map1',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
