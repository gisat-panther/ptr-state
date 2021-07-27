import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Data/selectors';
import {DataSelectorsState} from './_state';

describe('getTiles', function () {
	before(function () {
		setState(DataSelectorsState);
	});

	const spatialDataSourceKey = 'spatialDataSource1',
		fidColumnName = 'fid',
		level = 6,
		previousLevel = 7,
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
	it('should select populated tiles', function () {
		const tiles = [
			[0, 0],
			[0, 1],
		];
		const expectedResult = [
			{
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
			},
			{
				level: 6,
				tile: '0,1',
				features: [
					{
						type: 'Feature',
						key: 'featureKey3',
						geometry: {
							type: 'Point',
							coordinates: [0.4, 1.2],
						},
						properties: {
							fid: 'featureKey3',
							attribute1: 'C',
							attribute2: 10,
						},
					},
				],
			},
		];

		const result = selectors.getTiles(
			spatialDataSourceKey,
			fidColumnName,
			level,
			previousLevel,
			tiles,
			spatialRelationsFilter,
			attributeRelationsFilter,
			attributeDataSourceKeyAttributeKeyPairs,
			styleKey,
			attributeDataFilter
		);

		assert.deepStrictEqual(result, expectedResult);
	});

	it('should select populated tiles only', function () {
		const tiles = [
			[0, 0],
			[1, 0],
		];

		const expectedResult = [
			{
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
			},
		];

		const result = selectors.getTiles(
			spatialDataSourceKey,
			fidColumnName,
			level,
			previousLevel,
			tiles,
			spatialRelationsFilter,
			attributeRelationsFilter,
			attributeDataSourceKeyAttributeKeyPairs,
			styleKey,
			attributeDataFilter
		);

		assert.deepStrictEqual(result, expectedResult);
	});

	it('should return null, if no tiles given', function () {
		const tiles = [];
		const result = selectors.getTiles(
			spatialDataSourceKey,
			fidColumnName,
			level,
			tiles,
			spatialRelationsFilter,
			attributeRelationsFilter,
			attributeDataSourceKeyAttributeKeyPairs,
			styleKey,
			attributeDataFilter
		);
		assert.isNull(result);
	});

	it('should return null, no tile is populated', function () {
		const tiles = [
			[1, 0],
			[2, 0],
		];
		const result = selectors.getTiles(
			spatialDataSourceKey,
			fidColumnName,
			level,
			tiles,
			spatialRelationsFilter,
			attributeRelationsFilter,
			attributeDataSourceKeyAttributeKeyPairs,
			styleKey,
			attributeDataFilter
		);
		assert.isNull(result);
	});

	after(function () {
		setState(null);
	});
});
