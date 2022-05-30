import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getDataForCartesianChart-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select data for chart', function () {
		const expectedResult = {
			data: [
				{
					key: 'featureKey5',
					data: {
						attribute1: 6,
						attribute2: null,
					},
				},
				{
					key: 'featureKey1',
					data: {
						attribute1: 8,
						attribute2: 'A',
					},
				},
				{
					key: 'featureKey3',
					data: {
						attribute1: 10,
						attribute2: 'C',
					},
				},
			],
			keySourcePath: 'key',
			xSourcePath: 'data.attribute1',
			ySourcePath: 'data.attribute2',
			stateComponentKey: 'columnChart',
		};

		assert.deepStrictEqual(
			selectors.getDataForCartesianChart({stateComponentKey: 'columnChart'}),
			expectedResult
		);
	});

	it('Should select data, if no component settings', function () {
		const expectedResult = {
			data: [
				{
					key: 'featureKey2',
					data: {
						attribute1: 2,
					},
				},
				{
					key: 'featureKey4',
					data: {
						attribute1: 4,
					},
				},
				{
					key: 'featureKey5',
					data: {
						attribute1: 6,
					},
				},
			],
			stateComponentKey: 'componentE',
		};

		assert.deepStrictEqual(
			selectors.getDataForCartesianChart({stateComponentKey: 'componentE'}),
			expectedResult
		);
	});

	it('Should just return component settings, if no data', function () {
		const expectedResult = {
			data: [],
			keySourcePath: 'keyC',
			stateComponentKey: 'componentC',
		};

		assert.deepStrictEqual(
			selectors.getDataForCartesianChart({stateComponentKey: 'componentC'}),
			expectedResult
		);
	});

	it('Should just return component key, if no data and settings', function () {
		const expectedResult = {
			data: [],
			stateComponentKey: 'componentXY',
		};

		assert.deepStrictEqual(
			selectors.getDataForCartesianChart({stateComponentKey: 'componentXY'}),
			expectedResult
		);
	});

	after(function () {
		setState(null);
	});
});
