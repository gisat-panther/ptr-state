import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getUsedIndexPage', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		places: {
			activeKey: 'place1',
		},
		[sampleSubstoreName]: {
			inUse: {
				indexes: {
					ComponentA: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 1,
							length: 10,
						},
					],
					ComponentB: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 3,
							length: 7,
						},
					],
					ComponentC: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 12,
							length: 3,
						},
					],
					ComponentD: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 12,
							length: 4,
						},
						{
							filter: {
								scopeKey: 'scope2',
							},
							order: null,
							start: 3,
							length: 3,
						},
					],
					ComponentE: [
						{
							filter: {
								scopeKey: 'scope2',
							},
							order: null,
							start: 1,
							length: 5,
						},
					],
				},
			},
		},
	};

	it('should return used index page', () => {
		const filter = {
			scopeKey: 'scope1',
			placeKey: 'place1',
		};
		const order = null;
		const expectedOutput = {
			filter: {
				scopeKey: 'scope1',
				placeKey: 'place1',
			},
			order: null,
			uses: [
				{
					start: 1,
					length: 10,
				},
				{
					start: 12,
					length: 4,
				},
			],
		};
		const output = commonSelectors.getUsedIndexPage(getSubstate)(
			state,
			filter,
			order
		);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return used index page 2', () => {
		const filter = {
			scopeKey: 'scope2',
		};
		const order = null;
		const expectedOutput = {
			filter: {
				scopeKey: 'scope2',
			},
			order: null,
			uses: [
				{
					start: 1,
					length: 5,
				},
			],
		};
		const output = commonSelectors.getUsedIndexPage(getSubstate)(
			state,
			filter,
			order
		);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null, if no indexed usages', () => {
		const filter = {
			scopeKey: 'scope2',
		};
		const order = null;
		const state2 = {
			places: {
				activeKey: 'place1',
			},
			[sampleSubstoreName]: {
				inUse: {
					indexes: {},
				},
			},
		};
		const output = commonSelectors.getUsedIndexPage(getSubstate)(
			state2,
			filter,
			order
		);
		assert.isNull(output);
	});
});
