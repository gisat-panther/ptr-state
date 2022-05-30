import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('isComponentInUse-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Component should be in use', function () {
		assert.isTrue(
			selectors.isComponentInUse(ComponentsSelectorsState, 'componentB')
		);
	});

	it('Component should not be in use', function () {
		assert.isFalse(
			selectors.isComponentInUse(ComponentsSelectorsState, 'componentD')
		);
	});

	it('Component should not be in use, if there is a typo in component key', function () {
		assert.isFalse(
			selectors.isComponentInUse(ComponentsSelectorsState, 'componen')
		);
	});

	it('Component should not be in use, if inUse is empty', function () {
		const state = {
			...ComponentsSelectorsState,
			data: {
				...ComponentsSelectorsState.data,
				components: {
					...ComponentsSelectorsState.data.components,
					components: {
						...ComponentsSelectorsState.data.components.components,
						inUse: [],
					},
				},
			},
		};
		assert.isFalse(selectors.isComponentInUse(state, 'componentD'));
	});

	after(function () {
		setState(null);
	});
});
