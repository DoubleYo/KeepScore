import {
    APP_BAR_ACTION_CLEAR_ACTION,
    APP_BAR_ACTION_DELETE_ACTION,
    APP_BAR_ACTION_POSITION_MAIN,
    APP_BAR_ACTION_POSITION_MORE,
    APP_BAR_ACTION_SET_ACTION
} from './constants'

import {OrderedMap} from 'immutable'

const INITIAL_STATE = {
    [APP_BAR_ACTION_POSITION_MAIN]: new OrderedMap(),
    [APP_BAR_ACTION_POSITION_MORE]: new OrderedMap(),
}

export default function appBarActionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APP_BAR_ACTION_SET_ACTION: {
            const {position, key} = action.payload
            const list = state[position].set(key, action.payload).sortBy(element => element.order)
            return {...state, [position]: list}
        }
        case APP_BAR_ACTION_DELETE_ACTION: {
            const {position, key} = action.payload
            const list = state[position].delete(key)
            return {...state, [position]: list}
        }
        case APP_BAR_ACTION_CLEAR_ACTION: {
            if (action.payload !== null) {
                const list = state[action.payload].clear()
                return {...state, [action.payload]: list}
            }
            return INITIAL_STATE
        }
    }
    return state
}
