import mainReducer from './main/reducer'
import gameReducer from './game/reducer'
import appBarActionReducer from './appBarAction/reducer'
import autocompleteReducer from './autocomplete/reducer'

const reducers = {
    main: mainReducer,
    game: gameReducer,
    autocomplete: autocompleteReducer,
    appBarAction: appBarActionReducer,
}

export default reducers
