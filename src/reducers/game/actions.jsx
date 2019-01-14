import {
    GAME_HISTORY_LOAD
} from './constants'

export function gameHistoryLoad(hash) {
    return function (dispatch) {
        dispatch({type: GAME_HISTORY_LOAD, payload: hash})
    }
}