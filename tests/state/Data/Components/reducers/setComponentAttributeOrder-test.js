import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('setComponentAttributeOrder-test', function () {
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
					attributeOrder: [['attribute1', 'desc']],
				},
			},
		},
	};

	it('Should set attributeOrder for given component', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentA: {
						attributeOrder: [['attribute2', 'desc']],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
			componentKey: 'componentA',
			attributeOrder: [['attribute2', 'desc']],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set attributeOrder for given component, if component exists', function () {
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
						attributeOrder: [['attribute2', 'desc']],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
			componentKey: 'componentB',
			attributeOrder: [['attribute2', 'desc']],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set attributeOrder given component, if component does not exists', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					componentD: {
						attributeOrder: [['attribute2', 'desc']],
					},
				},
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
			componentKey: 'componentD',
			attributeOrder: [['attribute2', 'desc']],
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no component key was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
			componentKey: null,
			attributeOrder: [['attribute2', 'desc']],
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if attributeOrder is an empty array', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_ORDER',
			componentKey: 'componentA',
			attributeOrder: [],
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
