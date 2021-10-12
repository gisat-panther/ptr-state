import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';
import {setState} from '@jvitela/recompute';

describe('getSpatialRelationsFilterFromLayerState', function () {
	it('returns spatial relations filter with layer template', () => {
		setState(state);
		const layerState = {
			metadataModifiers: {
				scopeKey: 'scope1',
				caseKeys: ['case1', 'case2'],
			},
			filterByActive: {
				place: true,
			},
			layerTemplateKey: 'layerTemplate1',
		};

		const expectedResult = {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				caseKey: {
					in: ['case1', 'case2'],
				},
			},
			layerTemplateKey: 'layerTemplate1',
		};
		const output =
			Select.maps.getSpatialRelationsFilterFromLayerState(layerState);
		assert.deepStrictEqual(output, expectedResult);
		setState(null);
	});

	it('returns spatial relations filter with area tree level', () => {
		setState(state);
		const layerState = {
			metadataModifiers: {
				scopeKey: 'scope1',
				caseKeys: ['case1', 'case2'],
			},
			filterByActive: {
				place: true,
			},
			areaTreeLevelKey: 'areaTreeLevel1',
		};

		const expectedResult = {
			modifiers: {
				scopeKey: 'scope1',
				placeKey: 'place1',
				caseKey: {
					in: ['case1', 'case2'],
				},
			},
			areaTreeLevelKey: 'areaTreeLevel1',
		};
		const output =
			Select.maps.getSpatialRelationsFilterFromLayerState(layerState);
		assert.deepStrictEqual(output, expectedResult);
		setState(null);
	});

	it('returns null, if no layers state was given', function () {
		setState(state);
		const output = Select.maps.getSpatialRelationsFilterFromLayerState(null);
		assert.isNull(output);
		setState(null);
	});
});
