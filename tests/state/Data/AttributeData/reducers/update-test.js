import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('update-test', function () {
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

	it('Should update data for existing data source', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				dataSourceKey2: {
					feature1: 'A',
					feature3: null,
				},
			},
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.UPDATE',
			key: 'dataSourceKey2',
			data: {
				feature1: 'A',
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should add data for new data source', function () {
		const expectedState = {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				dataSourceKey4: {
					feature1: 'A',
				},
			},
		};

		const action = {
			type: 'DATA.ATTRIBUTE_DATA.UPDATE',
			key: 'dataSourceKey4',
			data: {
				feature1: 'A',
			},
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no data source key was given', function () {
		const action = {
			type: 'DATA.ATTRIBUTE_DATA.UPDATE',
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
			type: 'DATA.ATTRIBUTE_DATA.UPDATE',
			key: 'dataSource3',
			data: null,
		};

		const output = reducers(state, action);

		assert.equal(output, state);
	});
});
