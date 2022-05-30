import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.ADD:
			return common.add(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE:
			return common.updateStore(state, action.data);
		default:
			return state;
	}
};
