import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setSetBackgroundLayer-test', function () {
	it('Should set map set background layer', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					...state.sets.set1,
					data: {
						...state.sets.set1.data,
						backgroundLayer,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.SET_BACKGROUND_LAYER',
			setKey: 'set1',
			backgroundLayer,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set map set background layer, even if no data prop exist', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set11: {
					...state.sets.set11,
					data: {
						backgroundLayer,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.SET_BACKGROUND_LAYER',
			setKey: 'set11',
			backgroundLayer,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no set found for given key', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const action = {
			type: 'MAPS.SET.SET_BACKGROUND_LAYER',
			setKey: 'setXY',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no setKey given', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const action = {
			type: 'MAPS.SET.SET_BACKGROUND_LAYER',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no background layer given', function () {
		const action = {
			type: 'MAPS.SET.SET_BACKGROUND_LAYER',
			setKey: 'set1',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
