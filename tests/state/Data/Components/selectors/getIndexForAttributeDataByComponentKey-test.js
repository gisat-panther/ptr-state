import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getIndexForAttributeDataByComponentKey-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should return index', function () {
		const componentKey = 'componentB';
		const expectedResult = {
			filter: {
				modifiers: {
					periodKey: 'activePeriodKey1',
					scopeKey: 'scope1',
				},
				attributeKeys: ['attribute1'],
			},
			count: 3,
			index: {1: 'featureKey2', 2: 'featureKey1'},
		};

		assert.deepStrictEqual(
			selectors.getIndexForAttributeDataByComponentKey(componentKey),
			expectedResult
		);
	});

	it('Should return index 2', function () {
		const componentKey = 'columnChart';
		const expectedResult = {
			filter: {
				modifiers: {
					periodKey: 'activePeriodKey1',
					scopeKey: 'scope1',
				},
				attributeKeys: ['attribute1', 'attribute2'],
			},
			order: [['attribute1', 'ascending']],
			count: 6,
			index: {
				1: 'featureKey2',
				2: 'featureKey4',
				3: 'featureKey5',
				4: 'featureKey1',
				5: 'featureKey3',
				6: 'featureKey6',
			},
		};

		assert.deepStrictEqual(
			selectors.getIndexForAttributeDataByComponentKey(componentKey),
			expectedResult
		);
	});

	it('Should return index 3', function () {
		const componentKey = 'componentE';
		const expectedResult = {
			filter: {
				modifiers: {
					periodKey: 'activePeriodKey1',
					scopeKey: 'scope2',
				},
				attributeKeys: ['attribute1'],
				areaTreeLevelKey: 'areaTreeLevel1',
			},
			count: 3,
			index: {1: 'featureKey2', 2: 'featureKey4', 3: 'featureKey5'},
		};

		assert.deepStrictEqual(
			selectors.getIndexForAttributeDataByComponentKey(componentKey),
			expectedResult
		);
	});

	it('Should return null, if there is no index for given component', function () {
		assert.isNull(
			selectors.getIndexForAttributeDataByComponentKey('componentG')
		);
	});

	it('Should return null, if there is no state for given component', function () {
		assert.isNull(
			selectors.getIndexForAttributeDataByComponentKey('componentXY')
		);
	});

	after(function () {
		setState(null);
	});
});
