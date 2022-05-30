import common from '../../_common/selectors';

const getSubstate = state => state.areas.areaTreeLevels;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActive = common.getActive(getSubstate);
const getIndexed = common.getIndexed(getSubstate);
export default {
	getIndexed,
	getAll,
	getAllAsObject,
	getActiveKey,
	getActive,

	getSubstate,
};
