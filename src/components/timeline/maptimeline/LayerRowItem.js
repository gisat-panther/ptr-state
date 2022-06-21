import {isPlainObject as _isPlainObject} from 'lodash';
import {connect} from 'react-redux';

import {utils} from '@gisatcz/ptr-utils';

import mapTimelineActions from '../../../state/Timeline/MapTimeline/actions';
import mapTimelineSelectors from '../../../state/Timeline/MapTimeline/selectors';
import periodsSelectors from '../../../state/Periods/selectors';

const order = null;
const start = 1;
const length = 1000;
const componentId = `layer_row_item_${utils.uuid()}`;

const mapStateToProps = (state, ownProps) => {
	const periodsConfig = _isPlainObject(ownProps?.layer?.periods)
		? ownProps.layer.periods
		: null;
	const periodKeys = periodsConfig
		? mapTimelineSelectors.getPeriodKeysForFilteredSpatialRelations(
				state,
				periodsConfig.filter,
				order
		  )
		: null;
	const periodsByConfig = periodsConfig
		? periodsSelectors.getByKeys(state, periodKeys)
		: null;
	return {
		periodsByConfig,
		periodKeys,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMount: () => {
			//ensure layers
		},
		usePeriods: periodsConfig => {
			//ensure spatial relations related to the layer and periods
			const {filterByActive, filter} = periodsConfig;

			dispatch(
				mapTimelineActions.useRelationsForLayerRowItem(
					filterByActive,
					filter,
					order,
					start,
					length,
					componentId
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps);