import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {playerHistoryAdd, playerHistoryRemove} from '../reducers/game/actions'
import {Dialog, List, ListItem, ListItemText} from '@material-ui/core'

const styles = theme => ({
    history: {
        margin: theme.spacing.unit,
        flexBasis: '40px',
        borderLeft: `solid thin ${theme.palette.divider}`
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

class PlayerScoreboardHistory extends Component {

    constructor() {
        super()

        this.state = {
            open: false,
        }
    }

    openDialog() {
        this.setState({open: true})
    }

    closeDialog() {
        this.setState({open: false})
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

    render() {
        const {classes, player} = this.props
        const {open} = this.state

        const history = [...player.history].reverse()

        return (
            <Fragment>
                <div className={classes.history} onClick={this.openDialog.bind(this)}>
                    {history.map((history) => {
                        return (
                            <div key={history.created}>{history.value}</div>
                        )
                    })}
                </div>

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
            </Fragment>
        )
    }
}

PlayerScoreboardHistory.propTypes = {
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
)(PlayerScoreboardHistory)