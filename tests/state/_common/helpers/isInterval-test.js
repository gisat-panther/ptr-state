import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('isInterval', function () {
	it('should return true', () => {
		const interval = {
			start: 1,
			length: 1,
		};
		const output = commonHelpers.isInterval(interval);
		assert.isTrue(output);
	});

	it('should return false', () => {
		const interval = {
			start: '1',
			length: 1,
		};
		const output = commonHelpers.isInterval(interval);
		assert.isFalse(output);
	});

	it('should return false 2', () => {
		const interval = {
			start: true,
			length: true,
		};
		const output = commonHelpers.isInterval(interval);
		assert.isFalse(output);
	});

	it('should return false 3', () => {
		const interval = {
			star: 1,
			lengt: 5,
		};
		const output = commonHelpers.isInterval(interval);
		assert.isFalse(output);
	});

	it('should return false 4', () => {
		const output = commonHelpers.isInterval();
		assert.isFalse(output);
	});
});
