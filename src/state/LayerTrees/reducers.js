import ActionTypes from '../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.LAYER_TREES.ADD:
			return common.add(state, action);
		case ActionTypes.LAYER_TREES.ADD_UNRECEIVED:
			return common.addUnreceivedKeys(state, action);
		case ActionTypes.LAYER_TREES.DELETE:
			return common.remove(state, action);
		case ActionTypes.LAYER_TREES.EDITED.REMOVE:
			return common.removeEdited(state, action);
		case ActionTypes.LAYER_TREES.EDITED.REMOVE_PROPERTY:
			return common.removeEditedProperty(state, action);
		case ActionTypes.LAYER_TREES.EDITED.UPDATE:
			return common.updateEdited(state, action);
		case ActionTypes.LAYER_TREES.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.LAYER_TREES.INDEX.CLEAR_ALL:
			return common.clearIndexes(state, action);
		case ActionTypes.LAYER_TREES.INDEX.CLEAR_INDEX:
			return common.clearIndex(state, action);
		case ActionTypes.LAYER_TREES.MARK_DELETED:
			return common.markDeleted(state, action);
		case ActionTypes.LAYER_TREES.UPDATE_STORE:
			return common.updateStore(state, action);
		case ActionTypes.LAYER_TREES.USE.KEYS.CLEAR:
			return common.useKeysClear(state, action);
		case ActionTypes.LAYER_TREES.USE.KEYS.REGISTER:
			return common.useKeysRegister(state, action);
		case ActionTypes.LAYER_TREES.USE.INDEXED.REGISTER:
			return common.registerUseIndexed(state, action);
		case ActionTypes.LAYER_TREES.USE.INDEXED.CLEAR:
			return common.useIndexedClear(state, action);
		case ActionTypes.LAYER_TREES.USE.INDEXED.CLEAR_ALL:
			return common.useIndexedClearAll(state, action);

		case ActionTypes.COMMON.DATA.SET_OUTDATED:
			return common.dataSetOutdated(state, action);
		case ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
			return common.cleanupOnLogout(state, action);
		default:
			return state;
	}
};
