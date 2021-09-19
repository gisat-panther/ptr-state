import {connect} from 'react-redux';
import Action from '../state/Action';
import Select from '../state/Select';

const mapStateToProps = (state, props) => {
	return {
		user: Select.users.getActiveUser(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: () => {
			dispatch(
				Action.components.set('App_Container', 'loginOverlayOpen', true)
			);
		},
		logout: () => {
			dispatch(Action.users.apiLogoutUser());
		},
		loginViaSso: provider => () => dispatch(Action.users.loginViaSso(provider)),
		onMount: () => dispatch(Action.users.ensureCurrentUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps);
