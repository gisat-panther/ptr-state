import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';

describe('state/Data/actions/hasMissingSpatialData', function () {
	it('Find that has MissingAttributesData', function () {
		const attributeDataIndex = null;
		const spatialFilter = {
			tiles: [[0, 0]],
			level: 1,
		};
		const hasMissingSpatialData = actions.hasMissingSpatialData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingSpatialData, true);
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
		const hasMissingSpatialData = actions.hasMissingSpatialData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingSpatialData, true);
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
		const hasMissingSpatialData = actions.hasMissingSpatialData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingSpatialData, true);
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
		const hasMissingSpatialData = actions.hasMissingSpatialData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingSpatialData, false);
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
		const hasMissingSpatialData = actions.hasMissingSpatialData(
			attributeDataIndex,
			spatialFilter
		);
		assert.deepStrictEqual(hasMissingSpatialData, false);
	});
});
