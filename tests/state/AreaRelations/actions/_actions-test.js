import commonActionsTests from '../../_common/actions/';
import actions from '../../../../src/state/AreaRelations/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [
	'add',
	'useIndexedRegister',
	'useIndexedClearAll',
	'ensureIndexed',
];

const store = 'AREA_RELATIONS';
const dataType = 'area';
const categoryPath = 'relations';
const storePath = 'areaRelations';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common AREA_RELATIONS actions',
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
