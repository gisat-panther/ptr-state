import selectors from '../../../../../src/state/Data/TimeSerieRelations/selectors';
import {expectedDataTimeSerieRelationsSelectors} from '../../../../constants';
import testHelpers from '../../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedDataTimeSerieRelationsSelectors,
	};
	testHelpers.baseSelectorsTestSet(
		selectors,
		'data.timeSerieRelations',
		options
	);
});
