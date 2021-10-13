import {combineReducers} from 'redux';

import areaTreeLevels, {
	INITIAL_STATE as areaTreeLevelsInitialState,
} from './AreaTreeLevels/reducers';
import areaTrees, {
	INITIAL_STATE as areaTreesInitialState,
} from './AreaTrees/reducers';

export const INITIAL_STATE = {
	areaTreeLevels: areaTreeLevelsInitialState,
	areaTrees: areaTreesInitialState,
};

export default combineReducers({
	areaTreeLevels: areaTreeLevels,
	areaTrees: areaTrees,
});
