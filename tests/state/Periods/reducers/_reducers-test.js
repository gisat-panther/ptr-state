import reducers, {INITIAL_STATE} from '../../../../src/state/Periods/reducers';
import testHelpers from '../../../helpers';
import ActionTypes from '../../../../src/constants/ActionTypes';

import add from '../../_common/reducers/add-test';
import addIndex from '../../_common/reducers/addIndex-test';
import addUnreceivedKeys from '../../_common/reducers/addUnreceivedKeys-test';
import clearIndex from '../../_common/reducers/clearIndex-test';
import clearIndexes from '../../_common/reducers/clearIndexes-test';
import cleanupOnLogout from '../../_common/reducers/cleanupOnLogout-test';
import dataSetOutdated from '../../_common/reducers/dataSetOutdated-test';
import markDeleted from '../../_common/reducers/markDeleted-test';
import registerUseIndexed from '../../_common/reducers/registerUseIndexed-test';
import remove from '../../_common/reducers/remove-test';
import removeEdited from '../../_common/reducers/removeEdited-test';
import removeEditedActive from '../../_common/reducers/removeEditedActive-test';
import removeEditedProperty from '../../_common/reducers/removeEditedProperty-test';
import setActive from '../../_common/reducers/setActive-test';
import setActiveMultiple from '../../_common/reducers/setActiveMultiple-test';
import updateEdited from '../../_common/reducers/updateEdited-test';
import updateStore from '../../_common/reducers/updateStore-test';
import useIndexedClear from '../../_common/reducers/useIndexedClear-test';
import useIndexedClearAll from '../../_common/reducers/useIndexedClearAll-test';
import useKeysClear from '../../_common/reducers/useKeysClear-test';
import useKeysRegister from '../../_common/reducers/useKeysRegister-test';

describe('_reducers', () => {
	testHelpers.baseReducersMetadataTestSet(reducers, INITIAL_STATE, 'PERIODS');
});

describe('add', () => {
	add.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.ADD};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addIndex', () => {
	addIndex.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.INDEX.ADD};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addUnreceivedKeys', () => {
	addUnreceivedKeys.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.ADD_UNRECEIVED};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('cleanupOnLogout', () => {
	cleanupOnLogout.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('clearIndex', () => {
	clearIndex.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.INDEX.CLEAR_INDEX,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('clearIndexes', () => {
	clearIndexes.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.INDEX.CLEAR_ALL};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('dataSetOutdated', () => {
	dataSetOutdated.forEach(test => {
		const action = {...test.action, type: ActionTypes.COMMON.DATA.SET_OUTDATED};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('markDeleted', () => {
	markDeleted.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.MARK_DELETED};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('registerUseIndexed', () => {
	registerUseIndexed.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.USE.INDEXED.REGISTER,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('remove', () => {
	remove.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.DELETE};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('removeEdited', () => {
	removeEdited.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.EDITED.REMOVE};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('removeEditedActive', () => {
	removeEditedActive.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.EDITED.REMOVE_ACTIVE,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('removeEditedProperty', () => {
	removeEditedProperty.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.EDITED.REMOVE_PROPERTY,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('setActive', () => {
	setActive.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.SET_ACTIVE_KEY,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('setActiveMultiple', () => {
	setActiveMultiple.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.SET_ACTIVE_KEYS,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('updateEdited', () => {
	updateEdited.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.EDITED.UPDATE,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('updateStore', () => {
	updateStore.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.UPDATE_STORE,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useIndexedClear', () => {
	useIndexedClear.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.USE.INDEXED.CLEAR,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useIndexedClearAll', () => {
	useIndexedClearAll.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.USE.INDEXED.CLEAR_ALL,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useKeysRegister', () => {
	useKeysRegister.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.PERIODS.USE.KEYS.REGISTER,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useKeysClear', () => {
	useKeysClear.forEach(test => {
		const action = {...test.action, type: ActionTypes.PERIODS.USE.KEYS.CLEAR};
		it(test.name, () => test.test(action, reducers));
	});
});
