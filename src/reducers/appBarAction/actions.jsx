import {APP_BAR_ACTION_ADD_TOP_ACTION} from './constants'

export function addTopElement(key, value) {
    return function (dispatch) {
        dispatch({type: APP_BAR_ACTION_ADD_TOP_ACTION, payload: {key, value}})
    }
}