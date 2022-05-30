import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeDataSources/reducers';

const actionTypes = [
	'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
	'DATA.ATTRIBUTE_DATA_SOURCES.INDEX.ADD',
	'DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
