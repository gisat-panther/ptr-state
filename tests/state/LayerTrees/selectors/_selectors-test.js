import selectors from '../../../../src/state/LayerTrees/selectors';
import {expectedLayerTreesSelectors} from '../../../constants';
import testHelpers from '../../../helpers';

describe('_selectors-test', () => {
	const options = {
		expectedSelectors: expectedLayerTreesSelectors,
	};
	testHelpers.baseSelectorsTestSet(selectors, 'layerTrees', options);
});
