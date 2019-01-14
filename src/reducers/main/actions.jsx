import {
    TOGGLE_DRAWER
} from './constants'

export function toggleDrawer(state) {
    return function (dispatch) {
        dispatch({type: TOGGLE_DRAWER, payload: state})
    }
}