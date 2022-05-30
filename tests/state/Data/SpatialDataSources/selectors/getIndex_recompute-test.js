import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/SpatialDataSources/selectors';

describe('getIndex_recompute', function () {
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

	it('Should return index', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const order = null;

		const expectedResult = {
			filter: {
				modifiers: {
					scopeKey: 'scope1',
				},
			},
			index: {
				1: 'dataSource1',
				2: 'dataSource2',
			},
		};

		assert.deepStrictEqual(
			selectors.getIndex_recompute(filter, order),
			expectedResult
		);
	});

	it('Should return null, if no matching index', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scopeXY',
			},
		};

		const order = null;
		assert.isNull(selectors.getIndex_recompute(filter, order));
	});

	it('Should return null, if no indexes present', function () {
		setState({data: {spatialDataSources: {indexes: []}}});
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};

		const order = null;
		assert.isNull(selectors.getIndex_recompute(filter, order));
	});

	after(function () {
		setState(null);
	});
});
