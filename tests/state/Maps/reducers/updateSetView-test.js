import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('updateSetView-test', function () {
	it('Should update set view', function () {
		const update = {
			center: {
				lon: 10,
				lat: 10,
			},
		};

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set2: {
					...state.sets.set2,
					data: {
						...state.sets.set2.data,
						view: {
							...state.sets.set2.data.view,
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
			type: 'MAPS.SET.VIEW.UPDATE',
			setKey: 'set2',
			update,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should create map set view, if does not exist for given map set key', function () {
		const update = {
			center: {
				lon: 10,
				lat: 10,
			},
		};

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					...state.sets.set1,
					data: {
						...state.sets.set1.data,
						view: update,
						previousView: null,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.VIEW.UPDATE',
			setKey: 'set1',
			update,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no update given', function () {
		const action = {
			type: 'MAPS.SET.VIEW.UPDATE',
			setKey: 'set1',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
