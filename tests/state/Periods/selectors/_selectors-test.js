import selectors from '../../../../src/state/Periods/selectors';
import {expectedMetadataSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedMetadataSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'periods', options);
});
