import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Grid, IconButton} from '@material-ui/core'

import PlayerScoreboard from '../components/PlayerScoreboard/PlayerScoreboard'
import {getPlayerKey} from '../utils/player'
import {setAppBarActionMain} from '../reducers/appBarAction/actions'
import TimelineIcon from '@material-ui/icons/Timeline'
import {PAGE_CHARTS} from '../reducers/routing'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
})

class PageScoreboard extends Component {

    componentDidMount() {
        const {setAppBarActionMain} = this.props
        const ChartButton = (
            <IconButton color="inherit" component={Link} to={PAGE_CHARTS}>
                <TimelineIcon/>
            </IconButton>
        )
        setAppBarActionMain('goto-charts', {value: ChartButton})
    }

    renderPlayersScore() {
        const {players} = this.props

        return players.map(player => {
            return (
                <Grid item md={6} xs={12} key={getPlayerKey(player)}>
                    <PlayerScoreboard player={player}/>
                </Grid>
            )
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root} spacing={1}>
                {this.renderPlayersScore()}
            </Grid>
        )
    }
}

PageScoreboard.propTypes = {
    classes: PropTypes.object,
    players: PropTypes.array,
    updated: PropTypes.number,
    setAppBarActionMain: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        players: state.game.scoreboard.players,
        updated: state.game.scoreboard.updated,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAppBarActionMain: (key, element) => dispatch(setAppBarActionMain(key, element)),
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(PageScoreboard)