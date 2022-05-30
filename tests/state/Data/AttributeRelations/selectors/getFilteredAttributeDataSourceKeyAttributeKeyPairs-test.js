import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeRelations/selectors';

describe('state/Data/AttributeRelations/selectors/getFilteredAttributeDataSourceKeyAttributeKeyPairs', function () {
	const state = {
		data: {
			attributeRelations: {
				byKey: {
					relation1: {
						key: 'relation1',
						data: {
							scopeKey: 'europe',
							attributeKey: 'attribute1',
							attributeDataSourceKey: 'attributeDs1',
						},
					},
					relation2: {
						key: 'relation2',
						data: {
							scopeKey: 'europe',
							attributeKey: 'attribute2',
							attributeDataSourceKey: 'attributeDs2',
						},
					},
				},
				indexes: [
					{
						filter: {
							scopeKey: 'europe',
						},
						count: 2,
						index: {1: 'relation1', 2: 'relation2'},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select the pairs', function () {
		const filter = {
			scopeKey: 'europe',
		};

		const expectedResult = {
			attributeDs1: 'attribute1',
			attributeDs2: 'attribute2',
		};

		assert.deepStrictEqual(
			selectors.getFilteredAttributeDataSourceKeyAttributeKeyPairs(filter),
			expectedResult
		);
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
