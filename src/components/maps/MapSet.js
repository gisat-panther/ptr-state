import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils';

const mapStateToProps = (state, ownProps) => {
	if (ownProps.stateMapSetKey) {
		const activeMapKey = Select.maps.getMapSetActiveMapKey(
			state,
			ownProps.stateMapSetKey
		);
		return {
			activeMapKey,
			activeMapView: Select.maps.getMapSetActiveMapView(
				state,
				ownProps.stateMapSetKey
			),
			maps: Select.maps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
			view: Select.maps.getMapSetView(state, ownProps.stateMapSetKey),
			activeMapViewport: Select.maps.getViewportByMapKey(state, activeMapKey),
			viewLimits: Select.maps.getMapSetViewLimits(
				state,
				ownProps.stateMapSetKey
			),
		};
	} else {
		return {
			backgroundLayer: null,
			layers: null,
		};
	}
};

const mapDispatchToPropsFactory = () => {
	const componentId = 'MapSet_' + utils.randomString(6);

	return (dispatch, ownProps) => {
		if (ownProps.stateMapSetKey) {
			return {
				onMount: () => {
					dispatch(Action.maps.mapSetUseRegister(ownProps.stateMapSetKey));
				},
				onUnmount: () => {
					dispatch(Action.maps.mapSetUseClear(ownProps.stateMapSetKey));
				},
				updateView: (update, mapKey) => {
					dispatch(Action.maps.updateMapAndSetView(mapKey, update));
				},
				resetHeading: mapKey => {},
				onMapRemove: mapKey => {
					dispatch(
						Action.maps.removeMapFromSet(ownProps.stateMapSetKey, mapKey)
					);
				},
			};
		} else {
			let setKey = ownProps.setKey || componentId;
			return {
				onMount: () => {},

				onUnmount: () => {},

				refreshUse: () => {},
			};
		}
	};
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
