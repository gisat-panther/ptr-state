import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getIndexesObserver', function () {
	const state = {
		data: {
			attributeData: {
				byDataSourceKey: {
					dataSourceKey1: {
						featureKey1: 'A',
						featureKey2: 'B',
					},
					dataSourceKey2: {
						featureKey1: 17.12,
						featureKey2: 10,
						featureKey3: 11.17,
					},
				},
				indexes: [
					{
						filter: {
							modifiers: {
								scopeKey: 'scope1',
							},
						},
						index: {1: 'featureKey1', 2: 'featureKey2', 3: 'featureKey3'},
					},
					{
						filter: {
							modifiers: {
								periodKeys: {
									in: ['periodKey1'],
								},
							},
						},
						index: {1: 'featureKey1', 2: 'featureKey2'},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select all indexes', function () {
		const expectedResult = [...state.data.attributeData.indexes];

		assert.deepStrictEqual(selectors.getIndexesObserver(), expectedResult);
	});

	it('Should select empty array, if indexes is empty', function () {
		setState({data: {attributeData: {indexes: []}}});
		assert.deepStrictEqual(selectors.getIndexesObserver(), []);
	});

	after(function () {
		setState(null);
	});
});
