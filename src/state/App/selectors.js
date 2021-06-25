import {createSelector} from 'reselect';
import _ from 'lodash';
import path from 'path';

import {createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getKey = state => state.app.key;
const getCompleteConfiguration = state => state.app.configuration;
const getCompleteLocalConfiguration = state => state.app?.localConfiguration;

const getCompleteLocalConfigurationObserver = createRecomputeObserver(
	getCompleteLocalConfiguration
);

const getConfiguration = createSelector(
	[getCompleteConfiguration, (state, path) => path],
	(configuration, path) => _.get(configuration, path, null)
);

const getLocalConfiguration = createSelector(
	[getCompleteLocalConfiguration, (state, path) => path],
	(localConfiguration, path) => _.get(localConfiguration, path, null)
);

const getBackendUrl = createSelector(
	[getCompleteLocalConfiguration, (state, path) => path],
	(localConfiguration, urlPath) =>
		localConfiguration.apiBackendProtocol +
		'://' +
		path.join(
			localConfiguration.apiBackendHost,
			localConfiguration.apiBackendPath,
			'/backend',
			urlPath
		)
);

export default {
	getKey,
	getConfiguration,
	getCompleteConfiguration,
	getLocalConfiguration,
	getCompleteLocalConfiguration,
	getCompleteLocalConfigurationObserver,
	getBackendUrl,
};
