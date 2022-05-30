import ActionTypes from '../../constants/ActionTypes';

import common from '../_common/actions';

// ============ creators ===========

const setActiveKey = common.setActiveKey(ActionTypes.ATTRIBUTE_SETS);
const setActiveKeys = common.setActiveKeys(ActionTypes.ATTRIBUTE_SETS);
// ============ export ===========

export default {
	setActiveKey,
	setActiveKeys,
};
