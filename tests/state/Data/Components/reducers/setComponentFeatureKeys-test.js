import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('setComponentFeatureKeys-test', function () {
	const state = {
		...INITIAL_STATE,
		components: {
			...INITIAL_STATE.components,
			byKey: {
				componentA: {},
				componentB: {
					modifiers: {
						placeKey: 'place1',
					},
					featureKeys: ['1'],
				},
			},
		},
	};

	it('Should set featureKeys for given component', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentA: {
						featureKeys: ['2'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
			componentKey: 'componentA',
			featureKeys: ['2'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set featureKeys for given component, if component exists', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentB: {
						modifiers: {
							placeKey: 'place1',
						},
						featureKeys: ['3'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
			componentKey: 'componentB',
			featureKeys: ['3'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set featureKeys given component, if component does not exists', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentD: {
						featureKeys: ['4'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
			componentKey: 'componentD',
			featureKeys: ['4'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no component key was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
			componentKey: null,
			featureKeys: ['5'],
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if featureKeys is an empty array', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.FEATURE_KEYS',
			componentKey: 'componentA',
			featureKeys: [],
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
