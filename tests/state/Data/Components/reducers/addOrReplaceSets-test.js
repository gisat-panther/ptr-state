import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('addOrReplaceSets-test', function () {
	const state = {
		...INITIAL_STATE,
		sets: {
			...INITIAL_STATE.sets,
			byKey: {
				setA: {
					components: ['componentA'],
				},
			},
		},
	};

	it('Should add set to store', function () {
		const expectedState = {
			...state,
			sets: {
				...state.sets,
				byKey: {
					...state.sets.byKey,
					setA: {
						components: ['componentA'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.ADD_SETS',
			sets: {
				setA: {
					components: ['componentA'],
				},
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no sets was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.ADD_SETS',
			sets: null,
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
