import {assert} from 'chai';
import flat from 'flat';
import ActionTypes from '../src/constants/ActionTypes';
import {
	expectedCommonMetadataActionTypes,
	expectedSpecificMetadataActionTypes,
} from './constants';

// import all reducers due to coverage overview
import {baseStores} from '../src/index';
import {set as _set} from 'lodash';

function testCache(testingFunction, params, expectedResult, otherParams) {
	it('should be cached', () => {
		if (!otherParams) {
			otherParams = params.map(param => null);
		}

		// first run of the selector should return computed value
		const firstOutput = testingFunction(...params);
		assert.deepStrictEqual(expectedResult, firstOutput);
		assert.notEqual(expectedResult, firstOutput);

		// second run to simulate different params
		testingFunction(...otherParams);

		// third run with the same params as the first one should return cached value
		const thirdOutput = testingFunction(...params);
		assert.equal(firstOutput, thirdOutput);
	});
}

/**
 * @param reducers {function}
 * @param state {Object}
 * @param actionTypes {Array}
 */
function baseReducersTestSet(reducers, state, actionTypes) {
	it('Should return the same state if no matching action type', function () {
		const action = {
			type: 'CREEPY_ACTION',
		};

		const output = reducers(state, action);
		assert.equal(output, state, `${actionTypes}`);
	});

	it('Should return the default state if no state given', function () {
		const action = {
			type: 'CREEPY_ACTION',
		};

		const output = reducers(undefined, action);
		assert.equal(output, state, `${actionTypes}`);
	});

	actionTypes &&
		actionTypes.forEach(type => {
			it('Reducer exists for given action types ' + type, function () {
				const action = {
					type,
				};
				assert.exists(reducers(state, action));
			});
		});
}

function baseReducersMetadataTestSet(
	reducers,
	state,
	actionTypesPath,
	expectedActionTypes
) {
	const expectedSpecificMetadataActionTypes = getExpectedSpecificActionTypes(
		actionTypesPath,
		expectedActionTypes
	);
	const specificMetadataActionTypes = getSpecificMetadataTypes(actionTypesPath);

	baseReducersTestSet(reducers, state, null);

	it('Should have defined expected action types', function () {
		assert.includeMembers(
			specificMetadataActionTypes,
			expectedSpecificMetadataActionTypes,
			`${actionTypesPath}`
		);
	});
}

function baseReducersDataTestSet(reducers, state, actionTypes) {
	baseReducersTestSet(reducers, state, actionTypes);
}

/**
 * @param selectors {Object} exported selectors for given substore
 * @param substore {string}
 * @param options {Object}
 */
function baseSelectorsTestSet(selectors, substore, options) {
	if (options.expectedSelectors) {
		it('Should export all expected selectors', function () {
			assert.containsAllKeys(
				selectors,
				options.expectedSelectors,
				`Failing for ${substore}`
			);
		});
	}

	it('Should select substate', function () {
		const defaultStateStructure = {
			activeKey: 'key1',
			byKey: {
				key1: 'Something',
			},
		};

		const state = {};

		_set(state, substore, defaultStateStructure);

		const expectedOutput = {
			activeKey: 'key1',
			byKey: {
				key1: 'Something',
			},
		};

		const output = selectors.getSubstate(state);
		assert.deepStrictEqual(output, expectedOutput, `Failing for ${substore}`);
	});
}

/**
 * @param substoreActionTypesPath {string} 'TAGS', 'SCOPES', ...
 * @param expectedActionTypes {Array} List of action types
 * @return {string[]}
 */
function getExpectedSpecificActionTypes(
	substoreActionTypesPath,
	expectedActionTypes
) {
	if (!expectedActionTypes) {
		return [...expectedSpecificMetadataActionTypes].map(
			actionType => `${substoreActionTypesPath}.${actionType}`
		);
	} else {
		return [...expectedActionTypes].map(
			actionType => `${substoreActionTypesPath}.${actionType}`
		);
	}
}

/**
 * @return {string[]}
 */
function getExpectedCommonMetadataActionTypes() {
	return expectedCommonMetadataActionTypes;
}

/**
 * Get action types for given substore
 * @param substoreActionTypesPath {string}
 * @return {string[]}
 */
function getSpecificMetadataTypes(substoreActionTypesPath) {
	return Object.values(flat(ActionTypes[substoreActionTypesPath]));
}

export default {
	testCache,
	baseReducersTestSet,
	baseReducersDataTestSet,
	baseReducersMetadataTestSet,
	baseSelectorsTestSet,

	getSpecificMetadataTypes,
	getExpectedCommonMetadataActionTypes,
	getExpectedSpecificActionTypes,
};
