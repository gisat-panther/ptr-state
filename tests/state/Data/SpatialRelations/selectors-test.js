import {assert} from 'chai';
import selectors from '../../../../src/state/Data/SpatialRelations/selectors';
import {expectedDataSpatialRelationsSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('state/Data/SpatialRelations/selectors', function () {
	describe('getIndex', function () {
		const state = {
			data: {
				spatialRelations: {
					indexes: [
						{
							filter: {scopeKey: 'Europe', placeKey: 'Prague'},
							order: null,
							count: 3,
							index: {
								1: 'a',
								2: 'b',
								3: 'c',
							},
						},
						{
							filter: {
								scopeKey: 'Europe',
								placeKey: 'Prague',
								caseKey: {in: ['A', 'B']},
							},
							order: null,
							count: 3,
							index: {
								1: 'a',
								2: null,
								3: 'c',
							},
						},
					],
				},
			},
		};

		it('Should select index', function () {
			const filter = {scopeKey: 'Europe', placeKey: 'Prague'};
			const expectedResult = {
				filter: {scopeKey: 'Europe', placeKey: 'Prague'},
				order: null,
				count: 3,
				index: {
					1: 'a',
					2: 'b',
					3: 'c',
				},
			};
			assert.deepStrictEqual(
				selectors.getIndex(state, filter, null),
				expectedResult
			);
		});

		it('Should select index, if multiple case keys', function () {
			const filter = {
				scopeKey: 'Europe',
				placeKey: 'Prague',
				caseKey: {in: ['A', 'B']},
			};
			const expectedResult = {
				filter: {
					scopeKey: 'Europe',
					placeKey: 'Prague',
					caseKey: {in: ['A', 'B']},
				},
				order: null,
				count: 3,
				index: {
					1: 'a',
					2: null,
					3: 'c',
				},
			};
			assert.deepStrictEqual(
				selectors.getIndex(state, filter, null),
				expectedResult
			);
		});

		it('Should not select index', function () {
			const filter = {
				scopeKey: 'Europe',
				placeKey: 'Prague',
				caseKey: {in: ['A', 'B', 'C']},
			};
			const expectedResult = null;
			assert.deepStrictEqual(
				selectors.getIndex(state, filter, null),
				expectedResult
			);
		});
	});
});

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedDataSpatialRelationsSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'data.spatialRelations', options);
});
