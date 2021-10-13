import {combineReducers} from 'redux';

import * as attributeRelations from './AttributeRelations/reducers';
import * as attributeDataSources from './AttributeDataSources/reducers';
import * as attributeData from './AttributeData/reducers';
import * as components from './Components/reducers';
import * as spatialRelations from './SpatialRelations/reducers';
import * as spatialDataSources from './SpatialDataSources/reducers';
import * as spatialData from './SpatialData/reducers';

export const INITIAL_STATE = {
	attributeData: attributeData.INITIAL_STATE,
	attributeDataSources: attributeDataSources.INITIAL_STATE,
	attributeRelations: attributeRelations.INITIAL_STATE,
	components: components.INITIAL_STATE,
	spatialData: spatialData.INITIAL_STATE,
	spatialDataSources: spatialDataSources.INITIAL_STATE,
	spatialRelations: spatialRelations.INITIAL_STATE,
};

export default combineReducers({
	attributeData: attributeData.default,
	attributeDataSources: attributeDataSources.default,
	attributeRelations: attributeRelations.default,
	components: components.default,
	spatialData: spatialData.default,
	spatialDataSources: spatialDataSources.default,
	spatialRelations: spatialRelations.default,
});
