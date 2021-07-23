import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import {forIn as _forIn} from 'lodash';
import commonHelpers from '../../_common/helpers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
	byDataSourceKey: {},
};

const getEmptyFeature = () => {
	return {
		geometries: {},
	};
};

/**
 * Add spatial data
 * @param state {Object}
 * @param action {Object}
 * @param action.key {String} Data source key
 * @param action.level {number} Zoom level
 * @param action.data {Object} Features as object
 * @return {Object}
 */

const add = (state, action) => {
	const dataSourceKey = action.key;
	const updatedDataForDataSourceKey = getUpdatedDataForDataSourceKey(
		state,
		dataSourceKey,
		action.data,
		action.level
	);

	return {
		...state,
		byDataSourceKey: {
			...state.byDataSourceKey,
			[dataSourceKey]: updatedDataForDataSourceKey,
		},
	};
};

const addWithTiledIndex = (state, action) => {
	const updatedByDataSourceKey = getUpdatedByDataSourceKey(
		state,
		action.dataByDataSourceKey,
		action.level
	);
	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		action.filter,
		action.order,
		action.indexData,
		action.changedOn
	);

	return {
		...state,
		byDataSourceKey: updatedByDataSourceKey,
		indexes: updatedIndexes,
	};
};

const addIndex = (state, action) => {
	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		action.filter,
		action.order,
		action.indexData,
		action.changedOn
	);

	return {
		...state,
		indexes: updatedIndexes,
	};
};

/**
 * Remove index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const removeIndex = (state, action) => {
	const updatedIndexes = commonHelpers.removeIndex(
		state.indexes,
		action.filter,
		action.order
	);
	return {
		...state,
		indexes: updatedIndexes,
	};
};

// helpers

/**
 * @param state {Object}
 * @param dataSourceKey {string} uuid
 * @param featuresAsObject {Object}
 * @param level {number}
 * @return {Object}
 */
function getUpdatedDataForDataSourceKey(
	state,
	dataSourceKey,
	featuresAsObject,
	level
) {
	// TODO what about features adding without level?
	const dataFeaturesKeys = Object.keys(featuresAsObject);
	let updatedData = state.byDataSourceKey[dataSourceKey]
		? {...state.byDataSourceKey[dataSourceKey]}
		: {};

	dataFeaturesKeys.forEach(featureKey => {
		if (updatedData.hasOwnProperty(featureKey)) {
			//add just level geometry to existing feature
			updatedData[featureKey].geometries[level] = featuresAsObject[featureKey];
		} else {
			//create new feature with geometry and add to state
			const newFeature = getEmptyFeature();
			newFeature.geometries[level] = featuresAsObject[featureKey];
			updatedData = {...updatedData, [featureKey]: {...newFeature}};
		}
	});

	return updatedData;
}

function getUpdatedByDataSourceKey(state, dataByDataSourceKey, level) {
	let updatedData = {...state.byDataSourceKey};

	_forIn(dataByDataSourceKey, (data, dataSourceKey) => {
		if (!updatedData.hasOwnProperty(dataSourceKey)) {
			updatedData[dataSourceKey] = {};
		}

		const newFeatures = {};
		_forIn(data, (geometry, featureKey) => {
			const existingFeature = updatedData[dataSourceKey].hasOwnProperty(
				featureKey
			);
			if (existingFeature) {
				//add just level geometry to existing feature
				updatedData[dataSourceKey][featureKey].geometries[level] = geometry;
			} else {
				//create new feature with geometry and add to state
				const newFeature = getEmptyFeature();
				newFeature.geometries[level] = geometry;
				newFeatures[featureKey] = newFeature;
			}
		});

		updatedData[dataSourceKey] = {
			...updatedData[dataSourceKey],
			...newFeatures,
		};
	});

	return updatedData;
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.SPATIAL_DATA.ADD:
			return add(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.ADD_WITH_TILED_INDEX:
			return addWithTiledIndex(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.INDEX.ADD:
			return addIndex(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.INDEX.REMOVE:
			return removeIndex(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.UPDATE_STORE:
			return common.updateStore(state, action);
		default:
			return state;
	}
};
