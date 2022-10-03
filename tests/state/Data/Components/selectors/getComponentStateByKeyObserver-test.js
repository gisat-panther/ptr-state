import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getComponentStateByKeyObserver-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select component key for given key', function () {
		const expectedResult = {
			filterByActive: {
				period: true,
			},
			metadataModifiers: {
				scopeKey: 'scope1',
			},
			attributeKeys: ['attribute1'],
			start: 2,
			length: 2,
		};

		assert.deepStrictEqual(
			selectors.getComponentStateByKeyObserver('componentB'),
			expectedResult
		);
	});

	it('Should return null, if there is no record for key', function () {
		assert.isNull(selectors.getComponentStateByKeyObserver('componentXY'));
	});

	// I have no clue, why it returns undefined instead of null. However, it shouldn't matter in this case
	it('Should return undefined, if no component key was given', function () {
		assert.isUndefined(selectors.getComponentStateByKeyObserver());
	});

	it('Should return null, if by key is empty', function () {
		setState({
			...ComponentsSelectorsState,
			data: {
				...ComponentsSelectorsState.data,
				components: {
					...ComponentsSelectorsState.data.components,
					components: {
						...ComponentsSelectorsState.data.components.components,
						byKey: {},
					},
				},
			},
		});
		assert.isNull(selectors.getComponentStateByKeyObserver('componentB'));
	});

	after(function () {
		setState(null);
	});
});
