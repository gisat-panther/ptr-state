import ActionTypes from '../../../../../src/constants/ActionTypes';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialData/reducers';
import testHelpers from '../../../../helpers';
import updateStore from '../../../_common/reducers/updateStore-test';

describe('updateStore', () => {
	updateStore.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.DATA.SPATIAL_DATA.UPDATE_STORE,
		};
		it(test.name, () => {
			return test.test(action, reducers);
		});
	});
});

describe('_reducers-test', () =>
	testHelpers.baseReducersTestSet(reducers, INITIAL_STATE));
