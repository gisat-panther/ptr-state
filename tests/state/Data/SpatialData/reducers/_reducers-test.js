import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialData/reducers';
import testHelpers from '../../../../helpers';

describe('_reducers-test', () =>
	testHelpers.baseReducersTestSet(reducers, INITIAL_STATE));
