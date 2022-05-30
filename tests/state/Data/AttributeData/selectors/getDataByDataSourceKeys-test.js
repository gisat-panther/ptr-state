import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getDataByDataSourceKeys', function () {
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
					dataSourceKey3: {
						featureKey1: 1,
						featureKey2: 2,
					},
					dataSourceKey4: {},
				},
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select data for given data sources', function () {
		const dataSourceKeys = ['dataSourceKey2', 'dataSourceKey3'];
		const expectedResult = {
			dataSourceKey2: {
				featureKey1: 17.12,
				featureKey2: 10,
				featureKey3: 11.17,
			},
			dataSourceKey3: {
				featureKey1: 1,
				featureKey2: 2,
			},
		};

		assert.deepStrictEqual(
			selectors.getDataByDataSourceKeys(dataSourceKeys),
			expectedResult
		);
	});

	it('Should return null if no keys was given', function () {
		assert.deepStrictEqual(selectors.getDataByDataSourceKeys(), null);
	});

	it('Should return null if no data sources was found for given keys', function () {
		assert.deepStrictEqual(
			selectors.getDataByDataSourceKeys(['dataSourceXY']),
			null
		);
	});

	it('Should return null if no data are present for data source', function () {
		assert.deepStrictEqual(
			selectors.getDataByDataSourceKeys(['dataSourceKey4']),
			null
		);
	});

	after(function () {
		setState(null);
	});
});
