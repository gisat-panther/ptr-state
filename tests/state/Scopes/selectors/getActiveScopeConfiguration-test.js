import {assert} from 'chai';
import selectors from '../../../../src/state/Scopes/selectors';

describe('getActiveScopeConfiguration', function () {
	const state = {
		scopes: {
			activeKey: 'scope1',
			byKey: {
				scope1: {
					key: 'scope1',
					data: {
						configuration: {
							a: 'A',
						},
					},
				},
				scope2: {
					key: 'scope2',
					data: {
						start: '2020-12-30',
						end: '2025-12-31',
					},
				},
				scope3: {
					key: 'scope3',
				},
			},
		},
	};

	it('should return active scope configuration', function () {
		const expectedOutput = {
			a: 'A',
		};
		const output = selectors.getActiveScopeConfiguration(state);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null if no configuration for active scope', function () {
		const output = selectors.getActiveScopeConfiguration({
			scopes: {...state.scopes, activeKey: 'scope2'},
		});
		assert.isNull(output);
	});

	it('should return null if no data for active scope', function () {
		const output = selectors.getActiveScopeConfiguration({
			scopes: {...state.scopes, activeKey: 'scope3'},
		});
		assert.isNull(output);
	});

	it('should return null if byKey is null', function () {
		const output = selectors.getActiveScopeConfiguration({
			scopes: {...state.scopes, byKey: null},
		});
		assert.isNull(output);
	});

	it('should return null if no active scope', function () {
		const output = selectors.getActiveScopeConfiguration({
			scopes: {...state.scopes, activeKey: null},
		});
		assert.isNull(output);
	});
});
