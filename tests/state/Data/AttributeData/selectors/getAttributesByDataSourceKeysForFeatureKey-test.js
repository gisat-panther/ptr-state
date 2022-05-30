import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeData/selectors';

describe('state/Data/AttributeData/selectors/getAttributesByDataSourceKeysForFeatureKey', function () {
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

	it('Should select attributes', function () {
		const attributeDataSourceKeyAttributeKeyPairs = {
			dataSourceKey1: 'type',
			dataSourceKey2: 'value',
		};

		const expectedResult = {
			type: 'B',
			value: 10,
		};

		assert.deepStrictEqual(
			selectors.getAttributesByDataSourceKeysForFeatureKey(
				attributeDataSourceKeyAttributeKeyPairs,
				'featureKey2'
			),
			expectedResult
		);
	});

	it('Should return null if no pairs or feature key was given', function () {
		const attributeDataSourceKeyAttributeKeyPairs = {
			dataSourceKey1: 'type',
			dataSourceKey2: 'value',
		};

		assert.deepStrictEqual(
			selectors.getAttributesByDataSourceKeysForFeatureKey(
				attributeDataSourceKeyAttributeKeyPairs,
				null
			),
			null
		);
		assert.deepStrictEqual(
			selectors.getAttributesByDataSourceKeysForFeatureKey(null, 'featureKey2'),
			null
		);
	});

	it('Should return null if no data sources was found for given keys', function () {
		const attributeDataSourceKeyAttributeKeyPairs = {
			dataSourceKey78: 'type',
		};

		assert.deepStrictEqual(
			selectors.getAttributesByDataSourceKeysForFeatureKey(
				attributeDataSourceKeyAttributeKeyPairs,
				'featureKey2'
			),
			null
		);
	});

	it('Should omit attribute, if given featureKey does not exist in the data source', function () {
		const attributeDataSourceKeyAttributeKeyPairs = {
			dataSourceKey1: 'type',
			dataSourceKey2: 'value',
		};

		const expectedResult = {
			value: 11.17,
		};

		assert.deepStrictEqual(
			selectors.getAttributesByDataSourceKeysForFeatureKey(
				attributeDataSourceKeyAttributeKeyPairs,
				'featureKey3'
			),
			expectedResult
		);
	});

	it('Should return null, if given featureKey does not exist in any data source', function () {
		const attributeDataSourceKeyAttributeKeyPairs = {
			dataSourceKey1: 'type',
			dataSourceKey2: 'value',
		};

		assert.isNull(
			selectors.getAttributesByDataSourceKeysForFeatureKey(
				attributeDataSourceKeyAttributeKeyPairs,
				'featureKey4'
			)
		);
	});

	after(function () {
		setState(null);
	});
});
