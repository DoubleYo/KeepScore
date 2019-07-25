import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import {withTranslation} from 'react-i18next'
import {Badge, Button, Paper, Typography} from '@material-ui/core'

import {playerHistoryAdd} from '../../reducers/game/actions'
import PlayerScoreboardHistory from './PlayerScoreboardHistory'
import ScoreInputDialog from './ScoreInputDialog'
import {getPlayerKey} from '../../utils/player'
import LongPress from '../LongPress/LongPress'

const styles = theme => ({
    paper: {
        padding: theme.spacing(),
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
            nagativeModalOpen: false,
            positiveModalOpen: false,
        }

        this.saveTimeout = 2000
        this.saveTimeoutId = null
        this.saveDelta = this.saveDelta.bind(this)
    }

    componentWillUnmount() {
        if(this.clearTimeout()) {
            this.saveDelta()
        }
    }

    changeScore(multiplier, value) {
        this.clearTimeout()
        this.saveTimeoutId = window.setTimeout(this.saveDelta, this.saveTimeout)
        this.setState((state) => {
            return {delta: state.delta + multiplier * value}
        })
    }

    saveDelta() {
        const {playerHistoryAdd} = this.props
        const {delta} = this.state
        if (delta !== 0) {
            this.clearTimeout()
            this.setState({delta: 0})
            playerHistoryAdd(delta)
        }
    }

    clearTimeout() {
        if (this.saveTimeoutId !== null) {
            window.clearTimeout(this.saveTimeoutId)
            this.saveTimeoutId = null
            return true
        }
        return false
    }

    handleButtonPress(multiplier, event, enough) {
        if (!enough) {
            this.changeScore(multiplier, 1)
        }
    }

    handleButtonLongPress(multiplier, event) {
        const newState = (multiplier > 0) ? {positiveModalOpen: true} : {nagativeModalOpen: true}
        this.setState(newState)
    }

    handleDialogClose(multiplier, delta) {
        this.changeScore(multiplier, delta)
        const newState = (multiplier > 0) ? {positiveModalOpen: false} : {nagativeModalOpen: false}
        this.setState(newState)
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
        const {classes, t, player} = this.props
        const {nagativeModalOpen, positiveModalOpen} = this.state

        return (
            <Paper className={classes.paper}>
                <div className={classes.content}>
                    <div className={classes.name}>
                        <Typography>{player.name}</Typography>
                    </div>
                    <div className={classes.scoreContainer}>

                        <LongPress onPress={this.handleButtonPress.bind(this, -1)}
                                   onLongPress={this.handleButtonLongPress.bind(this, -1)}>
                            <Button variant="contained">-</Button>
                        </LongPress>
                        <ScoreInputDialog open={nagativeModalOpen}
                                          title={t('scoreboard.dialog.title.subtract')}
                                          onClose={this.handleDialogClose.bind(this, -1)}/>

                        {this.renderScoreAndBadge()}

                        <LongPress onPress={this.handleButtonPress.bind(this, +1)}
                                   onLongPress={this.handleButtonLongPress.bind(this, +1)}>
                            <Button variant="contained">+</Button>
                        </LongPress>
                        <ScoreInputDialog open={positiveModalOpen}
                                          title={t('scoreboard.dialog.title.add')}
                                          onClose={this.handleDialogClose.bind(this, +1)}/>
                    </div>
                </div>
                <PlayerScoreboardHistory key={getPlayerKey(player)} player={player}/>
            </Paper>
        )
    }
}

PlayerScoreboard.propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
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
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(PlayerScoreboard)