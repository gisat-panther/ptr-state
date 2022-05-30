import commonActionsTests, {
	USE_ACTIONS,
	EDIT_ACTIONS,
	SETTING_ACTIVE_KEYS_ACTIONS,
	RESTORE_STATE_ACTIONS,
} from '../../_common/actions/';
import actions from '../../../../src/state/Places/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [
	...USE_ACTIONS,
	...EDIT_ACTIONS,
	...SETTING_ACTIVE_KEYS_ACTIONS,
	...RESTORE_STATE_ACTIONS.withSetActiveKeys,
];

const store = 'PLACES';
const dataType = 'places';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common PLACES actions',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		null,
		getDispatchedActionsModificator(store),
		store
	)
);
