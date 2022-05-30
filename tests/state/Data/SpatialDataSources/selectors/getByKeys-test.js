import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialDataSources/selectors';

describe('getByKeys', function () {
	const state = {
		data: {
			spatialDataSources: {
				byKey: {
					dataSource1: {
						key: 'dataSource1',
						data: {
							type: 'vector',
						},
					},
					dataSource2: {
						key: 'dataSource2',
						data: {
							type: 'wmts',
						},
					},
				},
				indexes: [
					{
						filter: {
							modifiers: {
								scopeKey: 'scope1',
							},
						},
						index: {
							1: 'dataSource1',
							2: 'dataSource2',
						},
					},
					{
						filter: {
							modifiers: {
								scopeKey: 'scope2',
							},
						},
						index: {
							1: 'dataSource2',
						},
					},
					{
						filter: {
							modifiers: {
								scopeKey: 'scope3',
							},
						},
						index: {},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select the data sources', function () {
		const expectedResult = [
			{
				key: 'dataSource1',
				data: {
					type: 'vector',
				},
			},
			{
				key: 'dataSource2',
				data: {
					type: 'wmts',
				},
			},
		];

		assert.deepStrictEqual(
			selectors.getByKeys(['dataSource1', 'dataSource2']),
			expectedResult
		);
	});

	it('Should return only existing data sources', function () {
		const expectedResult = [
			{
				key: 'dataSource1',
				data: {
					type: 'vector',
				},
			},
			{
				key: 'dataSource2',
				data: {
					type: 'wmts',
				},
			},
		];

		assert.deepStrictEqual(
			selectors.getByKeys(['dataSource1', 'dataSource2', 'dataSourceXY']),
			expectedResult
		);
	});

	it('Should return null, if no matching data source', function () {
		assert.isNull(selectors.getByKeys(['dataSourceX']));
	});

	it('Should return null, if no keys given', function () {
		assert.isNull(selectors.getByKeys());
	});

	it('Should select null, if dataSources are empty', function () {
		setState({data: {spatialDataSources: {byKey: null}}});

		assert.isNull(selectors.getByKeys(['dataSource1']));
	});

	after(function () {
		setState(null);
	});
});
