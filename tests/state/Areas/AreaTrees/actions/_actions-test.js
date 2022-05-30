import commonActionsTests, {
	SETTING_ACTIVE_KEY_ACTIONS,
} from '../../../_common/actions/';
import actions from '../../../../../src/state/Areas/AreaTrees/actions';
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
	'useKeysClear',
];

const store = 'AREAS.AREA_TREES';
const dataType = 'areaTrees';
const storePath = 'areas.areaTrees';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common AREAS.AREA_TREES actions',
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
