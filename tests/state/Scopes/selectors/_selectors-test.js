import selectors from '../../../../src/state/Scopes/selectors';
import {expectedScopesSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedScopesSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'scopes', options);
});
