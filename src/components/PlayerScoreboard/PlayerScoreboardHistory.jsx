import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import {withTranslation} from 'react-i18next'
import {playerHistoryAdd, playerHistoryRemove} from '../../reducers/game/actions'
import {Dialog, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import {addSign} from '../../utils/strings'

const styles = theme => ({
    history: {
        margin: theme.spacing(),
        flexBasis: '40px',
        borderLeft: `solid thin ${theme.palette.divider}`,
        maxHeight: '200px',
        overflow: 'hidden',
    },
})

class PlayerScoreboardHistory extends Component {

    constructor() {
        super()

        this.state = {
            open: false,
        }
    }

    handleOpenDialog() {
        this.setState({open: true})
    }

    handleCloseDialog() {
        this.setState({open: false})
    }

    handleHistoryAddZero() {
        const {playerHistoryAdd} = this.props
        playerHistoryAdd(0)
        this.handleCloseDialog()
    }

    handleHistoryRemoveLast() {
        const {playerHistoryRemove} = this.props
        playerHistoryRemove(-1)
        this.handleCloseDialog()
    }

    render() {
        const {classes, t, player} = this.props
        const {open} = this.state

        const history = [...player.history].reverse()

        return (
            <Fragment>
                <div className={classes.history} onClick={this.handleOpenDialog.bind(this)}>
                    {history.map((history) => {
                        let color = (history.value >= 0) ? 'primary' : 'error'
                        return (
                            <Typography key={history.created} align="right" color={color}>
                                {addSign(history.value)}
                            </Typography>
                        )
                    })}
                </div>

                <Dialog onClose={this.handleCloseDialog.bind(this)} open={open}>
                    <List>
                        <ListItem button onClick={this.handleHistoryAddZero.bind(this)}>
                            <ListItemText primary={t('scoreboard.history.action.addZero')}/>
                        </ListItem>
                        <ListItem button onClick={this.handleHistoryRemoveLast.bind(this)}>
                            <ListItemText primary={t('scoreboard.history.action.removeLast')}/>
                        </ListItem>
                    </List>
                </Dialog>
            </Fragment>
        )
    }
}

PlayerScoreboardHistory.propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
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
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(PlayerScoreboardHistory)