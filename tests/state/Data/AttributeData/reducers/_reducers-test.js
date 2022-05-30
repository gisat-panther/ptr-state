import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';
import testHelpers from '../../../../helpers';

const actionTypes = [
	'DATA.ATTRIBUTE_DATA.INDEX.ADD',
	'DATA.ATTRIBUTE_DATA.UPDATE_STORE',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
