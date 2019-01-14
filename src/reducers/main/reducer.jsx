import {
    TOGGLE_DRAWER
} from './constants'

const INITIAL_STATE = {
    drawer: false,
}

export default function mainReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TOGGLE_DRAWER: {
            return {
                ...state,
                drawer: action.payload,
            }
        }
    }
    return state
}