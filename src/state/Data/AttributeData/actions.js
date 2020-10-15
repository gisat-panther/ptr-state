import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

const registerIndex = common.registerIndex(actionTypes);

// ============ creators ===========
const receiveIndexed = (result, filter, order, changedOn) => {
    return dispatch => {
        // add data to store
        if (result) {            
            dispatch(addOrUpdateData(result));
        }
        // attribute data index is same like spatial data index
        // add to index
        // dispatch(addIndex(filter, order, result, changedOn));
    }
}

function addOrUpdateData(result) {
    return (dispatch, getState) => {
        const state = getState();
        for(const key of Object.keys(result)) {
            if(_.isEmpty(state.data.attributeData.byDataSourceKey[key])) {
                dispatch(addDataAction(key, result[key]));
            } else {
                dispatch(updateDataAction(key, result[key]));
            }
        }
    }
}


function addIndex(filter, order, result, changedOn) {
    return (dispatch) => {
        for(const key of Object.keys(result)) {
            dispatch(addIndexesAction(key, filter, order, result[key], changedOn));
        }
    }
}


// ============ actions ============
function addDataAction(key, data) {
    return {
        type: actionTypes.ADD,
        key,
        data,
    }
}

function updateDataAction(key, data) {
    return {
        type: actionTypes.UPDATE,
        key,
        data,
    }
}


// ============ export ===========

export default {
    receiveIndexed,
    registerIndex,
}
