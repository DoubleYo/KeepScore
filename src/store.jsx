import {applyMiddleware, createStore} from 'redux'
import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import {composeWithDevTools} from 'redux-devtools-extension'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

import reducers from './reducers'
import history from './history'
import './translations'

const middleware = routerMiddleware(history)
const composeEnhancers = composeWithDevTools({})
const persistConfig = {
    key: 'keepscore',
    storage: storage,
    whitelist: [
        'game',
        'autocomplete',
    ]
}
const store = createStore(
    persistCombineReducers(persistConfig, {
        ...reducers,
        router: connectRouter(history)
    }),
    composeEnhancers(
        applyMiddleware(middleware, thunk)
    )
)
export default store