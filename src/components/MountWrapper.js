import React from 'react';

export default function mountWrapper(Component) {
	return class extends React.PureComponent {
		componentDidMount() {
			this.props.onMount();
		}

		componentWillUnmount() {
			this.props.onUnmount();
		}

		render() {
			return <Component {...this.props} />;
		}
	};
}
