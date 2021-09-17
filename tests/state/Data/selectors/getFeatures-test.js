import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Data/selectors';
import {DataSelectorsState} from './_state';

describe('getFeatures', function () {
	before(function () {
		setState(DataSelectorsState);
	});

	let spatialDataSourceKey = 'spatialDataSourceA1',
		fidColumnName = 'fid';

	it('should select features', function () {
		const expectedResult = [
			{
				type: 'Feature',
				key: 'featureKeyA1',
				geometry: {
					type: 'Point',
					coordinates: [10, 50],
				},
				properties: {
					fid: 'featureKeyA1',
				},
			},
			{
				type: 'Feature',
				key: 'featureKeyA2',
				geometry: {
					type: 'Point',
					coordinates: [10, 51],
				},
				properties: {
					fid: 'featureKeyA2',
				},
			},
		];

		const output = selectors.getFeatures(spatialDataSourceKey, fidColumnName);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should select features with attributes', function () {
		const attributeDataSourceKeyAttributeKeyPairs = {
			attributeDataSourceA1: 'AverageAge',
			attributeDataSourceA2: 'Country',
		};

		const expectedResult = [
			{
				type: 'Feature',
				key: 'featureKeyA1',
				geometry: {
					type: 'Point',
					coordinates: [10, 50],
				},
				properties: {
					fid: 'featureKeyA1',
					AverageAge: 23.45,
					Country: 'Benin',
				},
			},
			{
				type: 'Feature',
				key: 'featureKeyA2',
				geometry: {
					type: 'Point',
					coordinates: [10, 51],
				},
				properties: {
					fid: 'featureKeyA2',
					Country: 'Mali',
				},
			},
		];

		const output = selectors.getFeatures(
			spatialDataSourceKey,
			fidColumnName,
			attributeDataSourceKeyAttributeKeyPairs
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null, if no data found for given dataSourceKey', function () {
		const output = selectors.getFeatures('spatialDataSourceXY', fidColumnName);
		assert.isNull(output);
	});

	after(function () {
		setState(null);
	});
});
