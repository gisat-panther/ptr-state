import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';

describe('getMapSetActiveMapView', function () {
	it('should return null, if there is no activeMapKey for map set and no activeMapKey globally', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				activeMapKey: null,
				sets: {
					...state.maps.sets,
					set1: {
						...state.maps.sets.set1,
						activeMapKey: null,
					},
				},
			},
		};
		const output = Select.maps.getMapSetActiveMapView(updatedState, 'set1');
		assert.isNull(output);
	});

	it('should return null if map set does not exist', () => {
		const output = Select.maps.getMapSetActiveMapView(state, 'setXYZ');
		assert.isNull(output);
	});

	it('should return view', () => {
		const expectedResult = {
			boxRange: 500000,
			center: {
				lat: 50,
				lon: 10,
			},
			heading: 0,
			tilt: 0,
			roll: 0,
		};
		const output = Select.maps.getMapSetActiveMapView(state, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return view, if map is globally active', () => {
		const updatedState = {
			...state,
			maps: {
				...state.maps,
				sets: {
					...state.maps.sets,
					set1: {
						...state.maps.sets.set1,
						activeMapKey: null,
					},
				},
			},
		};
		const expectedResult = {
			boxRange: 500000,
			center: {
				lat: 50,
				lon: 10,
			},
			heading: 0,
			tilt: 0,
			roll: 0,
		};
		const output = Select.maps.getMapSetActiveMapView(updatedState, 'set1');
		assert.deepStrictEqual(output, expectedResult);
	});
});
