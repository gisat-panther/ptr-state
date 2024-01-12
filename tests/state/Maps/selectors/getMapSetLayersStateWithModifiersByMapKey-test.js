import Select from '../../../../src/state/Select';
import {assert} from 'chai';
import testHelpers from '../../../helpers';
import {MapsSelectorsState as state} from './_state';
import {setState} from '@jvitela/recompute';

describe('getMapSetLayersStateWithModifiersByMapKey', function () {
	const expectedResult = [
		{
			key: 'layer2',
			layerTemplateKey: 'layerTemplate2',
			metadataModifiers: {
				periodKey: 'period1',
			},
			filterByActive: null,
		},
	];

	it('should return map set layers for map 1', () => {
		setState(state);

		const output = Select.maps.getMapSetLayersStateWithModifiersByMapKey(
			state,
			'map1'
		);
		assert.deepStrictEqual(output, expectedResult);
		setState(null);
	});

	testHelpers.testCache(
		Select.maps.getMapSetLayersStateWithModifiersByMapKey,
		[state, 'map1'],
		expectedResult
	);
});
