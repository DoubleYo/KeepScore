import {
    GAME_HISTORY_LOAD, GAME_PLAYERS_COUNT, GAME_PLAYERS_NAME
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
            const games = state.history.filter((game) => game.hash === action.payload)
            const scoreboard = (games.length > 0)
                ? games[0]
                : INITIAL_STATE.scoreboard
            return {
                ...state,
                scoreboard
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
    }
    return state
}