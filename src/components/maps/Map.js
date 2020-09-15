import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils';

const mapStateToProps = (state, ownProps) => {
    if (ownProps.stateMapKey) {
        return {
            backgroundLayer: null,
            layers: null,
            view: null,
            viewLimits: null,
            mapKey: ownProps.stateMapKey
        }
    } else {
        return {
            backgroundLayer: null,
            layers: null
        }
    }
};

const mapDispatchToPropsFactory = () => {
    const componentId = 'Map_' + utils.randomString(6);

    return (dispatch, ownProps) => {
        if (ownProps.stateMapKey) {
            return {
                onMount: () => {
                    dispatch(Action.maps.use(ownProps.stateMapKey));
                },

                onUnmount: () => {

                },

                refreshUse: () => {

                },

                onViewChange: (update) => {

                },

                resetHeading: () => {

                },

                onClick: (view) => {

                },
                onLayerClick: (mapKey, layerKey, selectedFeatureKeys) => {

                }
            }
        } else {
            let mapKey = ownProps.mapKey || componentId;

            return {
                onMount: () => {
                    dispatch(Action.maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
                },

                onUnmount: () => {

                },

                refreshUse: () => {

                },

                onViewChange: ownProps.onViewChange || ((update) => {}),

                onClick: ownProps.onClick || ((view) => {})
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
