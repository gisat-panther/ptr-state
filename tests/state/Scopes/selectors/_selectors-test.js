import selectors from '../../../../src/state/Scopes/selectors';
import {expectedMetadataSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedMetadataSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'scopes', options);
});
