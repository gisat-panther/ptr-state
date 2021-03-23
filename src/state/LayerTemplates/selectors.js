import common from '../_common/selectors';

const getSubstate = state => state.layerTemplates;

const getActiveKey = common.getActiveKey(getSubstate);
const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getByKey = common.getByKey(getSubstate);
const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);
const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getIndexed = common.getIndexed(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);
const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

export default {
	getActiveKey,
	getAll,
	getAllAsObject,

	getByKey,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedDataByKey,

	getIndexed,

	getUpdatePermissionByKey,
	getUsedKeysForComponent,
	getSubstate,

	haveAllKeysRegisteredUse,
};
