import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getAttributeDataFilterExtensionByComponentKey-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should return filter extension', function () {
		const expectedResult = {
			attributeFilter: {
				attribute1: 2,
			},
		};

		assert.deepStrictEqual(
			selectors.getAttributeDataFilterExtensionByComponentKey('componentF'),
			expectedResult
		);
	});

	it('Should return empty object, if there is no extension for given component', function () {
		const expectedResult = {};

		assert.deepStrictEqual(
			selectors.getAttributeDataFilterExtensionByComponentKey('componentA'),
			expectedResult
		);
	});

	it('Should return empty object, if there is no state for give component', function () {
		const expectedResult = {};

		assert.deepStrictEqual(
			selectors.getAttributeDataFilterExtensionByComponentKey('componentXY'),
			expectedResult
		);
	});

	after(function () {
		setState(null);
	});
});
