import {connect} from 'react-redux';
import Action from '../state/Action';
import Select from '../state/Select';

const mapStateToProps = (state, props) => {
	return {
		activeUser: Select.users.getActive(state),
		loginOverlayOpen: Select.components.get(
			state,
			'App_Container',
			'loginOverlayOpen'
		),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogIn: (email, password) => {
			dispatch(Action.users.apiLoginUser(email, password));
		},
		onLoginOverlayClose: () => {
			dispatch(
				Action.components.set('App_Container', 'loginOverlayOpen', false)
			);
		},
		onMount: () => dispatch(Action.users.ensureCurrentUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps);
