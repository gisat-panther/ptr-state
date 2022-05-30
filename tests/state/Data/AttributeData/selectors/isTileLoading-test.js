import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/isTileLoading', function () {
	const state = {
		data: {
			attributeData: {
				spatialIndexes: [
					{
						filter: {
							modifiers: {
								scopeKey: 'scope1',
							},
						},
						index: {
							7: {
								'2.815,15.125': {
									dataSourceKey1: ['featureKey1', 'featureKey2'],
								},
							},
						},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Find tile loading state false', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const expectedResult = false;

		assert.deepStrictEqual(
			selectors.isTileLoading(filter, 7, '2.815,15.125'),
			expectedResult
		);
	});

	it('Find tile loading state true', function () {
		setState({
			data: {
				attributeData: {
					spatialIndexes: [
						{
							filter: {
								modifiers: {
									scopeKey: 'scope1',
								},
							},
							index: {
								7: {
									'2.815,15.125': true,
								},
							},
						},
					],
				},
			},
		});

		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const expectedResult = true;

		assert.deepStrictEqual(
			selectors.isTileLoading(filter, 7, '2.815,15.125'),
			expectedResult
		);
	});

	it('Should return false if tile is not in index', function () {
		setState({
			data: {
				attributeData: {
					spatialIndexes: [
						{
							filter: {
								modifiers: {
									scopeKey: 'scope1',
								},
							},
							index: {
								7: {},
							},
						},
					],
				},
			},
		});

		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const expectedResult = false;

		assert.deepStrictEqual(
			selectors.isTileLoading(filter, 7, '2.815,15.125'),
			expectedResult
		);
	});

	it('Should return false if index does not exist', function () {
		setState({
			data: {
				attributeData: {
					spatialIndexes: [
						{
							filter: {
								modifiers: {
									scopeKey: 'scope2',
								},
							},
							index: {},
						},
					],
				},
			},
		});

		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const expectedResult = false;

		assert.deepStrictEqual(
			selectors.isTileLoading(filter, 7, '2.815,15.125'),
			expectedResult
		);
	});

	after(function () {
		setState(null);
	});
});
