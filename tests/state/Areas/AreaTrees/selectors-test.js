import {assert} from 'chai';
import selectors from '../../../../src/state/Areas/AreaTrees/selectors';

describe('state/Areas/AreaTrees/selectors', function () {
	it('getActiveKey', function () {
		const state = {
			areas: {
				areaTrees: {activeKey: 'k'},
			},
		};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getActive', function () {
		const createState = activeKey => ({
			areas: {
				areaTrees: {
					byKey: {
						k1: {n: 1},
						k2: {n: 2},
						k3: {n: 3, removed: true},
					},
					activeKey,
				},
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

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				areas: {
					areaTrees: 'subst',
				},
			}),
			'subst'
		);
	});

	describe('getByKeys', function () {
		const tests = [
			{
				name: 'null keys',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					areas: {
						areaTrees: {},
					},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: ['k1', 'k2'],
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKeys(test.state, test.keys),
					test.expectedResult
				);
			});
		});
	});

	describe('getByKeysAsObject', function () {
		const tests = [
			{
				name: 'null keys',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					areas: {
						areaTrees: {
							byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
						},
					},
				},
				keys: ['k1', 'k2'],
				expectedResult: {
					k1: {n: 1},
					k2: {n: 2},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKeysAsObject(test.state, test.keys),
					test.expectedResult
				);
			});
		});
	});
});
