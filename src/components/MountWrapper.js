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

export default MountWrapper;
