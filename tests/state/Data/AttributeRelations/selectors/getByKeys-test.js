import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeRelations/selectors';

describe('state/Data/AttributeRelations/selectors/getByKeys', function () {
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
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select the relations', function () {
		const expectedResult = [
			{
				key: 'relation1',
				data: {
					scopeKey: 'europe',
					attributeDataSourceKey: 'attribute1',
				},
			},
			{
				key: 'relation2',
				data: {
					scopeKey: 'europe',
					attributeDataSourceKey: 'attribute2',
				},
			},
		];

		assert.deepStrictEqual(
			selectors.getByKeys(['relation1', 'relation2']),
			expectedResult
		);
	});

	it('Should return only existing relations', function () {
		const expectedResult = [
			{
				key: 'relation1',
				data: {
					scopeKey: 'europe',
					attributeDataSourceKey: 'attribute1',
				},
			},
			{
				key: 'relation2',
				data: {
					scopeKey: 'europe',
					attributeDataSourceKey: 'attribute2',
				},
			},
		];

		assert.deepStrictEqual(
			selectors.getByKeys(['relation1', 'relation2', 'relationXY']),
			expectedResult
		);
	});

	it('Should return null, if no matching relation', function () {
		assert.isNull(selectors.getByKeys(['relationX']));
	});

	it('Should return null, if no keys given', function () {
		assert.isNull(selectors.getByKeys());
	});

	it('Should select null, if relations are empty', function () {
		setState({data: {attributeRelations: {byKey: null}}});

		assert.isNull(selectors.getByKeys(['relation1']));
	});

	after(function () {
		setState(null);
	});
});
