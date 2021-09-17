import testHelpers from '../../../../helpers';
import ActionTypes from '../../../../../src/constants/ActionTypes';

import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialDataSources/reducers';

import updateStore from '../../../_common/reducers/updateStore-test';

const actionTypes = [
	'DATA.SPATIAL_DATA_SOURCES.ADD',
	'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
	'DATA.SPATIAL_DATA_SOURCES.UPDATE_STORE',
];

describe('updateStore', () => {
	updateStore.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.DATA.SPATIAL_DATA_SOURCES.UPDATE_STORE,
		};
		it(test.name, () => {
			return test.test(action, reducers);
		});
	});
});

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
