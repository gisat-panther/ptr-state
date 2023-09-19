import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
};

const add = (state, action) => {
	if (action?.data?.length) {
		let newData = {...state.byKey};
		action.data.forEach(model => {
			const {
				key,
				data: {description, nameDisplay, nameInternal, postgis, web},
			} = {...newData[model.key], ...model};
			newData[key] = {
				key,
				data: {
					description,
					nameDisplay,
					nameInternal,
					...(postgis ? {...postgis} : {}), //FIXME structure
					...(web ? {...web.configuration, url: web.url} : {}), //FIXME structure, temporary all ata are in web.configuration
				},
			};
			delete newData[model.key].outdated;
			delete newData[model.key].unreceived;
		});

		return {...state, byKey: newData};
	} else {
		return state;
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.SPATIAL_DATA_SOURCES.ADD:
			return add(state, action);
		case ActionTypes.DATA.SPATIAL_DATA_SOURCES.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.DATA.SPATIAL_DATA_SOURCES.UPDATE_STORE:
			return common.updateStore(state, action);
		default:
			return state;
	}
};
