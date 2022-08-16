import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.SPATIAL_RELATIONS.ADD:
			return common.add(state, action);
		case ActionTypes.DATA.SPATIAL_RELATIONS.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.DATA.SPATIAL_RELATIONS.UPDATE_STORE:
			return common.updateStore(state, action);
		case ActionTypes.DATA.SPATIAL_RELATIONS.USE.INDEXED.REGISTER:
			return common.registerUseIndexed(state, action);
		case ActionTypes.DATA.SPATIAL_RELATIONS.INDEX.CLEAR_ALL:
			return common.clearIndexes(state, action);
		default:
			return state;
	}
};
