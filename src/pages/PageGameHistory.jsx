import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Avatar, Button, List, ListItem, ListItemText} from '@material-ui/core'

import {PAGE_PLAYERS_COUNT} from '../reducers/routing'
import {gameHistoryLoad} from '../reducers/game/actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        margin: `${theme.spacing.unit * 2}px auto`
    },
})

class PageGameHistory extends React.PureComponent {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                {this.renderNewGameButton()}

                <List>
                    {this.renderGameHistory()}
                </List>
            </div>
        )
    }

    renderNewGameButton() {
        const {classes} = this.props
        return (
            <Button variant="contained" className={classes.button}
                    component={Link} to={PAGE_PLAYERS_COUNT}>
                New game
            </Button>
        )
    }

    renderGameHistory() {
        return this.props.history.map(game => {
            return this.renderGame(game)
        })
    }

    renderGame(game) {
        const {gameHistoryLoad} = this.props
        return (
            <ListItem key={game.hash} onClick={gameHistoryLoad.bind(this, game.hash)}>
                <Avatar>{game.players.length}</Avatar>
                <ListItemText primary={game.players.map((player) => player.name).join(', ')} />
            </ListItem>
        )
    }
}

PageGameHistory.propTypes = {
    classes: PropTypes.object,
    history: PropTypes.array,
    gameHistoryLoad: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        history: state.game.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gameHistoryLoad: (hash) => dispatch(gameHistoryLoad(hash)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PageGameHistory)