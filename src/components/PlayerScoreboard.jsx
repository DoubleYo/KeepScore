import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {
    Badge,
    Button,
    Dialog,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@material-ui/core'
import {playerHistoryAdd, playerHistoryRemove} from '../reducers/game/actions'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        display: 'flex',
    },
    content: {
        flex: 1
    },
    contentName: {
        textAlign: 'center',
    },
    contentScore: {
        display: 'flex',
        alignItems: 'center',
    },
    history: {
        margin: theme.spacing.unit,
        flexBasis: '40px',
        borderLeft: `solid thin ${theme.palette.divider}`
    },
})

class PlayerScoreboard extends React.Component {

    constructor() {
        super()

        this.state = {
            delta: 0,
            open: false,
        }

        this.saveTimeout = 2000
        this.saveTimeoutId = null
        this.saveDelta = this.saveDelta.bind(this)
    }

    changeScore(multiplier, value) {
        if (this.saveTimeoutId !== null) {
            window.clearTimeout(this.saveTimeoutId)
        }
        this.saveTimeoutId = window.setTimeout(this.saveDelta, this.saveTimeout)

        this.setState((state) => {
            return {delta: state.delta + multiplier * value}
        })
    }

    saveDelta() {
        const {playerHistoryAdd} = this.props
        const {delta} = this.state

        playerHistoryAdd(delta)
        this.setState({delta: 0})
    }

    renderScoreAndBadge() {
        const {player} = this.props
        const {delta} = this.state

        let score = 0
        player.history.forEach(history => {
            score += history.value
        })
        score += delta

        if (delta !== 0) {
            const badgeColor = (delta > 0) ? 'primary' : 'error'
            return (
                <Badge color={badgeColor} badgeContent={delta}>
                    {this.renderScore(score)}
                </Badge>
            )
        }

        return this.renderScore(score)
    }

    renderScore(score) {
        return <Typography variant="h2">{score}</Typography>
    }

    openDialog() {
        this.setState({open: true})
    }

    closeDialog() {
        const state = {open: false}
        console.log('closeDialog', state)
        this.setState(state)
    }

    historyAddZero() {
        const {playerHistoryAdd} = this.props
        playerHistoryAdd(0)
        this.closeDialog()
    }

    historyRemoveLast() {
        const {playerHistoryRemove} = this.props
        playerHistoryRemove(-1)
        this.closeDialog()
    }

    renderHistory() {
        const {classes, player} = this.props
        const {open} = this.state
        const history = [...player.history].reverse()

        return (
            <div className={classes.history} onClick={this.openDialog.bind(this)}>
                {history.map((history) => {
                    return (
                        <div key={history.created}>{history.value}</div>
                    )
                })}

                <Dialog onClose={this.closeDialog.bind(this)} open={open}>
                    <List>
                        <ListItem button onClick={this.historyAddZero.bind(this)}>
                            <ListItemText primary="Add zero"/>
                        </ListItem>
                        <ListItem button onClick={this.historyRemoveLast.bind(this)}>
                            <ListItemText primary="Remove last entry"/>
                        </ListItem>
                    </List>
                </Dialog>

            </div>
        )
    }

    render() {
        console.log('PlayerScoreboard render')
        const {classes, player} = this.props

        return (
            <Paper key={player.hash} className={classes.paper}>
                <div className={classes.content}>
                    <div className={classes.contentName}>
                        <Typography>{player.name}</Typography>
                    </div>
                    <div className={classes.contentScore}>
                        <Button variant="contained"
                                onClick={this.changeScore.bind(this, -1, 1)}>-</Button>
                        {this.renderScoreAndBadge()}
                        <Button variant="contained"
                                onClick={this.changeScore.bind(this, +1, 1)}>+</Button>
                    </div>
                </div>
                {this.renderHistory()}
            </Paper>
        )
    }
}

PlayerScoreboard.propTypes = {
    classes: PropTypes.object,
    player: PropTypes.object.isRequired,
    playerHistoryAdd: PropTypes.func,
    playerHistoryRemove: PropTypes.func,
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        playerHistoryAdd: (delta) => dispatch(playerHistoryAdd(ownProps.player, delta)),
        playerHistoryRemove: (index) => dispatch(playerHistoryRemove(ownProps.player, index)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PlayerScoreboard)