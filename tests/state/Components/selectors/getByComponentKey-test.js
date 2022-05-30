import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Components/selectors';
import {ComponentsSelectorsState} from './_state';

describe('getByComponentKey', function () {
	it('Should select all data from components', function () {
		const componentKey = 'componentA';
		const expectedResult = ComponentsSelectorsState.components[componentKey];

		assert.deepStrictEqual(
			selectors.getByComponentKey(ComponentsSelectorsState, componentKey),
			expectedResult
		);
	});

	it('Should return null, if component for given key does not exist', function () {
		const componentKey = 'componentXY';

		assert.isNull(
			selectors.getByComponentKey(ComponentsSelectorsState, componentKey)
		);
	});

	it('Should return null, if no key given', function () {
		assert.isNull(selectors.getByComponentKey(ComponentsSelectorsState));
	});

	it('Should return null, if components is empty', function () {
		const componentKey = 'componentA';

		assert.isNull(selectors.getByComponentKey({components: {}}, componentKey));
	});
});
