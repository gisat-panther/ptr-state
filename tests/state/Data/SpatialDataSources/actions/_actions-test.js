import commonActionsTests from '../../../_common/actions/';
import actions from '../../../../../src/state/Data/SpatialDataSources/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../../helpers';

const actionNames = ['updateStore', 'useKeys'];

const store = 'DATA.SPATIAL_DATA_SOURCES';
const storePath = 'data.spatialDataSources';
const dataType = 'spatial';
const categoryPath = 'dataSources';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common DATA/SPATIALDATASOURCES actions',
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
