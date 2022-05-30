import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeData/actions';

describe('state/Data/AttributeData/actions/getTiledIndexDataBySpatialData', function () {
	it('get index for one datasource on one tile', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
		};

		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
			},
		};

		const index = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);

		assert.deepEqual(index, {
			7: {
				'0,1': {
					'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
				},
			},
		});
	});

	it('get index for two datasources on one tile', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
			'848e2559-936d-4262-a808-4c87aa60217d': {
				data: {
					18503: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18503],
					},
				},
			},
		};

		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
			},
			'87560e4f-abb7-4d46-aa58-db23dba872a6': {
				18503: '30',
			},
		};

		const index = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);

		assert.deepEqual(index, {
			7: {
				'0,1': {
					'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
					'87560e4f-abb7-4d46-aa58-db23dba872a6': [18503],
				},
			},
		});
	});

	it('get index for two datasources on two tiles', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
					18504: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
						'1,1': [18504],
					},
				},
			},
			'848e2559-936d-4262-a808-4c87aa60217d': {
				data: {
					18503: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
					18505: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18503],
						'1,1': [18505],
					},
				},
			},
		};

		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
				18504: '-10',
			},
			'87560e4f-abb7-4d46-aa58-db23dba872a6': {
				18503: '30',
				18505: 'string test',
			},
		};

		const index = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);

		assert.deepEqual(index, {
			7: {
				'0,1': {
					'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
					'87560e4f-abb7-4d46-aa58-db23dba872a6': [18503],
				},
				'1,1': {
					'55f48ed1-ee67-47bd-a044-8985662ec29f': [18504],
					'87560e4f-abb7-4d46-aa58-db23dba872a6': [18505],
				},
			},
		});
	});

	it('get index for two datasources on two tiles in two levels', function () {
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
					18504: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
					6: {
						'0,0': [18504],
					},
				},
			},
			'848e2559-936d-4262-a808-4c87aa60217d': {
				data: {
					18503: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
					18505: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18503],
					},
					6: {
						'0,0': [18505],
					},
				},
			},
		};

		const attributeData = {
			'55f48ed1-ee67-47bd-a044-8985662ec29f': {
				18502: '27',
				18504: '-10',
			},
			'87560e4f-abb7-4d46-aa58-db23dba872a6': {
				18503: '30',
				18505: 'string test',
			},
		};

		const index = actions.getTiledIndexDataBySpatialData(
			spatialData,
			attributeData
		);

		assert.deepEqual(index, {
			6: {
				'0,0': {
					'55f48ed1-ee67-47bd-a044-8985662ec29f': [18504],
					'87560e4f-abb7-4d46-aa58-db23dba872a6': [18505],
				},
			},
			7: {
				'0,1': {
					'55f48ed1-ee67-47bd-a044-8985662ec29f': [18502],
					'87560e4f-abb7-4d46-aa58-db23dba872a6': [18503],
				},
			},
		});
	});
});
