import {assert} from 'chai';
import helpers from '../../../../src/state/Selections/helpers';

// Test case 1: Arrays have common elements.
describe('Compare Arrays', () => {
	it('should return added and removed elements', () => {
		const array1 = [1, 2, 3, 4, 5];
		const array2 = [3, 4, 5, 6, 7];
		const result = helpers.compareArrays(array1, array2);

		assert.deepStrictEqual(result, {
			added: [6, 7],
			removed: [1, 2],
		});
	});

	// Test case 2: Arrays are completely different.
	it('should return all elements as added and removed', () => {
		const array1 = [1, 2, 3];
		const array2 = [4, 5, 6];
		const result = helpers.compareArrays(array1, array2);

		assert.deepStrictEqual(result, {
			added: [4, 5, 6],
			removed: [1, 2, 3],
		});
	});

	// Test case 3: Arrays are identical.
	it('should return empty added and removed arrays', () => {
		const array1 = [1, 2, 3];
		const array2 = [1, 2, 3];
		const result = helpers.compareArrays(array1, array2);

		assert.deepStrictEqual(result, {
			added: [],
			removed: [],
		});
	});
});
