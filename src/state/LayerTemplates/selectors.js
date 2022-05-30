import common from '../_common/selectors';

const getSubstate = state => state.layerTemplates;

const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActiveModels = common.getActiveModels(getSubstate);
const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);
const getByKeysAsObject = common.getByKeysAsObject(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);

const getEditedActive = common.getEditedActive(getSubstate);
const getEditedAll = common.getEditedAll(getSubstate);
const getEditedAllAsObject = common.getEditedAllAsObject(getSubstate);
const getEditedByKey = common.getEditedByKey(getSubstate);
const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getEditedKeys = common.getEditedKeys(getSubstate);

const getIndexed = common.getIndexed(getSubstate);
const getStateToSave = common.getStateToSave(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);
const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getActiveModels,
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
