import {assert} from 'chai';
import selectorHelpers from '../../../../src/state/Maps/selectorHelpers';
import testHelpers from '../../../helpers';

describe('getBackgroundLayerAsLayer', function () {
	const backgroundLayer = {
		layerTemplateKey: 'layerTemplate-uuid',
	};

	const expectedResult = {
		key: 'pantherBackgroundLayer',
		layerTemplateKey: 'layerTemplate-uuid',
	};

	it('should return backgroundLayer as layer', () => {
		// check structure
		assert.deepStrictEqual(
			selectorHelpers.getBackgroundLayerAsLayer(backgroundLayer),
			expectedResult
		);
	});

	testHelpers.testCache(
		selectorHelpers.getBackgroundLayerAsLayer,
		[backgroundLayer],
		expectedResult
	);
});
