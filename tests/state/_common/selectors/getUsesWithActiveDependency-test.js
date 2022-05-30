import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getUsesWithActiveDependency', () => {
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

	it('should return uses with active dependency', () => {
		const filterByActive = {
			place: true,
		};
		const expectedOutput = [
			{
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
			},
		];
		const output = commonSelectors.getUsesWithActiveDependency(getSubstate)(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null if no filter by active given', () => {
		const filterByActive = null;
		const output = commonSelectors.getUsesWithActiveDependency(getSubstate)(
			state,
			filterByActive
		);
		assert.isNull(output);
	});

	it('should return null, if no indexed usages', () => {
		const filterByActive = {
			place: true,
		};
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
		const output = commonSelectors.getUsesWithActiveDependency(getSubstate)(
			state2,
			filterByActive
		);
		assert.isNull(output);
	});

	it('should return null if no used indexes', () => {
		const filterByActive = {
			place: true,
		};
		const state2 = {
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
								length: 0, // not valid length
							},
						],
					},
				},
			},
		};
		const output = commonSelectors.getUsesWithActiveDependency(getSubstate)(
			state2,
			filterByActive
		);
		assert.isNull(output);
	});
});
