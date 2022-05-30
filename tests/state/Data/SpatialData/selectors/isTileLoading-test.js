import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialData/selectors';

describe('state/Data/SpatialData/selectors/isTileLoading', function () {
	const state = {
		data: {
			spatialData: {
				indexes: [
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
				spatialData: {
					indexes: [
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
				spatialData: {
					indexes: [
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
				spatialData: {
					indexes: [
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

	it('Should return false, if no level or tile given', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const expectedResult = false;

		assert.deepStrictEqual(
			selectors.isTileLoading(filter, null, '2.815,15.125'),
			expectedResult
		);

		assert.deepStrictEqual(
			selectors.isTileLoading(filter, 7, null),
			expectedResult
		);
	});

	after(function () {
		setState(null);
	});
});
