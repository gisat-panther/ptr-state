import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getUsedKeysForComponent', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			inUse: {keys: {componentA: ['key1', 'key2', 'key3'], componentB: []}},
		},
	};

	it('should return used keys for component', () => {
		const componentKey = 'componentA';
		const expectedOutput = ['key1', 'key2', 'key3'];
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null if no keys registered for given component', () => {
		const componentKey = 'componentB';
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.isNull(output);
	});

	it('should return null if no keys registered for given component 2', () => {
		const componentKey = 'componentC';
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.isNull(output);
	});

	it('should return null if no component key given', () => {
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if no keys registered at all', () => {
		const state = {
			[sampleSubstoreName]: {inUse: {keys: {}}},
		};
		const componentKey = 'componentA';
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.isNull(output);
	});
});
