import {assert} from 'chai';
import selectors from '../../../../../src/state/Data/SpatialDataSources/selectors';

describe('state/Data/SpatialDataSources/selectors', function () {
	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				data: {
					spatialDataSources: 'subst',
				},
			}),
			'subst'
		);
	});
});
