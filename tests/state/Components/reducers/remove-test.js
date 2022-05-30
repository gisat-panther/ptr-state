import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../src/state/Components/reducers';
import {ComponentsReducersState as state} from './_state';

describe('state/Components/reducers/remove', function () {
	it('Should remove the value in given path', function () {
		const component = 'componentA';
		const path = 'data.something';

		const expectedState = {
			...state,
			componentA: {
				data: {},
			},
		};

		const action = {
			type: 'COMPONENTS.REMOVE',
			component,
			path,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove the whole component from state if path is "" .', function () {
		const component = 'componentA';
		const path = '';

		const expectedState = {};

		const action = {
			type: 'COMPONENTS.REMOVE',
			component,
			path,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove the whole component from state if path is null .', function () {
		const component = 'componentA';
		const path = null;

		const expectedState = {};

		const action = {
			type: 'COMPONENTS.REMOVE',
			component,
			path,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove the whole component from state if path is not defined .', function () {
		const component = 'componentA';

		const expectedState = {};

		const action = {
			type: 'COMPONENTS.REMOVE',
			component,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should remove nothing if path does not relate to state object', function () {
		const component = 'componentA';
		const path = 'anything';

		const action = {
			type: 'COMPONENTS.REMOVE',
			component,
			path,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, state);
	});
});
