import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeRelations/selectors';

describe('state/Data/AttributeRelations/selectors/getIndexed', function () {
	const state = {
		data: {
			attributeRelations: {
				byKey: {
					relation1: {
						key: 'relation1',
						data: {
							scopeKey: 'europe',
							attributeDataSourceKey: 'attribute1',
						},
					},
					relation2: {
						key: 'relation2',
						data: {
							scopeKey: 'europe',
							attributeDataSourceKey: 'attribute2',
						},
					},
				},
				indexes: [
					{
						filter: {
							scopeKey: 'europe',
						},
						count: 3,
						index: {0: true, 1: 'relation1', 2: false},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select indexed relations', function () {
		const filter = {
			scopeKey: 'europe',
		};

		const expectedResult = [
			{
				key: 'relation1',
				data: {
					scopeKey: 'europe',
					attributeDataSourceKey: 'attribute1',
				},
			},
		];

		assert.deepStrictEqual(selectors.getIndexed(filter), expectedResult);
	});

	it('Should return null, if no matching index', function () {
		const filter = {
			scopeKey: 'asia',
		};
		assert.isNull(selectors.getIndexed(filter));
	});

	it('Should select null, if relations are empty', function () {
		setState({data: {attributeRelations: {byKey: null}}});

		const filter = {
			scopeKey: 'europe',
		};
		assert.isNull(selectors.getIndexed(filter));
	});

	after(function () {
		setState(null);
	});
});
