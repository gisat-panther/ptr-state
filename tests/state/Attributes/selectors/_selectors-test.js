import selectors from '../../../../src/state/Attributes/selectors';
import {expectedMetadataSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedMetadataSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'attributes', options);
});
