import common from '../_common/selectors';

const getSubstate = state => state.areaRelations;
const getIndex = common.getIndex(getSubstate);

export default {
	getSubstate,
	getIndex,
};
