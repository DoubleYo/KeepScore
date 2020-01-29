import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Route, Switch} from 'react-router'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
    PAGE_CHARTS,
    PAGE_PLAYERS_COUNT, PAGE_PLAYERS_NAME,
    PAGE_ROOT, PAGE_SCOREBOARD, PAGE_SETTINGS
} from '../reducers/routing'

import '../styles/main.styl'

import MainDrawer from '../components/MainDrawer'
import MainAppBar from '../components/MainAppBar'

import PageGameHistory from './PageGameHistory'
import PageSettings from './PageSettings'
import PagePlayersCount from './PagePlayersCount'
import PagePlayersName from './PagePlayersName'
import PageScoreboard from './PageScoreboard'
import PageCharts from './PageCharts'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

class Main extends React.PureComponent {

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <CssBaseline/>

                <MainAppBar/>

                <MainDrawer/>

                <Switch>
                    <Route exact path={PAGE_ROOT} component={PageGameHistory}/>
                    <Route exact path={PAGE_SETTINGS} component={PageSettings}/>
                    <Route exact path={PAGE_PLAYERS_COUNT} component={PagePlayersCount}/>
                    <Route exact path={PAGE_PLAYERS_NAME} component={PagePlayersName}/>
                    <Route exact path={PAGE_SCOREBOARD} component={PageScoreboard}/>
                    <Route exact path={PAGE_CHARTS} component={PageCharts}/>
                </Switch>
            </div>
        )
    }

}

Main.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string,
    ]),
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Main)