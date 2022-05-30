import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getDeletePermissionByKey', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {
				k1: {
					key: 'k1',
					permissions: {activeUser: {delete: true, update: true}},
				},
				k2: {key: 'k2', permissions: {guest: {delete: true, update: false}}},
				k3: {key: 'k3', permissions: {guest: {delete: false, update: true}}},
				k4: {key: 'k4', permissions: {guest: {}}},
				k5: {key: 'k5', permissions: {}},
				k6: {key: 'k6'},
			},
		},
	};

	it('should return true', () => {
		const key = 'k1';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isTrue(output);
	});

	it('should return true 2', () => {
		const key = 'k2';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isTrue(output);
	});

	it('should return false', () => {
		const key = 'k3';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});

	it('should return false 2', () => {
		const key = 'k4';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});

	it('should return false 3', () => {
		const key = 'k5';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});

	it('should return false if there are no permissions', () => {
		const key = 'k6';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});

	it('should return false if there is no byKey', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {byKey: null}};
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});

	it('should return false if no model found for given key', () => {
		const key = 'kXY';
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});

	it('should return false if byKey is empty', () => {
		const key = 'k1';
		const state = {[sampleSubstoreName]: {byKey: {}}};
		const output = commonSelectors.getDeletePermissionByKey(getSubstate)(
			state,
			key
		);
		assert.isFalse(output);
	});
});
