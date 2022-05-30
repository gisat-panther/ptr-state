import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getAllAsObjectObserver', function () {
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
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select all data as object', function () {
		const expectedResult = {...state.data.attributeData.byDataSourceKey};

		assert.deepStrictEqual(selectors.getAllAsObjectObserver(), expectedResult);
	});

	it('Should select empty object, if attributeData is empty', function () {
		setState({data: {attributeData: {byDataSourceKey: {}}}});
		assert.deepStrictEqual(selectors.getAllAsObjectObserver(), {});
	});

	after(function () {
		setState(null);
	});
});
