import selectors from '../../../../src/state/Tags/selectors';
import {expectedMetadataSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedMetadataSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'tags', options);
});
