import reducers, {
	INITIAL_STATE,
} from '../../../../src/state/AreaRelations/reducers';
import testHelpers from '../../../helpers';
import ActionTypes from '../../../../src/constants/ActionTypes';

import add from '../../_common/reducers/add-test';
import addUnreceivedKeys from '../../_common/reducers/addUnreceivedKeys-test';
import addIndex from '../../_common/reducers/addIndex-test';
import registerUseIndexed from '../../_common/reducers/registerUseIndexed-test';
import useIndexedClear from '../../_common/reducers/useIndexedClear-test';
import useIndexedClearAll from '../../_common/reducers/useIndexedClearAll-test';

describe('_reducers', () => {
	const expectedActionTypes = [
		'ADD',
		'ADD_UNRECEIVED',
		'ENSURE.ERROR',
		'INDEX.ADD',
		'INDEX.CLEAR_ALL',
		'USE.INDEXED.CLEAR',
		'USE.INDEXED.CLEAR_ALL',
		'USE.INDEXED.REGISTER',
	];
	testHelpers.baseReducersMetadataTestSet(
		reducers,
		INITIAL_STATE,
		'AREA_RELATIONS',
		expectedActionTypes
	);
});

describe('add', () => {
	add.forEach(test => {
		const action = {...test.action, type: ActionTypes.AREA_RELATIONS.ADD};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addIndex', () => {
	addIndex.forEach(test => {
		const action = {...test.action, type: ActionTypes.AREA_RELATIONS.INDEX.ADD};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addUnreceivedKeys', () => {
	addUnreceivedKeys.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.AREA_RELATIONS.ADD_UNRECEIVED,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('registerUseIndexed', () => {
	registerUseIndexed.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.AREA_RELATIONS.USE.INDEXED.REGISTER,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useIndexedClear', () => {
	useIndexedClear.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.AREA_RELATIONS.USE.INDEXED.CLEAR,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useIndexedClearAll', () => {
	useIndexedClearAll.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.AREA_RELATIONS.USE.INDEXED.CLEAR_ALL,
		};
		it(test.name, () => test.test(action, reducers));
	});
});
