import ActionTypes from '../../../../../src/constants/ActionTypes';
import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialRelations/reducers';
import updateStore from '../../../_common/reducers/updateStore-test';

const actionTypes = [
	'DATA.SPATIAL_RELATIONS.ADD',
	'DATA.SPATIAL_RELATIONS.INDEX.ADD',
];

describe('updateStore', () => {
	updateStore.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.DATA.SPATIAL_RELATIONS.UPDATE_STORE,
		};
		it(test.name, () => {
			return test.test(action, reducers);
		});
	});
});

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
