import _ from 'lodash';
import _fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import urlUtils from '../../utils/url';

const TTL = 5;
const DATAPATH = 'data';

/**
 * Fetch implementation used by this module.
 *
 * It can be useful in tests to override this using `setFetch` fn.
 */
let fetch = _fetch;

/**
 * Set different fetch implementation. Useful in tests.
 */
export function setFetch(_fetch) {
	fetch = _fetch;
}

/**
 * Reset fetch implementation to default one.
 */
export function resetFetch() {
	fetch = _fetch;
}

/**
 * Request helper. Creates an request to backend.
 * @param localConfig
 * @param apiPath - path to backend endpoint (hostname taken from config)
 * @param method - HTTP method
 * @param query - url query as object
 * @param payload - payload as object
 * @param ttl - (optional) number of tries
 * @param dataPath - (optional) [default: "data"] Path where should data be. If response object does not have data on "dataPath", then return Error.
 * @returns response or error
 */
export default function request(
	localConfig,
	apiPath,
	method,
	query,
	payload,
	ttl,
	dataPath
) {
	if (_.isUndefined(ttl)) ttl = TTL;
	if (_.isUndefined(dataPath)) dataPath = DATAPATH;
	let url = urlUtils.getBackendUrl(localConfig, apiPath);
	if (query) {
		url += '?' + queryString.stringify(query);
	}

	return fetch(url, {
		method: method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: payload ? JSON.stringify(payload) : null,
	}).then(
		response => {
			let contentType = response.headers.get('Content-type');
			if (
				response.status === 200 ||
				(response.ok &&
					contentType &&
					contentType.indexOf('application/json') !== -1)
			) {
				return response.json().then(body => {
					if (dataPath === null || (dataPath && _.get(body, dataPath))) {
						return body;
					} else {
						throw new Error('no data returned');
					}
				});
			} else {
				throw new Error('response error');
			}
		},
		error => {
			if (ttl - 1) {
				request(localConfig, apiPath, method, query, payload, ttl - 1);
			} else {
				throw error;
			}
		}
	);
}
