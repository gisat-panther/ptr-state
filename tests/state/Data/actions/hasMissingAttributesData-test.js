import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';

describe('state/Data/actions/hasMissingAttributesData', function () {
	it('Find that has MissingAttributesData', function () {
		const attributeDataIndex = null;
		const spatialFilter = {
			tiles: [[0, 0]],
			level: 1,
		};
		const hasMissingAttributesData = actions.hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingAttributesData, true);
	});

	it('Find that has MissingAttributesData _1', function () {
		const attributeDataIndex = {
			index: {
				1: {
					'0,0': true,
				},
			},
		};
		const spatialFilter = {
			tiles: [
				[0, 0],
				[0, 1],
			],
			level: 1,
		};
		const hasMissingAttributesData = actions.hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingAttributesData, true);
	});

	it('Find that has MissingAttributesData _2', function () {
		const attributeDataIndex = {
			index: {
				1: {
					'0,0': true,
				},
			},
		};
		const spatialFilter = {
			tiles: [[0, 0]],
			level: 2,
		};
		const hasMissingAttributesData = actions.hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingAttributesData, true);
	});

	it('Find that has no MissingAttributesData', function () {
		const attributeDataIndex = {
			index: {
				1: {
					'0,0': true,
				},
			},
		};
		const spatialFilter = {
			tiles: [[0, 0]],
			level: 1,
		};
		const hasMissingAttributesData = actions.hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingAttributesData, false);
	});

	it('Find that has no MissingAttributesData _2', function () {
		const attributeDataIndex = {
			index: {
				1: {
					'0,0': true,
				},
			},
		};
		const spatialFilter = {};
		const hasMissingAttributesData = actions.hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingAttributesData, false);
	});
});
