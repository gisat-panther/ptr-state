import ActionTypes from '../../constants/ActionTypes';

import common, {DEFAULT_INITIAL_STATE} from '../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.STYLES.ADD:
			return common.add(state, action);
		case ActionTypes.STYLES.ADD_UNRECEIVED:
			return common.addUnreceivedKeys(state, action);
		case ActionTypes.STYLES.DELETE:
			return common.remove(state, action);
		case ActionTypes.STYLES.EDITED.REMOVE:
			return common.removeEdited(state, action);
		case ActionTypes.STYLES.EDITED.REMOVE_ACTIVE:
			return common.removeEditedActive(state, action);
		case ActionTypes.STYLES.EDITED.REMOVE_PROPERTY:
			return common.removeEditedProperty(state, action);
		case ActionTypes.STYLES.EDITED.UPDATE:
			return common.updateEdited(state, action);
		case ActionTypes.STYLES.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.STYLES.SET_ACTIVE_KEY:
			return common.setActive(state, action);
		case ActionTypes.STYLES.UPDATE_STORE:
			return common.updateStore(state, action);
		case ActionTypes.STYLES.USE.KEYS.REGISTER:
			return common.useKeysRegister(state, action);
		case ActionTypes.STYLES.USE.KEYS.CLEAR:
			return common.useKeysClear(state, action);
		case ActionTypes.STYLES.USE.INDEXED.REGISTER:
			return common.registerUseIndexed(state, action);
		case ActionTypes.STYLES.USE.INDEXED.CLEAR:
			return common.useIndexedClear(state, action);
		case ActionTypes.STYLES.USE.INDEXED.CLEAR_ALL:
			return common.useIndexedClearAll(state, action);
		case ActionTypes.STYLES.INDEX.CLEAR_ALL:
			return common.clearIndexes(state, action);
		case ActionTypes.STYLES.INDEX.CLEAR_INDEX:
			return common.clearIndex(state, action);
		case ActionTypes.STYLES.MARK_DELETED:
			return common.markDeleted(state, action);
		case ActionTypes.COMMON.DATA.SET_OUTDATED:
			return common.dataSetOutdated(state, action);
		case ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
			return common.cleanupOnLogout(state, action);
		default:
			return state;
	}
};
