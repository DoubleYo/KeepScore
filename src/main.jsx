import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'
import {ConnectedRouter} from 'connected-react-router'

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

import './translations'

import history from './history'
import store from './store'
import Main from './pages/Main'

const persistor = persistStore(store)

const theme = createMuiTheme({
    palette: {},
    props: {
        MuiWithWidth: {
            initialWidth: 'lg',
        },
    },
    typography: {},
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={'Loading...'} persistor={persistor}>
            <ConnectedRouter store={store} history={history}>
                <MuiThemeProvider theme={theme}>
                    <Main/>
                </MuiThemeProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('main')
)