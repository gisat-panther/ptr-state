import _ from "lodash";
import _fetch from "isomorphic-fetch";
import path from "path";
import queryString from "query-string";

const TTL = 5;

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
 * @returns response or error
 */
export default function request (localConfig, apiPath, method, query, payload, ttl) {
	if (_.isUndefined(ttl)) ttl = TTL;
	let url = localConfig.apiBackendProtocol + '://' + path.join(localConfig.apiBackendHost, localConfig.apiBackendPath, apiPath);
	if (query) {
		url += '?' + queryString.stringify(query);
	}

	return fetch(url, {
		method: method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: payload ? JSON.stringify(payload) : null
	}).then(
		response => {
			let contentType = response.headers.get('Content-type');
			if (response.ok && contentType && (contentType.indexOf('application/json') !== -1)) {
				return response.json().then(body => {
					if (body.data) {
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