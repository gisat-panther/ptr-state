import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

describe('componentUseClear-test', function () {
	const state = {
		...INITIAL_STATE,
		components: {
			...INITIAL_STATE.components,
			inUse: ['componentA', 'componentB', 'componentC'],
		},
	};

	it('Should remove component key from store', function () {
		const expectedState = {
			...state,
			components: {
				...state.components,
				inUse: ['componentA', 'componentC'],
			},
		};

		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.CLEAR',
			componentKey: 'componentB',
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no component key was given', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.CLEAR',
			componentKey: null,
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if there is no registered usage', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.CLEAR',
			componentKey: 'componentA',
		};

		const output = reducers(INITIAL_STATE, action);

		assert.equal(output, INITIAL_STATE);
	});

	it('Should return the same state if given component key was not found', function () {
		const action = {
			type: 'DATA.COMPONENTS.COMPONENT.USE.CLEAR',
			componentKey: 'componentD',
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
