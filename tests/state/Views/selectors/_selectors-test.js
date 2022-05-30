import selectors from '../../../../src/state/Views/selectors';
import {expectedViewsSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedViewsSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'views', options);
});
