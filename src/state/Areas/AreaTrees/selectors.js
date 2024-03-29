import common from '../../_common/selectors';

const getSubstate = state => state.areas.areaTrees;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActive = common.getActive(getSubstate);

export default {
	getAll,
	getAllAsObject,
	getActiveKey,
	getActive,

	getByKeys: common.getByKeys(getSubstate),
	getByKeysAsObject: common.getByKeysAsObject(getSubstate),

	getSubstate,
};
