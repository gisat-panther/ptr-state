import common from '../../_common/selectors';

const getSubstate = state => state.data.spatialRelations;

const getAll = common.getAll(getSubstate);
const getIndex = common.getIndex(getSubstate);

export default {
	getAll,
	getIndex,
	getSubstate,
};
