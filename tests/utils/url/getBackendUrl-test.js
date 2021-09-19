import {assert} from 'chai';
import url from '../../../src/utils/url';

describe('utils/url/getBackendUrl', function () {
	it('getBackendUrl', function () {
		assert.strictEqual(
			url.getBackendUrl(
				{
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
				'/api/login'
			),
			'http://localhost/backend/api/login'
		);
	});
});
