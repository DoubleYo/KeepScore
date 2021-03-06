import {
    GAME_HISTORY_REMATCH,
    GAME_HISTORY_LOAD, GAME_HISTORY_REMOVE,
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
        updated: null,
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
            const scoreboard = {...state.scoreboard}
            scoreboard.updated = Date.now()

            const history = [...state.history]
            const gameIndex = history.findIndex((game) => game.hash === state.scoreboard.hash)
            if (gameIndex !== -1) {
                history.splice(gameIndex, 1, scoreboard)
            } else {
                history.push(scoreboard)
            }
            return {
                ...state,
                scoreboard,
                history,
            }
        }
        case GAME_HISTORY_REMOVE: {
            const history = [...state.history]
            action.payload.forEach((hash) => {
                const gameIndex = history.findIndex((game) => game.hash === hash)
                if (gameIndex !== -1) {
                    history.splice(gameIndex, 1)
                }
            })
            return {
                ...state,
                history,
            }
        }
        case GAME_HISTORY_REMATCH: {
            const history = [...state.history]
            const game = history.find((game) => game.hash === action.payload)
            const newGame = {
                hash: getHash(),
                created: Date.now(),
                updated: Date.now(),
                players: [],
            }
            game.players.forEach((player) => {
                const newPlayer = {...player}
                newPlayer.history = []
                newGame.players.push(newPlayer)
            })
            history.push(newGame)
            return {
                ...state,
                history,
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
                    players: [...action.payload],
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
