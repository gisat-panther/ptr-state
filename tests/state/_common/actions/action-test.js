import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It fail on unexisting action in actionTypes.',
		action: (actions, actionTypes, options) => {
			const type = 'ACTION.TEST';
			const payload = {};
			try {
				return actions.action(actionTypes, type, payload);
			} catch (e) {
				assert.equal(
					e.message,
					'common/actions#action: Action not in namespace'
				);
			}
		},
		dispatchedActions: [],
	},
	{
		name: 'It return action.',
		action: (actions, actionTypes, options) => {
			const type = 'INDEX.ADD';
			const payload = {
				data: {
					key: 'k1',
				},
			};
			return actions.action(actionTypes, type, payload);
		},
		dispatchedActions: [
			{
				type: 'INDEX.ADD',
				data: {
					key: 'k1',
				},
			},
		],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'action',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
