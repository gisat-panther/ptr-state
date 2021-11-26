/**
 * Set value on given path. If value is undefined, then delete property on path.
 * @param state {Object}
 * @param path {Array}
 * @param value {*}
 * @return {Object}
 */
function setHelper(state, path, value) {
	let remainingPath = [...path];
	let currentKey = remainingPath.shift();
	if (remainingPath.length) {
		return {
			...state,
			[currentKey]: setHelper(state[currentKey], remainingPath, value),
		};
	}

	if (currentKey === '') {
		return {...state};
	} else {
		if (typeof value === 'undefined') {
			delete state[currentKey];
			return {...state};
		} else {
			return {...state, [currentKey]: value};
		}
	}
}

export default {
	setHelper,
};
