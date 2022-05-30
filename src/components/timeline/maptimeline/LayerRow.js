import {connect} from 'react-redux';

import mapTimelineActions from '../../../state/Timeline/MapTimeline/actions';

const mapStateToProps = (state, ownProps) => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMount: () => {},
		toggleLayer: (
			timelineLayerPeriodItem,
			timelineLayer,
			mapKey,
			layerRow,
			layers
		) => {
			dispatch(
				mapTimelineActions.toggleTimelineLayer(
					timelineLayerPeriodItem,
					timelineLayer,
					mapKey,
					layerRow,
					layers
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps);
