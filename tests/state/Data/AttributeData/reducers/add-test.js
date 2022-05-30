import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('add-test', function () {
	const state = {
		...INITIAL_STATE,
		byDataSourceKey: {
			dataSourceKey1: {
				feature1: 2,
			},
			dataSourceKey2: {
				feature3: null,
			},
		},
	};

	it('Should add data', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				dataSourceKey3: {
					featureKey7: 'A',
				},
			},
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.ADD',
			key: 'dataSourceKey3',
			data: {
				featureKey7: 'A',
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no data source key was given', function () {
		const action = {
			type: 'DATA.ATTRIBUTE_DATA.ADD',
			key: null,
			data: {
				featureKey7: 'A',
			},
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});

	it('Should return the same state if no data was given', function () {
		const action = {
			type: 'DATA.ATTRIBUTE_DATA.ADD',
			key: 'dataSource3',
			data: null,
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
