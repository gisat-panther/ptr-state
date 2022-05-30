import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getByDataSourceKeyObserver', function () {
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

	it('Should select sata for given key', function () {
		const expectedResult = {
			featureKey1: 'A',
			featureKey2: 'B',
		};

		assert.deepStrictEqual(
			selectors.getByDataSourceKeyObserver('dataSourceKey1'),
			expectedResult
		);
	});

	it('Should return null, if there is no record for given data source key', function () {
		assert.isNull(selectors.getByDataSourceKeyObserver('dataSourceXY'));
	});

	after(function () {
		setState(null);
	});
});
