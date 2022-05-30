import commonActionsTests, {
	USE_ACTIONS,
	EDIT_ACTIONS,
	SETTING_ACTIVE_KEYS_ACTIONS,
	RESTORE_STATE_ACTIONS,
} from '../../_common/actions/';
import actions from '../../../../src/state/Scenarios/actions';
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

const store = 'SCENARIOS';
const dataType = 'scenarios';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common SCENARIOS actions',
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
