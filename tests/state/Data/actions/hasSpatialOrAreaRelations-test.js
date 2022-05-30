import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';

describe('state/Data/actions/hasSpatialOrAreaRelations', function () {
	it('Find that has SpatialOrAreaRelations', function () {
		const state = {
			data: {
				spatialRelations: {
					indexes: [
						{
							filter: {
								layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
								modifiers: {
									scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
									placeKey: {
										in: [
											'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
											'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
										],
									},
									caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
									periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								},
							},
							order: null,
						},
					],
				},
			},
		};
		const spatialRelationsFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: {
				scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
				placeKey: {
					in: [
						'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
						'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
					],
				},
				caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
				periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
			},
		};
		const order = null;
		const hasSpatialOrAreaRelations = actions.hasSpatialOrAreaRelations(
			state,
			spatialRelationsFilter,
			order
		);
		assert.deepStrictEqual(hasSpatialOrAreaRelations, true);
	});
	it('Find that has SpatialOrAreaRelations _1', function () {
		const state = {
			data: {
				spatialRelations: {
					indexes: [
						{
							filter: {
								layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
								modifiers: {
									scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
									placeKey: {
										in: [
											'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
											'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
										],
									},
									caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
									periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								},
							},
							order: null,
						},
					],
				},
			},
		};
		const spatialRelationsFilter = {
			modifiers: {
				scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
				placeKey: {
					in: [
						'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
						'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
					],
				},
				caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
				periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
			},
		};
		const order = null;
		const hasSpatialOrAreaRelations = actions.hasSpatialOrAreaRelations(
			state,
			spatialRelationsFilter,
			order
		);
		assert.deepStrictEqual(hasSpatialOrAreaRelations, false);
	});

	it('Find that has SpatialOrAreaRelations _2', function () {
		const state = {
			data: {
				spatialRelations: {
					indexes: [
						{
							filter: {
								layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
								modifiers: {
									scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
									placeKey: {
										in: [
											'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
											'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
										],
									},
									caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
									periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
								},
							},
							order: null,
						},
					],
				},
			},
		};
		const spatialRelationsFilter = {
			layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
			modifiers: {
				placeKey: {
					in: [
						'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
						'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
					],
				},
				caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
				periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
			},
		};
		const order = null;
		const hasSpatialOrAreaRelations = actions.hasSpatialOrAreaRelations(
			state,
			spatialRelationsFilter,
			order
		);
		assert.deepStrictEqual(hasSpatialOrAreaRelations, false);
	});
});
