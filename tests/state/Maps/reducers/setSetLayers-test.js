import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setSetLayers-test', function () {
	it('Should set map set layers', function () {
		const layers = [{key: 'layer1'}, {key: 'layer2'}];

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set2: {
					...state.sets.set2,
					data: {
						...state.sets.set2.data,
						layers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.LAYERS.SET',
			setKey: 'set2',
			layers,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set map set layers, even if no data property exist', function () {
		const layers = [{key: 'layer1'}, {key: 'layer2'}];

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set11: {
					...state.sets.set11,
					data: {
						layers,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.LAYERS.SET',
			setKey: 'set11',
			layers,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no set found for given key', function () {
		const action = {
			type: 'MAPS.SET.LAYERS.SET',
			setKey: 'set4',
			layers: [{key: 'layer1'}, {key: 'layer2'}],
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no setKey given', function () {
		const action = {
			type: 'MAPS.SET.LAYERS.SET',
			layers: [{key: 'layer1'}, {key: 'layer2'}],
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no layers given', function () {
		const action = {
			type: 'MAPS.SET.LAYERS.SET',
			setKey: 'set2',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
