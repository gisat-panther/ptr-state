import {assert} from 'chai';
import selectors from '../../../../src/state/Areas/AreaTreeLevels/selectors';

describe('state/Areas/AreaTreeLevels/selectors', function () {
	it('getActiveKey', function () {
		const state = {
			areas: {
				areaTreeLevels: {activeKey: 'k'},
			},
		};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getActive', function () {
		const createState = activeKey => ({
			areas: {
				areaTreeLevels: {
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
					areaTreeLevels: 'subst',
				},
			}),
			'subst'
		);
	});
});
