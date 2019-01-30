import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Badge, Button, Paper, Typography} from '@material-ui/core'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
    },
    content: {
        flex: 1
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

class PlayerScoreboard extends React.PureComponent {

    constructor() {
        super()

        this.state =  {
            delta: 0,
        }

        this.saveTimeout = 2000
        this.saveTimeoutId = null
        this.saveDelta = this.saveDelta.bind(this)
    }

    changeScore(multiplier, value) {
        let {delta} = this.state
        delta += multiplier * value

        if (this.saveTimeoutId !== null) {
            window.clearTimeout(this.saveTimeoutId)
        }
        this.saveTimeoutId = window.setTimeout(this.saveDelta, this.saveTimeout)
        this.setState({delta})
    }

    saveDelta() {
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

    renderHistory() {
        const {classes} = this.props
        return (
            <div className={classes.history}>

            </div>
        )
    }


    render() {
        const {classes} = this.props
        const {player} = this.props

        return (
            <Paper key={player.hash} className={classes.paper}>
                <div>
                    <Typography>{player.name}</Typography>
                </div>
                <div className={classes.contentScore}>
                    <Button variant="contained" onClick={this.changeScore.bind(this, -1, 1)}>-</Button>
                    {this.renderScoreAndBadge()}
                    <Button variant="contained" onClick={this.changeScore.bind(this, +1, 1)}>+</Button>
                </div>
                {this.renderHistory()}
            </Paper>
        )
    }
}

PlayerScoreboard.propTypes = {
    classes: PropTypes.object,
    player: PropTypes.object,
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
)(PlayerScoreboard)