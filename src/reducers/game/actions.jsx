import {
    GAME_HISTORY_LOAD,
    GAME_PLAYER_HISTORY_ADD,
    GAME_PLAYER_HISTORY_REMOVE,
    GAME_PLAYERS_COUNT,
    GAME_PLAYERS_NAME
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

export function playerHistoryAdd(player, delta) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYER_HISTORY_ADD, payload: {player, delta}})
    }
}

export function playerHistoryRemove(player, index = -1) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYER_HISTORY_REMOVE, payload: {player, index}})
    }
}