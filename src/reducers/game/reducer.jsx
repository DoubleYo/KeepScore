import {
    GAME_HISTORY_LOAD,
    GAME_HISTORY_SAVE,
    GAME_PLAYER_HISTORY_ADD,
    GAME_PLAYER_HISTORY_REMOVE,
    GAME_PLAYERS_COUNT,
    GAME_PLAYERS_NAME
} from './constants'

import {getHash} from '../../utils/strings'

const INITIAL_STATE = {
    scoreboard: {
        hash: null,
        created: null,
        players: [],
    },
    history: [],
}

const PLAYER_STATE = {
    hash: null,
    name: null,
    history: [],
}

export default function gameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GAME_HISTORY_LOAD: {
            const game = state.history.find((game) => game.hash === action.payload)
            const scoreboard = game || INITIAL_STATE.scoreboard
            return {
                ...state,
                scoreboard
            }
        }
        case GAME_HISTORY_SAVE: {
            const gameIndex = state.history.findIndex((game) => game.hash === state.scoreboard.hash)
            const history = [...state.history]
            if (gameIndex !== undefined) {
                history.splice(gameIndex, 1, state.scoreboard)
            } else {
                history.push(state.scoreboard)
            }
            return {
                ...state,
                history
            }
        }
        case GAME_PLAYERS_COUNT: {
            const players = []
            for (let i = 0; i < action.payload; i++) {
                players.push({
                    ...PLAYER_STATE,
                    hash: getHash(),
                })
            }
            return {
                ...state,
                scoreboard: {
                    hash: getHash(),
                    created: Date.now(),
                    players
                }
            }
        }
        case GAME_PLAYERS_NAME: {
            return {
                ...state,
                scoreboard: {
                    ...state.scoreboard,
                    players: [...action.payload]
                }
            }
        }
        case GAME_PLAYER_HISTORY_ADD: {
            const newState = {...state}
            newState.scoreboard.players.forEach((player, index) => {
                if (player.hash === action.payload.player.hash) {
                    const history = [...player.history]
                    history.push({
                        value: action.payload.delta,
                        created: Date.now(),
                    })
                    newState.scoreboard.players[index].history = [...history]
                }
            })
            return newState
        }
        case GAME_PLAYER_HISTORY_REMOVE: {
            const newState = {...state}
            newState.scoreboard.players.forEach((player, index) => {
                if (player.hash === action.payload.player.hash) {
                    const history = [...player.history]
                    history.splice(action.payload.index, 1)
                    newState.scoreboard.players[index].history = [...history]
                }
            })
            return newState
        }
    }
    return state
}
