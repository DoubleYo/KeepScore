import history from '../../history'
import {
    GAME_HISTORY_REMATCH,
    GAME_HISTORY_LOAD,
    GAME_HISTORY_REMOVE,
    GAME_HISTORY_SAVE,
    GAME_PLAYER_HISTORY_ADD,
    GAME_PLAYER_HISTORY_REMOVE,
    GAME_PLAYERS_COUNT,
    GAME_PLAYERS_NAME
} from './constants'
import {PAGE_PLAYERS_NAME, PAGE_ROOT, PAGE_SCOREBOARD} from '../routing'
import {AUTOCOMPLETE_PLAYERS_NAME_SAVE} from '../autocomplete/constants'

export function gameHistoryLoad(hash) {
    return function (dispatch) {
        dispatch({type: GAME_HISTORY_LOAD, payload: hash})
        history.push(PAGE_SCOREBOARD)
    }
}

export function gameHistoryRemove(hashes) {
    return function (dispatch) {
        if (typeof hashes === 'string') {
            hashes = [hashes]
        }
        dispatch({type: GAME_HISTORY_REMOVE, payload: hashes})
        history.push(PAGE_ROOT)
    }
}

export function gameHistoryRematch(hash) {
    return function (dispatch) {
        dispatch({type: GAME_HISTORY_REMATCH, payload: hash})
        history.push(PAGE_ROOT)
    }
}

export function setPlayersCount(count) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYERS_COUNT, payload: count})
        history.push(PAGE_PLAYERS_NAME)
    }
}

export function setPlayersName(players) {
    return function (dispatch) {
        dispatch({type: AUTOCOMPLETE_PLAYERS_NAME_SAVE, payload: players})
        dispatch({type: GAME_PLAYERS_NAME, payload: players})
        dispatch({type: GAME_HISTORY_SAVE})
        history.push(PAGE_SCOREBOARD)
    }
}

export function playerHistoryAdd(player, delta) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYER_HISTORY_ADD, payload: {player, delta}})
        dispatch({type: GAME_HISTORY_SAVE})
    }
}

export function playerHistoryRemove(player, index = -1) {
    return function (dispatch) {
        dispatch({type: GAME_PLAYER_HISTORY_REMOVE, payload: {player, index}})
        dispatch({type: GAME_HISTORY_SAVE})
    }
}