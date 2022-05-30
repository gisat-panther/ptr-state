import commonActionsTests, {
	USE_ACTIONS,
	EDIT_ACTIONS,
	SETTING_ACTIVE_KEY_ACTIONS,
	RESTORE_STATE_ACTIONS,
} from '../../_common/actions/';
import actions from '../../../../src/state/Views/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [
	...USE_ACTIONS,
	...EDIT_ACTIONS,
	...SETTING_ACTIVE_KEY_ACTIONS,
	...RESTORE_STATE_ACTIONS.withSetActiveKey,
];

const store = 'VIEWS';
const dataType = 'views';
const categoryPath = 'views';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common VIEWS actions',
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
