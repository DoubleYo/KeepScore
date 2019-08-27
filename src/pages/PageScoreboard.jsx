import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

import PlayerScoreboard from '../components/PlayerScoreboard/PlayerScoreboard'
import {getPlayerKey} from '../utils/player'
import {addTopElement} from '../reducers/appBarAction/actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
})

class PageScoreboard extends Component {
    componentDidMount() {
        const home = (
            <IconButton color="inherit" onClick={() => {
                console.log('TOTO ' + this.props.players.length)
            }} >
                <HomeIcon />
            </IconButton>
        )
        this.props.addTopElement('test', home)
    }

    renderPlayersScore() {
        const {classes, players} = this.props

        return players.map(player => {
            return (
                <Grid item xs={6} key={getPlayerKey(player)}>
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
    addTopElement: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        players: state.game.scoreboard.players,
        updated: state.game.scoreboard.updated,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTopElement: (key, value) => dispatch(addTopElement(key, value)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PageScoreboard)