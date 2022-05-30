import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('haveAllKeysRegisteredUse', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			inUse: {keys: {componentA: ['key1', 'key2', 'key3']}},
		},
	};

	it('should return true, if all of the keys have registered use for given component', () => {
		const componentKey = 'componentA';
		const keys = ['key1', 'key2'];
		const output = commonSelectors.haveAllKeysRegisteredUse(getSubstate)(
			state,
			componentKey,
			keys
		);
		assert.isTrue(output);
	});

	it('should return false, if at least one of the keys is not registered for given component', () => {
		const componentKey = 'componentA';
		const keys = ['key1', 'key4'];
		const output = commonSelectors.haveAllKeysRegisteredUse(getSubstate)(
			state,
			componentKey,
			keys
		);
		assert.isFalse(output);
	});

	it('should return false, if no component key given', () => {
		const keys = ['key1'];
		const output = commonSelectors.haveAllKeysRegisteredUse(getSubstate)(
			state,
			null,
			keys
		);
		assert.isFalse(output);
	});

	it('should return false, if no keys given', () => {
		const componentKey = 'componentA';
		const keys = [];
		const output = commonSelectors.haveAllKeysRegisteredUse(getSubstate)(
			state,
			componentKey,
			keys
		);
		assert.isFalse(output);
	});

	it('should return false, if no keys registered at all', () => {
		const state = {
			[sampleSubstoreName]: {inUse: {keys: {}}},
		};
		const componentKey = 'componentA';
		const keys = ['key1'];
		const output = commonSelectors.haveAllKeysRegisteredUse(getSubstate)(
			state,
			componentKey,
			keys
		);
		assert.isFalse(output);
	});
});
