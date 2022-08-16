import common from '../../_common/selectors';

const getSubstate = state => state.data.spatialRelations;

const getAll = common.getAll(getSubstate);
const getIndex = common.getIndex(getSubstate);
const getIndexed = common.getIndexed(getSubstate);

export default {
	getAll,
	getIndex,
	getIndexed,
	getSubstate,
};
