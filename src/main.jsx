import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {persistCombineReducers, persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage'

import {composeWithDevTools} from 'redux-devtools-extension'
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import reducers from './reducers'
import history from './history'

const middleware = routerMiddleware(history)
const composeEnhancers = composeWithDevTools({})
const store = createStore(
    persistCombineReducers({key: 'keepscore', storage}, {
        ...reducers,
        router: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(middleware, thunk)
    )
)
const persistor = persistStore(store)

const theme = createMuiTheme({
    palette: {},
    props: {
        MuiWithWidth: {
            initialWidth: 'lg',
        },
    },
    typography: {
        useNextVariants: true,
    },
})

import Main from './pages/Main'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter store={store} history={history}>
                <MuiThemeProvider theme={theme}>
                    <Main/>
                </MuiThemeProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('main')
)