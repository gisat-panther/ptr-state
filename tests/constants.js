import {utils} from '@gisatcz/ptr-utils';
export const sampleSubstoreName = 'sub';

// Selectors -------------------------------------------------------------------
const baseMetadataSelectors = [
	'getActive',
	'getActiveKey',
	'getAll',
	'getAllAsObject',
	'getByKey',
	'getByKeys',
	'getByKeysAsObject',
	'getDataByKey',
	'getDeletePermissionByKey',
	'getEditedActive',
	'getEditedAll',
	'getEditedAllAsObject',
	'getEditedByKey',
	'getEditedDataByKey',
	'getEditedKeys',
	'getIndexed',
	'getStateToSave',
	'getSubstate',
	'getUpdatePermissionByKey',
	'getUsedKeysForComponent',
	'haveAllKeysRegisteredUse',
];

export const expectedMetadataSelectors = [
	...baseMetadataSelectors,
	'getActiveKeys',
	'getActiveModels',
];

export const expectedScopesSelectors = [...baseMetadataSelectors];
export const expectedLayerTreesSelectors = [...baseMetadataSelectors];
export const expectedStylesSelectors = [...baseMetadataSelectors];
export const expectedViewsSelectors = [...baseMetadataSelectors];

export const expectedDataSpatialRelationsSelectors = [
	'getAll',
	'getSubstate',
	'getIndex',
];

export const expectedDataTimeSerieRelationsSelectors = [
	'getIndex',
	'getSubstate',
];

export const expectedDataTimeSerieSelectors = [
	'getIndex_recompute',
	'getAllAsObjectObserver',
	'getSubstate',
];

const getDeepValues = obj => {
	const values = [];
	for (const [key, value] of Object.entries(obj)) {
		if (typeof obj[key] === 'object') {
			const subvalues = getDeepValues(obj[key]);
			values.push(...subvalues);
		} else {
			values.push(value);
		}
	}
	return values;
};

// Action types ----------------------------------------------------------------
export const baseMetadataActionTypesObj = utils.deepKeyMirror({
	ADD: null,
	ADD_UNRECEIVED: null,
	DELETE: null,
	MARK_DELETED: null,
	EDITED: {
		REMOVE: null,
		REMOVE_PROPERTY: null,
		UPDATE: null,
	},
	ENSURE: {
		ERROR: null,
	},
	INDEX: {
		ADD: null,
		CLEAR_INDEX: null,
		CLEAR_ALL: null,
	},
	LOAD: {
		ERROR: null,
		REQUEST: null,
	},
	UPDATE_STORE: null,
	USE: {
		INDEXED: {
			CLEAR: null,
			CLEAR_ALL: null,
			REGISTER: null,
		},
		KEYS: {
			CLEAR: null,
			REGISTER: null,
		},
	},
});

export const commonActionTypesObj = utils.deepKeyMirror({
	SET_ACTIVE_KEY: null,
	SET_ACTIVE_KEYS: null,
	...baseMetadataActionTypesObj,
});

export const baseMetadataActionTypes = getDeepValues(
	baseMetadataActionTypesObj
);

export const expectedSpecificMetadataActionTypesObj = utils.deepKeyMirror({
	SET_ACTIVE_KEY: null,
	SET_ACTIVE_KEYS: null,
	...baseMetadataActionTypesObj,
	EDITED: {
		...baseMetadataActionTypesObj.EDITED,
		REMOVE_ACTIVE: null,
	},
});

export const expectedSpecificMetadataActionTypes = getDeepValues(
	expectedSpecificMetadataActionTypesObj
);

export const expectedLayerTreesActionTypes = [...baseMetadataActionTypes];
export const expectedScopesActionTypesObj = utils.deepKeyMirror({
	...baseMetadataActionTypesObj,
	EDITED: {
		...baseMetadataActionTypesObj.EDITED,
		REMOVE_ACTIVE: null,
	},
});
export const expectedScopesActionTypes = getDeepValues(
	expectedScopesActionTypesObj
);

export const expectedViewsActionTypesObj = utils.deepKeyMirror({
	...baseMetadataActionTypesObj,
	EDITED: {
		...baseMetadataActionTypesObj.EDITED,
		REMOVE_ACTIVE: null,
	},
});
export const expectedViewsActionTypes = getDeepValues(
	expectedViewsActionTypesObj
);

export const expectedCommonMetadataActionTypesObj = utils.deepKeyMirror({
	COMMON: {
		DATA: {
			SET_OUTDATED: null,
			CLEANUP_ON_LOGOUT: null,
		},
	},
});

export const expectedCommonMetadataActionTypes = getDeepValues(
	expectedCommonMetadataActionTypesObj
);
