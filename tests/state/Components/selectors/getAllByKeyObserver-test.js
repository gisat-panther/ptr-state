import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Components/selectors';
import {ComponentsSelectorsState} from './_state';

describe('getAllByKeyObserver', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select all data from components', function () {
		assert.deepStrictEqual(
			selectors.getAllByKeyObserver(),
			ComponentsSelectorsState.components
		);
	});

	after(function () {
		setState(null);
	});
});
