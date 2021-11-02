import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/TimeSerieRelations/reducers';

const actionTypes = [
	'DATA.TIMESERIE_RELATIONS.ADD',
	'DATA.TIMESERIE_RELATIONS.INDEX.ADD',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
