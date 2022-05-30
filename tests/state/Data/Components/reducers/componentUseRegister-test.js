import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('componentUseClear-test', function () {
	const state = {
		...INITIAL_STATE,
		components: {
			...INITIAL_STATE.components,
			inUse: ['componentA', 'componentB'],
		},
	};

	it('Should add component key to store', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				inUse: ['componentA', 'componentB', 'componentC'],
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.REGISTER',
			componentKey: 'componentC',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add first usage to empty inUse', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				inUse: ['componentC'],
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.REGISTER',
			componentKey: 'componentC',
		};

		const output = reducers(INITIAL_STATE, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no component key was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.REGISTER',
			componentKey: null,
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
