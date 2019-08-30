import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import {withTranslation} from 'react-i18next'
import {Grid, Button, Paper, Typography, Chip} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import {playerHistoryAdd} from '../../reducers/game/actions'
import PlayerScoreboardHistory from './PlayerScoreboardHistory'
import ScoreInputDialog from './ScoreInputDialog'
import {getPlayerKey} from '../../utils/player'
import LongPress from '../LongPress/LongPress'
import {addSign} from '../../utils/strings'

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
})

class PlayerScoreboard extends Component {

    constructor() {
        super()

        this.state = {
            delta: 0,
            nagativeModalOpen: false,
            positiveModalOpen: false,
        }

        this.saveTimeout = 10000
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

    renderScore() {
        const {player} = this.props
        const {delta} = this.state

        let score = 0
        player.history.forEach(history => {
            score += history.value
        })
        score += delta

        return (
            <Typography variant="h2" align="center">
                {score}
            </Typography>
        )
    }

    renderChip() {
        const {classes} = this.props
        const {delta} = this.state

        if (delta === 0) {
            return null
        }

        const color = (delta > 0) ? 'primary' : 'secondary'

        return (
            <Chip
                label={addSign(delta)}
                color={color}
                onDelete={this.saveDelta}
                className={classes.chip}
                deleteIcon={<DoneIcon />}
            />
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
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={1}>
                            <LongPress onPress={this.handleButtonPress.bind(this, -1)}
                                       onLongPress={this.handleButtonLongPress.bind(this, -1)}>
                                <Button variant="contained">
                                    <RemoveIcon/>
                                </Button>
                            </LongPress>
                            <ScoreInputDialog open={nagativeModalOpen}
                                              title={t('scoreboard.dialog.title.subtract')}
                                              onClose={this.handleDialogClose.bind(this, -1)}/>
                        </Grid>
                        <Grid item xs={3} />
                        <Grid item xs={4}>
                            {this.renderScore()}
                        </Grid>
                        <Grid item xs={3}>
                            {this.renderChip()}
                        </Grid>
                        <Grid item xs={1}>
                            <LongPress onPress={this.handleButtonPress.bind(this, +1)}
                                       onLongPress={this.handleButtonLongPress.bind(this, +1)}>
                                <Button variant="contained">
                                    <AddIcon/>
                                </Button>
                            </LongPress>
                            <ScoreInputDialog open={positiveModalOpen}
                                              title={t('scoreboard.dialog.title.add')}
                                              onClose={this.handleDialogClose.bind(this, +1)}/>
                        </Grid>
                    </Grid>
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