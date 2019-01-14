import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
})

class PageGameHistory extends React.PureComponent {
    render() {
        return (
            <div className={this.props.classes.root}>
                {this.renderNewGameButton()}

                <List>
                    {this.renderGameHistory()}
                </List>
            </div>
        )
    }

    renderNewGameButton() {
        return (
            <Button variant="contained">New game</Button>
        )
    }

    renderGameHistory() {
        return null
        return this.props.gameHistory.map(game => {
            return this.renderGame(game)
        })
    }

    renderGame(game) {
        return (
            <ListItem key={object.shape + object.color}>
                <ListItemText primary={object.shape} secondary={object.color}/>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.removeObject.bind(this, object)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
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