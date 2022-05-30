import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getCommonFilterByComponentKey-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should return common filter', function () {
		const expectedResult = {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'activePeriodKey1',
			},
			attributeKeys: ['attribute1'],
		};

		assert.deepStrictEqual(
			selectors.getCommonFilterByComponentKey('componentB'),
			expectedResult
		);
	});

	it('Should return common filter 2', function () {
		const expectedResult = {
			modifiers: {
				scopeKey: 'scope1',
				periodKey: 'activePeriodKey1',
			},
			attributeKeys: ['attribute1'],
		};

		assert.deepStrictEqual(
			selectors.getCommonFilterByComponentKey('componentB'),
			expectedResult
		);
	});

	it('Should return common filter 3', function () {
		const expectedResult = {
			modifiers: {
				scopeKey: 'scope2',
				periodKey: 'activePeriodKey1',
			},
			attributeKeys: ['attribute1'],
			areaTreeLevelKey: 'areaTreeLevel1',
		};

		assert.deepStrictEqual(
			selectors.getCommonFilterByComponentKey('componentE'),
			expectedResult
		);
	});

	it('Should return empty object, if there is no filter for given component', function () {
		const expectedResult = {};

		assert.deepStrictEqual(
			selectors.getCommonFilterByComponentKey('componentH'),
			expectedResult
		);
	});

	it('Should return empty object, if there is no state for give component', function () {
		const expectedResult = {};

		assert.deepStrictEqual(
			selectors.getCommonFilterByComponentKey('componentXY'),
			expectedResult
		);
	});

	after(function () {
		setState(null);
	});
});
