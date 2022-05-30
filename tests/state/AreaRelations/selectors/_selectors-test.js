import selectors from '../../../../src/state/AreaRelations/selectors';
import {expectedMetadataSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: ['getSubstate', 'getIndex'],
	};
	testHelpers.baseSelectorsTestSet(selectors, 'areaRelations', options);
});
