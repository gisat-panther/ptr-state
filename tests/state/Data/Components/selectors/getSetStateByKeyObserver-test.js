import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import {ComponentsSelectorsState} from './_state';
import selectors from '../../../../../src/state/Data/Components/selectors';

describe('getSetStateByKeyObserver-test', function () {
	before(function () {
		setState(ComponentsSelectorsState);
	});

	it('Should select set for given key', function () {
		const expectedResult = {
			components: ['componentA'],
		};

		assert.deepStrictEqual(
			selectors.getSetStateByKeyObserver('setA'),
			expectedResult
		);
	});

	it('Should return null, if there is no record for key', function () {
		assert.isNull(selectors.getSetStateByKeyObserver('setXY'));
	});

	it('Should return null, if there is no component key was given', function () {
		assert.isNull(selectors.getSetStateByKeyObserver());
	});

	it('Should return null, if by key is empty', function () {
		setState({
			...ComponentsSelectorsState,
			data: {
				...ComponentsSelectorsState.data,
				components: {
					...ComponentsSelectorsState.data.components,
					sets: {
						...ComponentsSelectorsState.data.components.sets,
						byKey: {},
					},
				},
			},
		});
		assert.isNull(selectors.getSetStateByKeyObserver('setA'));
	});

	after(function () {
		setState(null);
	});
});
