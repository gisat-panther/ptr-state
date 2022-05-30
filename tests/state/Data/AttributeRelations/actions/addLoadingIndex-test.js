import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeRelations/actions';

describe('state/Data/AttributeRelations/actions/addLoadingIndex', function () {
	it('Dispatch action with LoadingIndex', function () {
		const attributeRelationsFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const pagination = {
			offset: 0,
			limit: 1,
		};

		const action = actions.addLoadingIndex(
			pagination,
			attributeRelationsFilter,
			order
		);
		assert.deepEqual(action, {
			type: 'DATA.ATTRIBUTE_RELATIONS.INDEX.ADD',
			filter: attributeRelationsFilter,
			order,
			data: [{key: true}],
			start: 1,
			count: null,
			changedOn,
		});
	});

	it('Dispatch action with LoadingIndex with offset 100', function () {
		const attributeRelationsFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const pagination = {
			offset: 100,
			limit: 5,
		};

		const action = actions.addLoadingIndex(
			pagination,
			attributeRelationsFilter,
			order
		);
		assert.deepEqual(action, {
			type: 'DATA.ATTRIBUTE_RELATIONS.INDEX.ADD',
			filter: attributeRelationsFilter,
			order,
			data: [{key: true}, {key: true}, {key: true}, {key: true}, {key: true}],
			start: 101,
			count: null,
			changedOn,
		});
	});
});
