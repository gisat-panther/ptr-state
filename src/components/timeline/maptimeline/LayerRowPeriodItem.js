import {connect} from 'react-redux';
import {setState} from '@jvitela/recompute';
import {utils, period as periodParser} from '@gisatcz/ptr-utils';
import mapTimelineSelectors from '../../../state/Timeline/MapTimeline/selectors';
import periodsSelectors from '../../../state/Periods/selectors';

const getParsedPeriod = period => {
	if (period?.data?.start && period?.data?.end) {
		const parsed = periodParser.parse(
			`${period.data.start}/${period.data.end}`
		);
		return {
			start: parsed.start,
			end: parsed.end,
		};
	} else if (period?.data?.period) {
		const parsed = periodParser.parse(period.data.period);
		return {
			start: parsed.start.toString(),
			end: parsed.end.toString(),
		};
	} else {
		return null;
	}
};

const mapStateToProps = (state, ownProps) => {
	setState(state);

	let parsedPeriod = null;
	if (ownProps?.originPeriod?.key && !ownProps?.originPeriod?.data) {
		parsedPeriod = periodsSelectors.getByKey(state, ownProps.originPeriod.key);
	} else {
		parsedPeriod = ownProps.originPeriod;
	}

	parsedPeriod = getParsedPeriod(parsedPeriod);

	const active = mapTimelineSelectors.getTimelineLayerPeriodActive(
		ownProps.mapKey,
		ownProps.layer,
		ownProps.originPeriod
	);

	return {
		parsedPeriod,
		active,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMount: () => {},
	};
};

export default connect(mapStateToProps, mapDispatchToProps);
