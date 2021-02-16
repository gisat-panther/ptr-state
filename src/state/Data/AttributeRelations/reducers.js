import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.ATTRIBUTE_RELATIONS.ADD:
			return common.add(state, action);
		case ActionTypes.DATA.ATTRIBUTE_RELATIONS.INDEX.ADD:
			return common.addIndex(state, action);
        default:
            return state;
    }
}
