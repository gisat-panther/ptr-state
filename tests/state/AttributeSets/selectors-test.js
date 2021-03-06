import {assert} from 'chai';
import selectors from '../../../src/state/AttributeSets/selectors';

describe('state/AttributeSets/selectors', function () {
	describe('getActive', function () {
		const createState = (activeKey) => ({
			attributeSets: {
				byKey: {
					k1: {n: 1},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(selectors.getActive(createState('k1')), {
				n: 1,
			});
		});

		it('select inactive', function () {
			assert.isNull(selectors.getActive(createState('k3')));
		});
	});

	it('getActiveKeys', function () {
		const state = {attributeSets: {activeKeys: ['k1', 'k2']}};

		assert.deepStrictEqual(selectors.getActiveKeys(state), ['k1', 'k2']);
	});

	describe('getAttributeSets', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributeSets: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					attributeSets: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					attributeSets: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAttributeSets(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getByTopics', function () {
		const tests = [
			{
				name: 't0',
				state: {
					attributeSets: {
						byKey: {
							k1: {n: 1, data: {topic: 't1'}},
							k2: {n: 2, data: {topic: 't1'}},
							k3: {n: 3, data: {topic: 't2'}},
						},
					},
				},
				topics: ['t0'],
				expectedResult: null,
			},
			{
				name: 't1',
				state: {
					attributeSets: {
						byKey: {
							k1: {n: 1, data: {topic: 't1'}},
							k2: {n: 2, data: {topic: 't1'}},
							k3: {n: 3, data: {topic: 't2'}},
						},
					},
				},
				topics: ['t1'],
				expectedResult: [
					{n: 1, data: {topic: 't1'}},
					{n: 2, data: {topic: 't1'}},
				],
			},
			{
				name: 't2',
				state: {
					attributeSets: {
						byKey: {
							k1: {n: 1, data: {topic: 't1'}},
							k2: {n: 2, data: {topic: 't1'}},
							k3: {n: 3, data: {topic: 't2'}},
						},
					},
				},
				topics: ['t2'],
				expectedResult: [{n: 3, data: {topic: 't2'}}],
			},
			{
				name: 't1, t2',
				state: {
					attributeSets: {
						byKey: {
							k1: {n: 1, data: {topic: 't1'}},
							k2: {n: 2, data: {topic: 't1'}},
							k3: {n: 3, data: {topic: 't2'}},
						},
					},
				},
				topics: ['t1', 't2'],
				expectedResult: [
					{n: 1, data: {topic: 't1'}},
					{n: 2, data: {topic: 't1'}},
					{n: 3, data: {topic: 't2'}},
				],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByTopics(test.state, test.topics),
					test.expectedResult
				);
			});
		});
	});

	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'default state',
				state: {attributeSets: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				state: {attributeSets: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				state: {attributeSets: {activeKeys: ['k1', 'k2']}},
				expectedResult: {activeKeys: ['k1', 'k2']},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getStateToSave(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getUniqueAttributeKeysForTopics', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeSets: {
						byKey: {
							k1: {
								n: 1,
								data: {topic: 't1', attributes: ['at1', 'at2']},
							},
							k2: {
								n: 2,
								data: {topic: 't1', attributes: ['at1', 'at3']},
							},
							k3: {n: 3, data: {topic: 't2', attributes: []}},
						},
					},
				},
				topics: ['t1', 't2'],
				expectedResult: ['at1', 'at2', 'at3'],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getUniqueAttributeKeysForTopics(
						test.state,
						test.topics
					),
					test.expectedResult
				);
			});
		});
	});
});
