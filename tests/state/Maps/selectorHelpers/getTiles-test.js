import {assert} from 'chai';
import selectorHelpers from '../../../../src/state/Maps/selectorHelpers';
import testHelpers from '../../../helpers';

describe('getTiles', function () {
	// method is just a composition of methods from different packages, where each method should be tested properly

	const width = 100;
	const height = 100;
	const boxRange = 5000000;
	const center = {
		lat: 0,
		lon: 0,
	};
	const expectedResult = [
		[-90, 0],
		[0, 0],
		[-90, -90],
		[0, -90],
	];

	it('should return tiles', () => {
		assert.sameDeepMembers(
			selectorHelpers.getTiles(width, height, center, boxRange),
			expectedResult
		);
	});

	testHelpers.testCache(
		selectorHelpers.getTiles,
		[width, height, center, boxRange],
		expectedResult
	);
});
