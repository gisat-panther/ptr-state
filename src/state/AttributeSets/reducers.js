import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/reducers';

import {DEFAULT_INITIAL_STATE} from '../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
	activeKeys: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.ATTRIBUTE_SETS.ADD:
			return common.add(state, action);
		case ActionTypes.ATTRIBUTE_SETS.ADD_UNRECEIVED:
			return common.addUnreceivedKeys(state, action);
		case ActionTypes.ATTRIBUTE_SETS.DELETE:
			return common.remove(state, action);
		case ActionTypes.ATTRIBUTE_SETS.EDITED.REMOVE:
			return common.removeEdited(state, action);
		case ActionTypes.ATTRIBUTE_SETS.EDITED.REMOVE_ACTIVE:
			return common.removeEditedActive(state, action);
		case ActionTypes.ATTRIBUTE_SETS.EDITED.REMOVE_PROPERTY:
			return common.removeEditedProperty(state, action);
		case ActionTypes.ATTRIBUTE_SETS.EDITED.UPDATE:
			return common.updateEdited(state, action);
		case ActionTypes.ATTRIBUTE_SETS.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.ATTRIBUTE_SETS.INDEX.CLEAR_ALL:
			return common.clearIndexes(state, action);
		case ActionTypes.ATTRIBUTE_SETS.INDEX.CLEAR_INDEX:
			return common.clearIndex(state, action);
		case ActionTypes.ATTRIBUTE_SETS.MARK_DELETED:
			return common.markDeleted(state, action);
		case ActionTypes.ATTRIBUTE_SETS.SET_ACTIVE_KEY:
			return common.setActive(state, action);
		case ActionTypes.ATTRIBUTE_SETS.SET_ACTIVE_KEYS:
			return common.setActiveMultiple(state, action);
		case ActionTypes.ATTRIBUTE_SETS.UPDATE_STORE:
			return common.updateStore(state, action);
		case ActionTypes.ATTRIBUTE_SETS.USE.INDEXED.CLEAR:
			return common.useIndexedClear(state, action);
		case ActionTypes.ATTRIBUTE_SETS.USE.INDEXED.CLEAR_ALL:
			return common.useIndexedClearAll(state, action);
		case ActionTypes.ATTRIBUTE_SETS.USE.INDEXED.REGISTER:
			return common.registerUseIndexed(state, action);
		case ActionTypes.ATTRIBUTE_SETS.USE.KEYS.REGISTER:
			return common.useKeysRegister(state, action);
		case ActionTypes.ATTRIBUTE_SETS.USE.KEYS.CLEAR:
			return common.useKeysClear(state, action);

		case ActionTypes.COMMON.DATA.SET_OUTDATED:
			return common.dataSetOutdated(state, action);
		case ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
			return common.cleanupOnLogout(state, action);
		default:
			return state;
	}
};
