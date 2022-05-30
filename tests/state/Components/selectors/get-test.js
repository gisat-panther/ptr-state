import {assert} from 'chai';
import selectors from '../../../../src/state/Components/selectors';
import {ComponentsSelectorsState} from './_state';

describe('get', function () {
	it('Should select value from fiven path', function () {
		const componentKey = 'componentA';
		const path = 'data.something';
		const expectedResult = 'someValue';

		assert.deepStrictEqual(
			selectors.get(ComponentsSelectorsState, componentKey, path),
			expectedResult
		);
	});

	it('Should return null, if component for given key does not exist', function () {
		const componentKey = 'componentXY';

		assert.isNull(selectors.get(ComponentsSelectorsState, componentKey));
	});

	it('Should return null, if no key given', function () {
		assert.isNull(selectors.get(ComponentsSelectorsState));
	});

	it('Should return null, if no path given', function () {
		const componentKey = 'componentA';
		assert.isNull(selectors.get(ComponentsSelectorsState, componentKey));
	});

	it('Should return null, if components is empty', function () {
		const componentKey = 'componentA';

		assert.isNull(selectors.get({components: {}}, componentKey));
	});
});
