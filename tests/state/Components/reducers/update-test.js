import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../src/state/Components/reducers';
import {ComponentsReducersState as state} from './_state';

describe('update-test', function () {
	it('Should update component', function () {
		const update = {
			xyz: 'XYZ',
		};

		const expectedState = {
			...state,
			componentA: {
				...state.componentA,
				...update,
			},
		};

		const action = {
			type: 'COMPONENTS.UPDATE',
			component: 'componentA',
			update,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add new component', function () {
		const update = {
			xyz: 'XYZ',
		};

		const expectedState = {
			...state,
			componentZ: update,
		};

		const action = {
			type: 'COMPONENTS.UPDATE',
			component: 'componentZ',
			update,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if update is empty', function () {
		const action = {
			type: 'COMPONENTS.UPDATE',
			component: 'componentA',
			update: {},
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
