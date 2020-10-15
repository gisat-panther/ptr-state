import common from '../../_common/selectors';
import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';

const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	return state.data.attributeData.byDataSourceKey?.[key];
});


const getDataByDataSourceKeys = createRecomputeSelector((dataSourceKeys) => {
	if (dataSourceKeys) {
		let data = {};
		_.forEach(dataSourceKeys, key => {
			const attributes = getByDataSourceKeyObserver(key);
			if (attributes && !_.isEmpty(attributes)) {
				data[key] = attributes;
			}
		});

		return !_.isEmpty(data) ? data : null;
	} else {
		return null;
	}
});

export default {
	getDataByDataSourceKeys
};