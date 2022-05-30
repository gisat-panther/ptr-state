import selectors from '../../../../src/state/Styles/selectors';
import {expectedStylesSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedStylesSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'styles', options);
});
