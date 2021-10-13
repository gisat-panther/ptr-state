import {combineReducers} from 'redux';

import * as areaTreeLevels from './AreaTreeLevels/reducers';
import * as areaTrees from './AreaTrees/reducers';

export const INITIAL_STATE = {
	areaTreeLevels: areaTreeLevels.INITIAL_STATE,
	areaTrees: areaTrees.INITIAL_STATE,
};

export default combineReducers({
	areaTreeLevels: areaTreeLevels.default,
	areaTrees: areaTrees.default,
});
