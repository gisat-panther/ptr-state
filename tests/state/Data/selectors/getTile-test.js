import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Data/selectors';
import {DataSelectorsState} from './_state';

describe('getTile', function () {
	before(function () {
		setState(DataSelectorsState);
	});

	describe('Selection of populated tile', function () {
		let spatialDataSourceKey = 'spatialDataSource1',
			fidColumnName = 'fid',
			level = 6,
			tile = [0, 0],
			spatialRelationsFilter = {
				modifiers: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
			},
			attributeRelationsFilter = {
				modifiers: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
				styleKey: 'style1',
			},
			attributeDataSourceKeyAttributeKeyPairs = {
				attributeDataSource1: 'attribute1',
				attributeDataSource2: 'attribute2',
			},
			styleKey = 'style1',
			attributeDataFilter = attributeRelationsFilter;

		let firstRunResult;
		it('should select populated tile 1', function () {
			const expectedResult = {
				level: 6,
				tile: '0,0',
				features: [
					{
						type: 'Feature',
						key: 'featureKey1',
						geometry: {
							type: 'Point',
							coordinates: [0.2, 0.2],
						},
						properties: {
							fid: 'featureKey1',
							attribute1: 'A',
							attribute2: null,
						},
					},
					{
						type: 'Feature',
						key: 'featureKey2',
						geometry: {
							type: 'Point',
							coordinates: [0.7, 0.7],
						},
						properties: {
							fid: 'featureKey2',
							attribute1: 'B',
							attribute2: null,
						},
					},
				],
			};

			firstRunResult = selectors.getTile(
				spatialDataSourceKey,
				fidColumnName,
				level,
				tile,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeDataSourceKeyAttributeKeyPairs,
				styleKey,
				attributeDataFilter
			);

			assert.deepStrictEqual(firstRunResult, expectedResult);
		});

		it('should select populated tile 2', function () {
			spatialDataSourceKey = 'spatialDataSource2';

			const expectedResult = {
				level: 6,
				tile: '0,0',
				features: [
					{
						type: 'Feature',
						key: 'featureKey11',
						geometry: {
							type: 'Point',
							coordinates: [0.3, 0.4],
						},
						properties: {
							fid: 'featureKey11',
							attribute1: 'A',
							attribute2: 105,
						},
					},
				],
			};

			assert.deepStrictEqual(
				selectors.getTile(
					spatialDataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				),
				expectedResult
			);
		});

		it('should select populated tile 3', function () {
			spatialDataSourceKey = 'spatialDataSource3';
			level = 7;
			tile = '0.5,0.5';

			const expectedResult = {
				level: 7,
				tile: '0.5,0.5',
				features: [
					{
						type: 'Feature',
						key: 'featureKey21',
						geometry: {
							type: 'Point',
							coordinates: [0.75, 0.7],
						},
						properties: {
							fid: 'featureKey21',
							attribute1: null,
							attribute2: null,
						},
					},
				],
			};

			assert.deepStrictEqual(
				selectors.getTile(
					spatialDataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				),
				expectedResult
			);
		});

		it('should return cached value', function () {
			spatialDataSourceKey = 'spatialDataSource1';
			level = 6;
			tile = '0,0';

			// Third run - return cached value
			const cachedResult = selectors.getTile(
				spatialDataSourceKey,
				fidColumnName,
				level,
				tile,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeDataSourceKeyAttributeKeyPairs,
				styleKey,
				attributeDataFilter
			);

			assert.strictEqual(cachedResult, firstRunResult);
		});
	});

	describe('Returning null', function () {
		let spatialDataSourceKey = 'spatialDataSource1',
			fidColumnName = 'fid',
			level = 6,
			tile = [0, 0],
			spatialRelationsFilter = {
				modifiers: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
			},
			attributeRelationsFilter = {
				modifiers: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
				styleKey: 'style1',
			},
			attributeDataSourceKeyAttributeKeyPairs = {
				attributeDataSource1: 'attribute1',
				attributeDataSource2: 'attribute2',
			},
			styleKey = 'style1',
			attributeDataFilter = attributeRelationsFilter;

		it('no data for given level', function () {
			level = 8;

			assert.isNull(
				selectors.getTile(
					spatialDataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				)
			);
		});

		it('no data for given tile', function () {
			tile = [2, 2];

			assert.isNull(
				selectors.getTile(
					spatialDataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				)
			);
		});

		it('if spatial data source with given key does not exist', function () {
			spatialDataSourceKey = 'spatialDataSourceXY';

			assert.isNull(
				selectors.getTile(
					spatialDataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				)
			);
		});

		it('no data indexed for given spatial data source', function () {
			spatialDataSourceKey = 'spatialDataSource4';

			assert.isNull(
				selectors.getTile(
					spatialDataSourceKey,
					fidColumnName,
					level,
					tile,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataSourceKeyAttributeKeyPairs,
					styleKey,
					attributeDataFilter
				)
			);
		});
	});

	after(function () {
		setState(null);
	});
});
