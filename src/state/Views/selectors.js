import {createSelector} from 'reselect';

import common from '../_common/selectors';

import attributesSelectors from '../Attributes/selectors';
import attributeSetsSelectors from '../AttributeSets/selectors';
import componentsSelectors from '../Components/selectors';
import scopesSelectors from '../Scopes/selectors';

const getSubstate = state => state.views;

const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);
const getByKeysAsObject = common.getByKeysAsObject(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getEditedActive = common.getEditedActive(getSubstate);
const getEditedAll = common.getEditedAll(getSubstate);
const getEditedAllAsObject = common.getEditedAllAsObject(getSubstate);
const getEditedByKey = common.getEditedByKey(getSubstate);
const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getEditedKeys = common.getEditedKeys(getSubstate);

const getIndexed = common.getIndexed(getSubstate);

const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);
const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

// TODO add other stores
const getStateToSave = createSelector(
	[
		attributesSelectors.getStateToSave,
		attributeSetsSelectors.getStateToSave,
		componentsSelectors.getStateToSave,
		scopesSelectors.getStateToSave,
	],
	(attributes, attributeSets, components, scopes) => {
		return {
			attributes,
			attributeSets,
			components,
			scopes,
		};
	}
);

export default {
	getActive,
	getActiveKey,
	getAll,
	getAllAsObject,

	getByKey,
	getByKeys,
	getByKeysAsObject,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedActive,
	getEditedAll,
	getEditedAllAsObject,
	getEditedByKey,
	getEditedDataByKey,
	getEditedKeys,

	getIndexed,

	getStateToSave,
	getSubstate,

	getUpdatePermissionByKey,
	getUsedKeysForComponent,

	haveAllKeysRegisteredUse,
};
