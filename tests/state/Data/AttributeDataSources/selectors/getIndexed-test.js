import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeDataSources/selectors';

describe('state/Data/AttributeDataSources/selectors/getIndexed', function () {
	const state = {
		data: {
			attributeDataSources: {
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
								scopeKey: 'europe',
							},
						},
						count: 3,
						index: {1: true, 2: 'dataSource1', 3: false},
					},
					{
						filter: {
							modifiers: {
								scopeKey: 'africa',
							},
						},
						count: 0,
						index: {},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select indexed data sources', function () {
		const filter = {
			modifiers: {
				scopeKey: 'europe',
			},
		};

		const expectedResult = [
			{
				key: 'dataSource1',
				data: {
					type: 'vector',
				},
			},
		];

		assert.deepStrictEqual(selectors.getIndexed(filter), expectedResult);
	});

	it('Should return null, if no matching index', function () {
		const filter = {
			modifiers: {
				scopeKey: 'asia',
			},
		};
		assert.isNull(selectors.getIndexed(filter));
	});

	it('Should select null, if relations are empty', function () {
		setState({data: {attributeDataSources: {byKey: null}}});

		const filter = {
			modifiers: {
				scopeKey: 'europe',
			},
		};
		assert.isNull(selectors.getIndexed(filter));
	});

	it('Should select null, if no model is indexed yet', function () {
		const filter = {
			modifiers: {
				scopeKey: 'africa',
			},
		};
		assert.isNull(selectors.getIndexed(filter));
	});

	after(function () {
		setState(null);
	});
});
