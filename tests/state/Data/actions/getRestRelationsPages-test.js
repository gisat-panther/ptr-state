import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';

describe('state/Data/actions/getRestRelationsPages', function () {
	it('No page is missing', function () {
		assert.strictEqual(actions.getRestRelationsPages(100, 100, 100, 100), 0);
	});

	it('One page is missing for attributeRelations', function () {
		assert.strictEqual(actions.getRestRelationsPages(101, 100, 100, 100), 1);
	});
	it('One page is missing for spatialRelations', function () {
		assert.strictEqual(actions.getRestRelationsPages(100, 101, 100, 100), 1);
	});

	it('Two page are missing for spatialRelations while spatialRelations is 299', function () {
		assert.strictEqual(actions.getRestRelationsPages(100, 299, 100, 100), 2);
	});

	it('Two page are missing for spatialRelations while spatialRelations is 300', function () {
		assert.strictEqual(actions.getRestRelationsPages(100, 300, 100, 100), 2);
	});

	it('No page is missing cause no data are required.', function () {
		assert.strictEqual(actions.getRestRelationsPages(0, 0, 0, 100), 0);
	});
});
