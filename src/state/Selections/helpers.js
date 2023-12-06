import {isEmpty as _isEmpty, forIn as _forIn} from 'lodash';

/**
 * Helper for feature keys - colours pairing
 * @param featureKeysFilter {Object}
 * @param featureKeysFilter.keys {Array} Previous feature keys
 * @param [featureKeysFilter.keyColourIndexPairs] {Object} Object, where key is feature key and value is index in colourPalette
 * @param newKeys {Array} List of new feature keys
 */
function getUpdatedFeatureKeysFilterForDistinctItems(
	featureKeysFilter,
	newKeys = []
) {
	if (featureKeysFilter) {
		const {keys: oldKeys, keyColourIndexPairs} = featureKeysFilter;

		// compare oldKeys and newKeys -> array of keys removed, array of keys added
		const {added, removed} = compareArrays(oldKeys, newKeys);

		const updatedPairs = {};

		// Go through keyColourIndexPairs and preserve all features which were not removed
		if (!_isEmpty(keyColourIndexPairs)) {
			_forIn(keyColourIndexPairs, (indexInPalette, featureKey) => {
				// not strict equal, because object keys are still represented as string, even if feature keys are numbers
				if (!removed.find(item => item == featureKey)) {
					updatedPairs[featureKey] = indexInPalette;
				}
			});
		}

		if (added.length) {
			// Sorting in ascending order
			let sortedColourIndexes = Object.values(updatedPairs)?.sort(
				(a, b) => a - b
			);

			let i = 0;
			// if index is missing, add the key for index since there is empty newKeys array
			while (added.length) {
				if (sortedColourIndexes[i] !== i) {
					const featureKeyToAdd = added.shift();
					updatedPairs[featureKeyToAdd] = i;
					sortedColourIndexes.splice(i, 0, i);
				}
				i++;
			}
		}

		return {
			keyColourIndexPairs: !_isEmpty(updatedPairs) ? updatedPairs : null,
			keys: newKeys,
		};
	} else {
		return new Error(
			'getUpdatedFeatureKeysFilterForDistinctItems: No featureKeysFilter given!'
		);
	}
}

/**
 * Compare two arrays and return an object with added and removed items.
 *
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {Object} An object with 'added' and 'removed' properties.
 */
function compareArrays(arr1, arr2) {
	// Find items in arr2 that are not present in arr1 (added items).
	const added = arr2.filter(item => !arr1.includes(item));

	// Find items in arr1 that are not present in arr2 (removed items).
	const removed = arr1.filter(item => !arr2.includes(item));

	// Return an object with added and removed items.
	return {
		added,
		removed,
	};
}

export default {
	compareArrays,
	getUpdatedFeatureKeysFilterForDistinctItems,
};
