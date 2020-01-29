import {
    AUTOCOMPLETE_PLAYERS_NAME_SAVE
} from './constants'

import {uniq} from 'lodash'

const INITIAL_STATE = {
    playersName: [],
}

export default function autocompleteReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTOCOMPLETE_PLAYERS_NAME_SAVE: {
            const names = action.payload
                .map(player => player.name)
                .filter(name => !name.match(/Joueur/))

            const playersName = uniq(state.playersName.concat(names))
            return {
                ...state,
                playersName,
            }
        }
    }
    return state
}
