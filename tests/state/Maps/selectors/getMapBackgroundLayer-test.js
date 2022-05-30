import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import {DataSelectorsState} from '../../Data/selectors/_state';
import {MapsSelectorsState_2} from './_state';
import {setState} from '@jvitela/recompute';

const state = {
	...DataSelectorsState,
	...MapsSelectorsState_2,
	styles: {byKey: {style1: {key: 'style1', data: {definition: {}}}}},
	selections: {
		byKey: {
			selection1: {
				key: 'selection1',
				data: {
					style: 'default',
					hoveredStyle: 'default',
					featureKeysFilter: {
						keys: ['feature1'],
					},
				},
			},
		},
	},
};

describe('getMapBackgroundLayer', function () {
	it('should select background layer defined directly', () => {
		setState(state);
		const mapKey = 'map1';
		const expectedOutput = {
			key: 'definedBackground',
			type: 'wmts',
			options: {
				url: 'https://background.defined',
			},
		};

		const output = Select.maps.getMapBackgroundLayer(mapKey);
		assert.deepStrictEqual(output, expectedOutput);
		setState(null);
	});

	it('should select null, if type is not defined', () => {
		setState(state);
		const mapKey = 'map3';

		const output = Select.maps.getMapBackgroundLayer(mapKey);
		assert.isNull(output);
		setState(null);
	});

	it('should select null, if type is not supported', () => {
		setState(state);
		const mapKey = 'map4';

		const output = Select.maps.getMapBackgroundLayer(mapKey);
		assert.isNull(output);
		setState(null);
	});

	it('should select null, if there is no layer state for given mapKey', () => {
		setState(state);
		const mapKey = 'mapXY';

		const output = Select.maps.getMapBackgroundLayer(mapKey);
		assert.isNull(output);
		setState(null);
	});

	it('should select background layer controlled', () => {
		setState(state);
		const mapKey = 'map2';
		const expectedOutput = [
			{
				key: 'pantherBackgroundLayer_spatialDataSource6',
				layerKey: 'pantherBackgroundLayer',
				name: undefined,
				opacity: 1,
				type: 'wmts',
				options: {
					url: 'https://background.fromstate',
				},
			},
		];

		const output = Select.maps.getMapBackgroundLayer(mapKey);
		assert.deepStrictEqual(output, expectedOutput);
		setState(null);
	});
});
