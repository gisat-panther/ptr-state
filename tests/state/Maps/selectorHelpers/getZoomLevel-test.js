import {assert} from 'chai';
import selectorHelpers from '../../../../src/state/Maps/selectorHelpers';

describe('getZoomLevel', function () {
	// method is just a composition of methods from different packages, where each method should be tested properly

	it('should return zoom level', () => {
		const width = 100;
		const height = 100;
		const boxRange = 1000;
		const expectedResult = 13;

		assert.deepStrictEqual(
			selectorHelpers.getZoomLevel(width, height, boxRange),
			expectedResult
		);
	});

	it('should return zoom level', () => {
		const width = 100;
		const height = 100;
		const boxRange = 10000000;
		const expectedResult = 0;

		assert.deepStrictEqual(
			selectorHelpers.getZoomLevel(width, height, boxRange),
			expectedResult
		);
	});
});
