import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeRelations/reducers';

const actionTypes = [
	'DATA.ATTRIBUTE_RELATIONS.ADD',
	'DATA.ATTRIBUTE_RELATIONS.INDEX.ADD',
	'DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
