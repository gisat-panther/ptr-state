import {combineReducers} from 'redux';

import attributeRelations, {
	INITIAL_STATE as attributeRelationsInitialState,
} from './AttributeRelations/reducers';
import attributeDataSources, {
	INITIAL_STATE as attributeDataSourcesInitialState,
} from './AttributeDataSources/reducers';
import attributeData, {
	INITIAL_STATE as attributeDataInitialState,
} from './AttributeData/reducers';
import components, {
	INITIAL_STATE as componentsInitialState,
} from './Components/reducers';
import spatialRelations, {
	INITIAL_STATE as spatialRelationsInitialState,
} from './SpatialRelations/reducers';
import spatialDataSources, {
	INITIAL_STATE as spatialDataSourcesInitialState,
} from './SpatialDataSources/reducers';
import spatialData, {
	INITIAL_STATE as spatialDataInitialState,
} from './SpatialData/reducers';

export const INITIAL_STATE = {
	attributeRelations: attributeRelationsInitialState,
	attributeDataSources: attributeDataSourcesInitialState,
	attributeData: attributeDataInitialState,
	components: componentsInitialState,
	spatialRelations: spatialRelationsInitialState,
	spatialDataSources: spatialDataSourcesInitialState,
	spatialData: spatialDataInitialState,
};

export default combineReducers({
	attributeData: attributeData,
	attributeDataSources: attributeDataSources,
	attributeRelations: attributeRelations,
	components: components,
	spatialData: spatialData,
	spatialDataSources: spatialDataSources,
	spatialRelations: spatialRelations,
});
