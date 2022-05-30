import commonActionsTests, {
	SETTING_ACTIVE_KEY_ACTIONS,
} from '../../../_common/actions/';
import actions from '../../../../../src/state/Areas/AreaTreeLevels/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../../helpers';

const actionNames = [
	SETTING_ACTIVE_KEY_ACTIONS,
	'refreshUses',
	'useIndexed',
	'useIndexedClear',
	'useKeys',
];

const store = 'AREAS.AREA_TREE_LEVELS';
const dataType = 'areaTreeLevels';
const storePath = 'areas.areaTreeLevels';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common AREAS.AREA_TREE_LEVELS actions',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		null,
		getDispatchedActionsModificator(store),
		store,
		storePath
	)
);
