import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import {PAGE_PLAYERS_COUNT} from '../reducers/routing'

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
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
        return null
        return this.props.gameHistory.map(game => {
            return this.renderGame(game)
        })
    }

    renderGame(game) {
        return game.players.map((player) => player.name)
    }
}

PageGameHistory.propTypes = {
    classes: PropTypes.object,
    gameHistory: PropTypes.array,
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PageGameHistory)