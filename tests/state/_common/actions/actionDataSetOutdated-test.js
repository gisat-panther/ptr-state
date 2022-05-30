import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';

const tests = [
	{
		name: 'It dispatch actionDataSetOutdated.',
		action: (actions, actionTypes) => {
			const action = actions.actionDataSetOutdated;
			return action();
		},
		dispatchedActions: [{type: 'COMMON.DATA.SET_OUTDATED'}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
const actionTypes = null;
describe(
	'actionDataSetOutdated',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
