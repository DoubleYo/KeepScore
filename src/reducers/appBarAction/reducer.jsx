import {
    APP_BAR_ACTION_ADD_TOP_ACTION
} from './constants'

import {OrderedMap} from 'immutable'

const INITIAL_STATE = {
    top: new OrderedMap(),
    more: new OrderedMap(),
}

export default function appBarActionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APP_BAR_ACTION_ADD_TOP_ACTION: {
            const top = state.top.set(action.payload.key, action.payload.value)
            return {...state, top}
        }
    }
    return state
}
