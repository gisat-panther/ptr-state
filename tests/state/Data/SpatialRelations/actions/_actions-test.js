import commonActionsTests from '../../../_common/actions/';
import actions from '../../../../../src/state/Data/SpatialRelations/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../../helpers';

const actionNames = ['updateStore'];

const store = 'DATA.SPATIAL_RELATIONS';
const dataType = undefined;
const categoryPath = undefined;
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common DATA/SPATIALRELATIONS actions',
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
