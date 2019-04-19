import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import ClickNHold from 'react-click-n-hold'

import {Trans, withTranslation} from 'react-i18next'
import {Avatar, Button, Dialog, List, ListItem, ListItemText} from '@material-ui/core'

import {PAGE_PLAYERS_COUNT} from '../reducers/routing'
import {gameHistoryLoad, gameHistoryRemove} from '../reducers/game/actions'

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
    constructor() {
        super()

        this.state = {
            open: false,
        }
    }

    handleItemPress(hash, event, enough) {
        if (!enough) {
            this.props.gameHistoryLoad(hash)
        }
    }

    handleItemLongPress(hash) {
        this.setState({open: hash})
    }

    handleDialogClose() {
        this.setState({open: false})
    }

    handleHistoryRemove() {
        this.props.gameHistoryRemove(this.state.open)
        this.handleDialogClose()
    }

    renderGameHistory() {
        return this.props.history.map(game => {
            return this.renderGame(game)
        })
    }

    renderGame(game) {
        return (
            <ClickNHold key={game.hash} time={1}
                        onEnd={this.handleItemPress.bind(this, game.hash)}
                        onClickNHold={this.handleItemLongPress.bind(this, game.hash)}>

                <ListItem>
                    <Avatar>{game.players.length}</Avatar>
                    <ListItemText primary={game.players.map((player) => player.name).join(', ')}/>
                </ListItem>
            </ClickNHold>

        )
    }

    render() {
        const {classes, t} = this.props
        const {open} = this.state
        return (
            <div className={classes.root}>
                <Button variant="contained" className={classes.button}
                        component={Link} to={PAGE_PLAYERS_COUNT}>
                    <Trans i18nKey={'game.action.newGame'}/>
                </Button>

                <List>
                    {this.renderGameHistory()}
                </List>

                <Dialog open={(open !== false)} onClose={this.handleDialogClose.bind(this)}>
                    <List>
                        <ListItem button onClick={this.handleHistoryRemove.bind(this)}>
                            <ListItemText primary={t('history.action.remove')}/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }

}

PageGameHistory.propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
    history: PropTypes.array,
    gameHistoryLoad: PropTypes.func,
    gameHistoryRemove: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        history: state.game.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gameHistoryLoad: (hash) => dispatch(gameHistoryLoad(hash)),
        gameHistoryRemove: (hash) => dispatch(gameHistoryRemove(hash)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(PageGameHistory)