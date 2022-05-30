import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('componentMatchesFilterByActive-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should return true, if there is a match', function () {
		const filterByActive = {
			period: true,
		};
		const componentKey = 'componentD';

		assert.isTrue(
			selectors.componentMatchesFilterByActive(
				ComponentsSelectorsState,
				componentKey,
				filterByActive
			)
		);
	});

	it('Should return true, if there is a match 2', function () {
		const filterByActive = {
			period: true,
		};
		const componentKey = 'componentF';

		assert.isTrue(
			selectors.componentMatchesFilterByActive(
				ComponentsSelectorsState,
				componentKey,
				filterByActive
			)
		);
	});

	it('Should return false, if no filter by active was given', function () {
		const filterByActive = null;
		const componentKey = 'componentD';

		assert.isFalse(
			selectors.componentMatchesFilterByActive(
				ComponentsSelectorsState,
				componentKey,
				filterByActive
			)
		);
	});

	it('Should return false, if component has no filter by active', function () {
		const filterByActive = {
			period: true,
		};
		const componentKey = 'componentG';

		assert.isFalse(
			selectors.componentMatchesFilterByActive(
				ComponentsSelectorsState,
				componentKey,
				filterByActive
			)
		);
	});

	after(function () {
		setState(null);
	});
});
