import {assert} from 'chai';
import {getPageSize} from '../../../../src/state/Data/helpers';

describe('state/Data/helpers/getPageSize', function () {
	it('It return pageSize from state', function () {
		const localConfiguration = {
			requestPageSize: 99,
		};
		assert.strictEqual(getPageSize(localConfiguration), 99);
	});
	it('It return pageSize from ptr-core', function () {
		const localConfiguration = {};
		assert.strictEqual(getPageSize(localConfiguration), 100);
	});
});
