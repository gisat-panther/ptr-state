import componentsActions from '../../../../../src/state/Areas/AreaTreeLevels/actions';
import testBatchRunner from '../../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../../constants';

const tests = [
	{
		name: 'setActiveKey',
		action: (actions, actionTypes) => {
			return actions.setActiveKey('k1');
		},
		dispatchedActions: [
			{type: 'AREAS.AREA_TREE_LEVELS.SET_ACTIVE_KEY', key: 'k1'},
		],
	},
];

const dataType = 'areaTreeLevels';
const categoryPath = 'metadata';
describe(
	'state/Areas/AreaTreeLevels/actions',
	testBatchRunner(dataType, categoryPath, tests, componentsActions, actionTypes)
);

export default tests;