import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('setComponentAttributeKeys-test', function () {
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
					attributeKeys: ['attribute1'],
				},
			},
		},
	};

	it('Should set attributeKeys for given component', function () {
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
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
			componentKey: 'componentA',
			attributeKeys: ['attributeXY'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set attributeKeys for given component, if component exists', function () {
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
						attributeKeys: ['attributeXY'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
			componentKey: 'componentB',
			attributeKeys: ['attributeXY'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set attributeKeys given component, if component does not exists', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentD: {
						attributeKeys: ['attributeXY'],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
			componentKey: 'componentD',
			attributeKeys: ['attributeXY'],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no component key was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
			componentKey: null,
			attributeKeys: ['attributeXY'],
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if attributeKeys is an empty array', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS',
			componentKey: 'componentA',
			attributeKeys: [],
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
