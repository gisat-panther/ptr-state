import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialDataSources/selectors';

describe('getIndexesObserver', function () {
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

	it('Should select all indexes', function () {
		const expectedResult = [...state.data.spatialDataSources.indexes];
		assert.deepStrictEqual(selectors.getIndexesObserver(), expectedResult);
	});

	it('Should select empty object, if indexes are empty', function () {
		setState({data: {spatialDataSources: {indexes: {}}}});
		assert.deepStrictEqual(selectors.getIndexesObserver(), {});
	});

	after(function () {
		setState(null);
	});
});
