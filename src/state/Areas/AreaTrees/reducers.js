import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.AREAS.AREA_TREES.ADD:
			return common.add(state, action);
		case ActionTypes.AREAS.AREA_TREES.ADD_UNRECEIVED:
			return common.addUnreceivedKeys(state, action);
		case ActionTypes.AREAS.AREA_TREES.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.AREAS.AREA_TREES.SET_ACTIVE_KEY:
			return common.setActive(state, action);
		case ActionTypes.AREAS.AREA_TREES.USE.INDEXED.REGISTER:
			return common.registerUseIndexed(state, action);
		case ActionTypes.AREAS.AREA_TREES.USE.INDEXED.CLEAR:
			return common.useIndexedClear(state, action);
		case ActionTypes.AREAS.AREA_TREES.USE.KEYS.REGISTER:
			return common.useKeysRegister(state, action);
		case ActionTypes.AREAS.AREA_TREES.USE.KEYS.CLEAR:
			return common.useKeysClear(state, action);
		case ActionTypes.AREAS.AREA_TREES.INDEX.CLEAR_ALL:
			return common.clearIndexes(state, action);
		case ActionTypes.COMMON.DATA.SET_OUTDATED:
			return common.dataSetOutdated(state, action);
		case ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
			return common.cleanupOnLogout(state, action);
		default:
			return state;
	}
};
