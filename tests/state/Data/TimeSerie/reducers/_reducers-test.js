import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/TimeSerie/reducers';

const actionTypes = [
	'DATA.TIMESERIE.ADD',
	'DATA.TIMESERIE.INDEX.ADD',
	'DATA.TIMESERIE.ADD_WITH_INDEX',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
