import PropTypes from 'prop-types';
import {useEffect} from 'react';

const MountWrapper = ({Component, onMount, onUnmount, ...restProps}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}

		return () => {
			if (typeof onUnmount === 'function') {
				onUnmount();
			}
		};
	}, []);
	return <Component {...restProps} />;
};

MountWrapper.propTypes = {
	Component: PropTypes.element,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

const wrapComponent = Component => {
	const ComponentRendered = ({onMount, onUnmount, ...restProps}) => {
		return <MountWrapper {...{onMount, onUnmount, Component, ...restProps}} />;
	};

	ComponentRendered.propTypes = {
		onMount: PropTypes.func,
		onUnmount: PropTypes.func,
	};

	return ComponentRendered;
};
wrapComponent.displayName = 'MountWrapper';
export default wrapComponent;
export {MountWrapper};
