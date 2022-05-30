import React from 'react';
import {connect} from 'react-redux';
import {setState} from '@jvitela/recompute';
import Select from '../../state/Select';
import Action from '../../state/Action';

const mapStateToProps = (state, ownProps) => {
	setState(state);
	return Select.data.components.getDataForCartesianChart(ownProps);
};

const mapDispatchToPropsFactory = () => {
	return (dispatch, ownProps) => {
		return {
			onMount: () => {
				dispatch(Action.data.components.use(ownProps.stateComponentKey));
			},
			onUnmount: () => {
				dispatch(
					Action.data.components.componentUseClear(ownProps.stateComponentKey)
				);
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
