import mainReducer from './main/reducer'
import gameReducer from './game/reducer'
import appBarActionReducer from './appBarAction/reducer'

const reducers = {
    main: mainReducer,
    game: gameReducer,
    appBarAction: appBarActionReducer,
}

export default reducers
