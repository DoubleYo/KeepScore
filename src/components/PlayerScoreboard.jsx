import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Badge, Button, Paper, Typography} from '@material-ui/core'
import {playerHistoryAdd} from '../reducers/game/actions'
import PlayerScoreboardHistory from './PlayerScoreboardHistory'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        display: 'flex',
    },
    content: {
        flex: 1
    },
    name: {
        textAlign: 'center',
    },
    scoreContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    score: {
        flex: 1,
        textAlign: 'center'
    },
})

class PlayerScoreboard extends Component {

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
        const {classes, player} = this.props
        const {delta} = this.state

        let score = 0
        player.history.forEach(history => {
            score += history.value
        })
        score += delta

        if (delta !== 0) {
            const badgeColor = (delta > 0) ? 'primary' : 'error'
            return (
                <Badge color={badgeColor} badgeContent={delta} className={classes.score}>
                    {this.renderScore(score)}
                </Badge>
            )
        }

        return this.renderScore(score)
    }

    renderScore(score) {
        const {classes} = this.props
        return (
            <Typography variant="h2" className={classes.score}>
                {score}
            </Typography>
        )
    }

    render() {
        const {classes, player} = this.props
        const historyKey = [player.hash, player.history.length].join('-')

        return (
            <Paper key={player.hash} className={classes.paper}>
                <div className={classes.content}>
                    <div className={classes.name}>
                        <Typography>{player.name}</Typography>
                    </div>
                    <div className={classes.scoreContainer}>
                        <Button variant="contained"
                                onClick={this.changeScore.bind(this, -1, 1)}>-</Button>
                        {this.renderScoreAndBadge()}
                        <Button variant="contained"
                                onClick={this.changeScore.bind(this, +1, 1)}>+</Button>
                    </div>
                </div>
                <PlayerScoreboardHistory key={historyKey} player={player}/>
            </Paper>
        )
    }
}

PlayerScoreboard.propTypes = {
    classes: PropTypes.object,
    player: PropTypes.object.isRequired,
    playerHistoryAdd: PropTypes.func,
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        playerHistoryAdd: (delta) => dispatch(playerHistoryAdd(ownProps.player, delta)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PlayerScoreboard)