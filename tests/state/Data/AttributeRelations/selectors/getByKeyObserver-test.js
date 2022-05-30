import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeRelations/selectors';

describe('state/Data/AttributeRelations/selectors/getByKeyObserver', function () {
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

	it('Should select the relation', function () {
		const expectedResult = {
			key: 'relation2',
			data: {
				scopeKey: 'europe',
				attributeDataSourceKey: 'attribute2',
			},
		};

		assert.deepStrictEqual(
			selectors.getByKeyObserver('relation2'),
			expectedResult
		);
	});

	it('Should select null, if relation does not exist', function () {
		assert.isNull(selectors.getByKeyObserver('relation3'));
	});

	it('Should select null, if relations are empty', function () {
		setState({data: {attributeRelations: {byKey: null}}});

		assert.isNull(selectors.getByKeyObserver('relation1'));
	});

	after(function () {
		setState(null);
	});
});
