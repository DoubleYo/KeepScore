import {
    GAME_HISTORY_LOAD, GAME_PLAYERS_COUNT, GAME_PLAYERS_NAME
} from './constants'
import history from '../../history'
import {PAGE_PLAYERS_NAME, PAGE_SCOREBOARD} from '../routing'

export function gameHistoryLoad(hash) {
    return function (dispatch) {
        dispatch({type: GAME_HISTORY_LOAD, payload: hash})
    }
}

export function setPlayersCount(count) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYERS_COUNT, payload: count})
        history.push(PAGE_PLAYERS_NAME)
    }
}

export function setPlayersName(names) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYERS_NAME, payload: names})
        history.push(PAGE_SCOREBOARD)
    }
}