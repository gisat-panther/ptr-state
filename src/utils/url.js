import path from 'path';

const getBackendUrl = (localConfiguration, urlPath) =>
	localConfiguration.apiBackendProtocol +
	'://' +
	path.join(
		localConfiguration.apiBackendHost,
		localConfiguration.apiBackendPath,
		urlPath
	);

export default {
	getBackendUrl,
};
