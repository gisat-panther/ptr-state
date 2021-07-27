import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeData/actions';

describe('state/Data/AttributeData/actions/receiveIndexed', function () {
	it('Dispatch action with data', function () {
		const attributeData = {
			index: [18502],
			attributeData: {
				'55f48ed1-ee67-47bd-a044-8985662ec29f': {
					18502: '27',
				},
			},
		};

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;
		const start = 1;
		const total = 1;

		const action = actions.receiveIndexed(
			attributeData,
			attributeDataFilter,
			order,
			start,
			total,
			changedOn
		);
		assert.deepEqual(action, {
			type: 'DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX',
			filter: {
				appKey: 'testKey',
			},
			order: null,
			total: 1,
			start: 1,
			index: [18502],
			data: {
				'55f48ed1-ee67-47bd-a044-8985662ec29f': {
					18502: '27',
				},
			},
			changedOn: null,
		});
	});
});
