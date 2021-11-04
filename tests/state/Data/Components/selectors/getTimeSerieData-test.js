import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getTimeSerieData-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select null for unknown componentKey', function () {
		const expectedResult = null;
		const data = selectors.getTimeSerieData('unknownComponentKey');
		assert.deepStrictEqual(data, expectedResult);
	});

	it('Should select time serie data for given component key', function () {
		const expectedResult = {
			dsKey1: [
				{
					key: 'featureKey1',
					data: [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
				},
				{
					key: 'featureKey2',
					data: [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
				{
					key: 'featureKey4',
					data: [
						{
							period: '2021-1',
							value: 1,
						},
						{
							period: '2021-11',
							value: 'hehe',
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			],
			dsKey2: [
				{
					key: 'featureKey3',
					data: [
						{
							period: '2021-01',
							value: 1,
						},
						{
							period: '2021-02',
							value: 'hehe',
						},
					],
				},
				{
					key: 'featureKey44',
					data: [
						{
							period: '2021-10',
							value: 1,
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
				{
					key: 'featureKey55',
					data: [
						{
							period: '2021-1',
							value: 1,
						},
						{
							period: '2021-11',
							value: 'hehe',
						},
						{
							period: '2021-12',
							value: 'hehe',
						},
					],
				},
			],
		};
		const data = selectors.getTimeSerieData('columnChartTimeSerie');
		assert.deepStrictEqual(data, expectedResult);
	});

	after(function () {
		setState(null);
	});
});
