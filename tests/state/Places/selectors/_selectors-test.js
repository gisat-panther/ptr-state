import selectors from '../../../../src/state/Places/selectors';
import {expectedMetadataSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedMetadataSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'places', options);
});
