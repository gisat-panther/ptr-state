import {assert} from 'chai';
import helpers from '../../../../src/state/Components/helpers';

describe('state/Components/helpers/setHelper', function () {
	it('set value on path _1', function () {
		const state = helpers.setHelper({}, ['car'], {color: 'blue'});
		assert.deepStrictEqual(state, {
			car: {
				color: 'blue',
			},
		});
	});

	it('set value on path _2', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue'}},
			['car', 'color'],
			'red'
		);
		assert.deepStrictEqual(state, {
			car: {
				color: 'red',
			},
		});
	});

	it('set value on path _3', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue'}},
			['car', 'color'],
			null
		);
		assert.deepStrictEqual(state, {
			car: {
				color: null,
			},
		});
	});

	it('set value on path _4', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue', type: 'van'}},
			['car', 'color'],
			undefined
		);
		assert.deepStrictEqual(state, {
			car: {
				type: 'van',
			},
		});
	});

	it('set value on path _5', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue', type: 'van'}},
			['car'],
			undefined
		);
		assert.deepStrictEqual(state, {});
	});

	it('set value on path _6', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue', type: 'van'}},
			['car'],
			null
		);
		assert.deepStrictEqual(state, {car: null});
	});

	it('set value on path _7', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue', type: 'van'}, bike: {color: 'black'}},
			['car'],
			undefined
		);
		assert.deepStrictEqual(state, {bike: {color: 'black'}});
	});

	it('set value on path _8', function () {
		const state = helpers.setHelper(
			{car: {color: 'blue', type: 'van'}, bike: {color: 'black'}},
			[''],
			undefined
		);
		assert.deepStrictEqual(state, {
			car: {color: 'blue', type: 'van'},
			bike: {color: 'black'},
		});
	});

	it('set value on path _9', function () {
		const path = null;
		const state = {car: {color: 'blue', type: 'van'}, bike: {color: 'black'}};
		const updatedState = helpers.setHelper(state, path, undefined);
		assert.deepStrictEqual(updatedState, state);
	});
});
