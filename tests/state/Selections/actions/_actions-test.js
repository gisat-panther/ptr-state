import commonActionsTests, {
	SETTING_ACTIVE_KEY_ACTIONS,
} from '../../_common/actions/';
import actions from '../../../../src/state/Selections/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [
	...SETTING_ACTIVE_KEY_ACTIONS,
	'add',
	'updateStateFromView_setActiveKey',
];

const store = 'SELECTIONS';
const dataType = 'selections';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common SELECTIONS actions',
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

// TODO
// clearFeatureKeysFilter
// setActiveSelectionFeatureKeysFilterKeys
// updateStateFromViewWithData
