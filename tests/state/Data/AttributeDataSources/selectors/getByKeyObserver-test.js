import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../../src/state/Data/AttributeDataSources/selectors';

describe('state/Data/AttributeDataSources/selectors/getByKeyObserver', function () {
	const state = {
		data: {
			attributeDataSources: {
				byKey: {
					dataSource1: {
						key: 'dataSource1',
						data: {
							type: 'vector',
						},
					},
					dataSource2: {
						key: 'dataSource2',
						data: {
							type: 'wmts',
						},
					},
				},
			},
		},
	};

	before(function () {
		setState(state);
	});

	it('Should select the data source', function () {
		const expectedResult = {
			key: 'dataSource1',
			data: {
				type: 'vector',
			},
		};

		assert.deepStrictEqual(
			selectors.getByKeyObserver('dataSource1'),
			expectedResult
		);
	});

	it('Should select null, if dataSource does not exist', function () {
		assert.isNull(selectors.getByKeyObserver('dataSource78'));
	});

	it('Should select null, if dataSources are empty', function () {
		setState({data: {attributeDataSources: {byKey: null}}});

		assert.isNull(selectors.getByKeyObserver('dataSource1'));
	});

	after(function () {
		setState(null);
	});
});
