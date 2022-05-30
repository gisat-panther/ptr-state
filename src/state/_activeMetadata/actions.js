import _ from 'lodash';
import common from '../_common/actions';
import DataComponentsActions from '../Data/Components/actions';
import MapsActions from '../Maps/actions';
import {STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE} from './constants';

/**
 * Ensure indexes with filter by active for each store from the list (above) & for data-based components
 *
 * @param filterKey {string} active metadata type key (e.g. scope, place, ..)
 */
function ensureDependenciesOfActiveMetadataType(filterKey) {
	return dispatch => {
		let filterByActive = {
			[filterKey]: true,
		};

		_.forIn(STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE, params => {
			dispatch(
				common.ensureIndexesWithFilterByActive(...params)(filterByActive)
			);
		});

		dispatch(DataComponentsActions.ensureWithFilterByActive(filterByActive));
		dispatch(MapsActions.ensureWithFilterByActive(filterByActive));
	};
}

export default {
	ensureDependenciesOfActiveMetadataType,
};
