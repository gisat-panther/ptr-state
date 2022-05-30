import commonActionsTests, {
	SETTING_ACTIVE_KEYS_ACTIONS,
} from '../../_common/actions/';
import actions from '../../../../src/state/AttributeSets/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [...SETTING_ACTIVE_KEYS_ACTIONS];

const store = 'ATTRIBUTE_SETS';
const dataType = 'attributeSets';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common ATTRIBUTE_SETS actions',
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
