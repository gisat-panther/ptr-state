import selectors from '../../../../../src/state/Data/TimeSerie/selectors';
import {expectedDataTimeSerieSelectors} from '../../../../constants';
import testHelpers from '../../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedDataTimeSerieSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'data.timeSerie', options);
});
