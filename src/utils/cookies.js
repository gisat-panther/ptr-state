import {isServer} from '@gisatcz/ptr-core';

/**
 * Set given value to the browser cookies
 * @param {String} cookieValue
 */
const setCookie = cookieValue => {
	if (!isServer && cookieValue && typeof cookieValue === 'string') {
		document.cookie = cookieValue;
	}
};
/**
 * Look up for name in browser cookies
 * @param {string} name
 * @returns {string?} cookie value if exists under name in browser cookie or null if is on server or not found.
 */
const getCookie = name => {
	if (isServer) {
		return null;
	} else {
		// Split cookie string and get all individual name=value pairs in an array
		const cookieArr = document.cookie.split(';');

		// Loop through the array elements
		for (let i = 0; i < cookieArr.length; i++) {
			const cookiePair = cookieArr[i].split('=');

			/* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
			if (name == cookiePair[0].trim()) {
				// Decode the cookie value and return
				return decodeURIComponent(cookiePair[1]);
			}
		}

		// Return null if not found
		return null;
	}
};

export default {
	getCookie,
	setCookie,
};
