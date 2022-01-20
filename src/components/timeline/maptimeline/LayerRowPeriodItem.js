import {connect} from 'react-redux';
import {setState} from '@jvitela/recompute';
import {utils} from '@gisatcz/ptr-utils';

import mapTimelineSelectors from '../../../state/Timeline/MapTimeline/selectors';
import periodsSelectors from '../../../state/Periods/selectors';
import periodsActions from '../../../state/Periods/actions';

const componentId = `layer_row_period_item_${utils.uuid()}`;

const mapStateToProps = (state, ownProps) => {
	setState(state);

	let standardized = null;
	if (ownProps?.itemPeriod?.key) {
		standardized = periodsSelectors.getByKey(state, ownProps.itemPeriod.key);
	} else {
		standardized = ownProps.itemPeriod;
	}
	const active = mapTimelineSelectors.getTimelineLayerPeriodActive(
		ownProps.mapKey,
		ownProps.layer,
		ownProps.itemPeriod
	);

	return {
		standardized,
		active,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMount: () => {
			//ensure layers
		},
		ensurePeriod: periodKey => {
			dispatch(periodsActions.useKeys([periodKey], componentId));
		},
		clearUsePeriod: () => {
			periodsActions.useKeysClear(componentId);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps);
