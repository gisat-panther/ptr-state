// tests related imports
// import testBatchRunner, {getTestsByActionName} from '../../helpers';
// import commonActions from '../../../../src/state/_common/actions';
// import {commonActionTypesObj as actionTypes} from '../../../constants';

import action from './action-test';
import actionDataSetOutdated from './actionDataSetOutdated-test';
import actionGeneralError from './actionGeneralError-test';
import actionSetActiveKey from './actionSetActiveKey-test';
import add from './add-test';
import addIndex from './addIndex-test';
import apiUpdate from './apiUpdate-test';
import clearIndex from './clearIndex-test';
import create from './create-test';
import creator from './creator-test';
import deleteItem from './delete-test';
import ensure from './ensure-test';
import ensureIndexed from './ensureIndexed-test';
import ensureIndexesWithFilterByActive from './ensureIndexesWithFilterByActive-test';
import ensureKeys from './ensureKeys-test';
import loadIndexedPage from './loadIndexedPage-test';
import loadKeysPage from './loadKeysPage-test';
import receiveIndexed from './receiveIndexed-test';
import receiveKeys from './receiveKeys-test';
import receiveUpdated from './receiveUpdated-test';
import refreshUses from './refreshUses-test';
import removePropertyFromEdited from './removePropertyFromEdited-test';
import request from './request-test';
import saveEdited from './saveEdited-test';
import setActiveKey from './setActiveKey-test';
import setActiveKeys from './setActiveKeys-test';
import updateEdited from './updateEdited-test';
import updateStore from './updateStore-test';
import updateStateFromView_setActiveKey from './updateStateFromView/setActiveKey-test'; //common function is updateSubstateFromView, but in store is like updateStateFromView
import updateStateFromView_setActiveKeys from './updateStateFromView/setActiveKeys-test'; //common function is updateSubstateFromView, but in store is like updateStateFromView
import useIndexed from './useIndexed-test';
import useIndexedClear from './useIndexedClear-test';
import useIndexedClearAll from './useIndexedClearAll-test';
import useIndexedRegister from './useIndexedRegister-test';
import useKeys from './useKeys-test';
import useKeysClear from './useKeysClear-test';

const commonActionsTests = {
	action,
	actionDataSetOutdated,
	actionGeneralError,
	actionSetActiveKey,
	add,
	addIndex,
	apiUpdate,
	clearIndex,
	create,
	creator,
	delete: deleteItem,
	ensure,
	ensureIndexed,
	ensureIndexesWithFilterByActive,
	ensureKeys,
	loadIndexedPage,
	loadKeysPage,
	receiveIndexed,
	receiveKeys,
	receiveUpdated,
	refreshUses,
	removePropertyFromEdited,
	request,
	saveEdited,
	setActiveKey,
	setActiveKeys,
	updateEdited,
	updateStore,
	updateStateFromView_setActiveKey,
	updateStateFromView_setActiveKeys,
	useIndexed,
	useIndexedClear,
	useIndexedClearAll,
	useIndexedRegister,
	useKeys,
	useKeysClear,
};

// If you uncomment test, then child tests could not be started from IDE
// describe('Run all common actions', () => {
// 	it('Test with datatype testStore and categoryPath metadata.', () => {
// 		const commonActionNames = Object.keys(commonActionsTests);
// 		const dataType = 'testStore';
// 		const categoryPath = 'metadata';
// 		const tests = getTestsByActionName(commonActionNames, commonActionsTests);
// 		testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
// 	});
// });

export const EDIT_ACTIONS = [
	'add',
	'create',
	'delete',
	'saveEdited',
	'updateEdited',
];

export const USE_ACTIONS = [
	'useKeys',
	'useKeysClear',
	'refreshUses',
	'useIndexed',
	'useIndexedClear',
	'clearIndex',
];

export const SETTING_ACTIVE_KEY_ACTIONS = ['setActiveKey'];
export const SETTING_ACTIVE_KEYS_ACTIONS = ['setActiveKey', 'setActiveKeys'];

export const RESTORE_STATE_ACTIONS = {
	withSetActiveKey: ['updateStateFromView_setActiveKey'],
	withSetActiveKeys: ['updateStateFromView_setActiveKeys'],
};
export default commonActionsTests;
