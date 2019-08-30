import {
    APP_BAR_ACTION_CLEAR_ACTION,
    APP_BAR_ACTION_DELETE_ACTION,
    APP_BAR_ACTION_POSITION_MAIN, APP_BAR_ACTION_POSITION_MORE,
    APP_BAR_ACTION_SET_ACTION
} from './constants'


export function setAppBarActionMain(key, element) {
    return setAppBarAction(key, APP_BAR_ACTION_POSITION_MAIN, element)
}

export function setAppBarActionMore(key, element) {
    return setAppBarAction(key, APP_BAR_ACTION_POSITION_MORE, element)
}

export function setAppBarAction(key, position, element) {
    return function (dispatch) {
        element = {
            key,
            position,
            order: 1,
            ...element
        }
        dispatch({type: APP_BAR_ACTION_SET_ACTION, payload: element})
    }
}

export function deleteAppBarActionMain(key) {
    return deleteAppBarAction(key, APP_BAR_ACTION_POSITION_MAIN)
}

export function deleteAppBarActionMore(key) {
    return deleteAppBarAction(key, APP_BAR_ACTION_POSITION_MORE)
}

export function deleteAppBarAction(key, posititon) {
    return function (dispatch) {
        dispatch({type: APP_BAR_ACTION_DELETE_ACTION, payload: {key, posititon}})
    }
}

export function clearAppBarActionMain(key) {
    return clearAppBarAction(key, APP_BAR_ACTION_POSITION_MAIN)
}

export function clearAppBarActionMore(key) {
    return clearAppBarAction(key, APP_BAR_ACTION_POSITION_MORE)
}

export function clearAppBarAction(position = null) {
    return function (dispatch) {
        dispatch({type: APP_BAR_ACTION_CLEAR_ACTION, payload: position})
    }
}
