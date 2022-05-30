import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('addOrReplaceComponents-test', function () {
	const state = {
		...INITIAL_STATE,
		components: {
			...INITIAL_STATE.components,
			byKey: {
				componentB: {
					modifiers: {
						placeKey: 'place1',
					},
					attributeKeys: ['attribute1'],
				},
			},
		},
	};

	it('Should remove component key from store', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentA: {
						attributeKeys: ['attributeXY'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.ADD_COMPONENTS',
			components: {
				componentA: {
					attributeKeys: ['attributeXY'],
				},
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if components was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.ADD_COMPONENTS',
			componentKey: null,
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
