import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getData-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select attribute data for given component key', function () {
		const expectedResult = [
			{
				key: 'featureKey5',
				data: {
					attribute1: 6,
					attribute2: null,
				},
			},
			{
				key: 'featureKey1',
				data: {
					attribute1: 8,
					attribute2: 'A',
				},
			},
			{
				key: 'featureKey3',
				data: {
					attribute1: 10,
					attribute2: 'C',
				},
			},
		];

		assert.deepStrictEqual(selectors.getData('columnChart'), expectedResult);
	});

	it('Should select attribute data for given component key 2', function () {
		const expectedResult = [
			{
				key: 'featureKey1',
				data: {
					attribute1: 8,
				},
			},
			null,
		];

		assert.deepStrictEqual(selectors.getData('componentB'), expectedResult);
	});

	it('Should select attribute data for given component key', function () {
		const expectedResult = [
			{
				key: 'featureKey2',
				data: {
					attribute1: 2,
				},
			},
			{
				key: 'featureKey4',
				data: {
					attribute1: 4,
				},
			},
			{
				key: 'featureKey5',
				data: {
					attribute1: 6,
				},
			},
		];

		assert.deepStrictEqual(selectors.getData('componentE'), expectedResult);
	});

	it('Should return null, if there are no features indexed for given component', function () {
		assert.isNull(selectors.getData('componentA'));
	});

	it('Should return null, if there is no state for give component', function () {
		assert.isNull(
			selectors.getIndexForAttributeDataByComponentKey('componentXY')
		);
	});

	it('Should return null, if there are no attributeKeys', function () {
		assert.isNull(
			selectors.getIndexForAttributeDataByComponentKey('componentG')
		);
	});

	it('Should return null, if there are no relations', function () {
		assert.isNull(
			selectors.getIndexForAttributeDataByComponentKey('componentH')
		);
	});

	after(function () {
		setState(null);
	});
});
