import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import PlayerScoreboard from '../components/PlayerScoreboard'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
})

class PageScoreboard extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate')
        return true
    }

    renderPlayersScore() {
        const {classes, players} = this.props

        return players.map(player => {
            return (
                <Grid item xs={6} key={player.hash}>
                    <PlayerScoreboard player={player}/>
                </Grid>
            )
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root} spacing={16}>
                {this.renderPlayersScore()}
            </Grid>
        )
    }
}

PageScoreboard.propTypes = {
    classes: PropTypes.object,
    players: PropTypes.array,
}

function mapStateToProps(state) {
    return {
        players: state.game.scoreboard.players
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PageScoreboard)