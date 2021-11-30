import commonActionsTests, {
	USE_ACTIONS,
	EDIT_ACTIONS,
	RESTORE_STATE_ACTIONS,
} from '../../_common/actions/';
import actions from '../../../../src/state/LayerTrees/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [
	...EDIT_ACTIONS,
	...USE_ACTIONS,
	...RESTORE_STATE_ACTIONS.withSetActiveKey,
];

const store = 'LAYER_TREES';
const dataType = 'layerTrees';
const categoryPath = 'application';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common LAYER_TREES actions',
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

// TODO ensureData
