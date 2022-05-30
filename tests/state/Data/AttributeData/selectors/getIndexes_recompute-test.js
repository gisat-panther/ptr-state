import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getIndex_recompute', function () {
	const state = {
		data: {
			attributeData: {
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
						order: [['attributeKey1', 'descending']],
						index: {1: 'featureKey1', 2: 'featureKey2'},
					},
				],
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select index for given filter and order', function () {
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
			index: {1: 'featureKey1', 2: 'featureKey2', 3: 'featureKey3'},
		};

		assert.deepStrictEqual(
			selectors.getIndex_recompute(filter, order),
			expectedResult
		);
	});

	it('Should select index for given filter if order is null', function () {
		const filter = {
			modifiers: {
				periodKeys: {
					in: ['periodKey1'],
				},
			},
		};
		const order = [['attributeKey1', 'descending']];
		const expectedResult = {
			filter: {
				modifiers: {
					periodKeys: {
						in: ['periodKey1'],
					},
				},
			},
			order: [['attributeKey1', 'descending']],
			index: {1: 'featureKey1', 2: 'featureKey2'},
		};

		assert.deepStrictEqual(
			selectors.getIndex_recompute(filter, order),
			expectedResult
		);
	});

	it('Should return null if there is no indexes', function () {
		setState({data: {attributeData: {indexes: []}}});
		const filter = {
			modifiers: {
				scopeKey: 'scope1',
			},
		};
		const order = null;
		assert.isNull(selectors.getIndex_recompute(filter, order));
	});

	it('Should return null if there is no match', function () {
		const filter = {
			modifiers: {
				scopeKey: 'scope2',
			},
		};
		assert.isNull(selectors.getIndex_recompute(filter, null));
	});

	after(function () {
		setState(null);
	});
});
