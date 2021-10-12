import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {MapsSelectorsState as state} from './_state';
import {setState} from '@jvitela/recompute';

describe('getAttributeRelationsFilterFromLayerState', function () {
	it('returns attribute relations filter', () => {
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
			styleKey: 'style1',
			options: {
				attributeFilter: {
					attribute1: 1,
				},
				dataSourceKeys: ['dataSource1'],
				featureKeys: ['feature1'],
			},
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
			styleKey: 'style1',
		};
		const output =
			Select.maps.getAttributeRelationsFilterFromLayerState(layerState);
		assert.deepStrictEqual(output, expectedResult);
		setState(null);
	});

	it('returns empty object if there is no common filter', () => {
		setState(state);
		const layerState = {
			options: {
				dataSourceKeys: ['dataSource1'],
			},
		};

		const output =
			Select.maps.getAttributeRelationsFilterFromLayerState(layerState);
		assert.isNull(output);
		setState(null);
	});

	it('returns null, if no layers state was given', function () {
		setState(state);
		const output = Select.maps.getAttributeRelationsFilterFromLayerState(null);
		assert.isNull(output);
		setState(null);
	});
});
