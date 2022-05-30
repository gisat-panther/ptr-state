import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeData/actions';

describe('state/Data/AttributeData/actions/getIndexData', function () {
	it('get index for one datasource', function () {
		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
			},
		};

		const index = actions.getIndexData(attributeData);

		assert.deepEqual(index, {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': ['18502'],
		});
	});

	it('get index for two datasources', function () {
		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
			},
			'87560e4f-abb7-4d46-aa58-db23dba872a6': {
				18503: '30',
			},
		};

		const index = actions.getIndexData(attributeData);

		assert.deepEqual(index, {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': ['18502'],
			'87560e4f-abb7-4d46-aa58-db23dba872a6': ['18503'],
		});
	});

	it('get index for two datasources _2', function () {
		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
				18504: '-10',
			},
			'87560e4f-abb7-4d46-aa58-db23dba872a6': {
				18503: '30',
				18505: 'string test',
			},
		};

		const index = actions.getIndexData(attributeData);

		assert.deepEqual(index, {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': ['18502', '18504'],
			'87560e4f-abb7-4d46-aa58-db23dba872a6': ['18503', '18505'],
		});
	});
});
