import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Components/selectors';
import {ComponentsSelectorsState} from './_state';

describe('getByComponentKey_recompute', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select all data from components', function () {
		const componentKey = 'componentA';
		const expectedResult = ComponentsSelectorsState.components[componentKey];

		assert.deepStrictEqual(
			selectors.getByComponentKey_recompute(componentKey),
			expectedResult
		);
	});

	it('Should return null, if component for given key does not exist', function () {
		const componentKey = 'componentXY';

		assert.isNull(selectors.getByComponentKey_recompute(componentKey));
	});

	it('Should return null, if no key given', function () {
		assert.isNull(selectors.getByComponentKey_recompute());
	});

	it('Should return null, if components is empty', function () {
		setState({components: {}});
		const componentKey = 'componentA';

		assert.isNull(selectors.getByComponentKey_recompute(componentKey));
	});

	after(function () {
		setState(null);
	});
});
