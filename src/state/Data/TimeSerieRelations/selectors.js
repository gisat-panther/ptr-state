import common from '../../_common/selectors';
import {forEach as _forEach, filter as _filter} from 'lodash';

const getSubstate = state => state.data.timeSerieRelations;

const getIndex = common.getIndex(getSubstate);

export default {
	getSubstate,
	getIndex,
};
