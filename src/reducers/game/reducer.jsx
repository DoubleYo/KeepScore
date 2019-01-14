import {
    GAME_HISTORY_LOAD
} from './constants'

const INITIAL_STATE = {
    scoreboard: {
        hash: null,
        created: null,
        players: [],
    },
    history: [],
}

const PLAYER_STATE = {
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
    }
    return state
}