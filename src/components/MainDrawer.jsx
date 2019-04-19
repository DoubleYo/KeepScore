import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {toggleDrawer} from '../reducers/main/actions'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import {PAGE_SETTINGS} from '../reducers/routing'
import Drawer from '@material-ui/core/Drawer'

import history from '../history'

const styles = theme => ({})

class MainDrawer extends React.PureComponent {

    handleDrawerItemClick(path) {
        this.props.closeDrawer()
        history.push(path)
    }

    renderDrawerList() {
        return (
            <List>
                <ListItem button onClick={this.handleDrawerItemClick.bind(this, PAGE_SETTINGS)}>
                    <ListItemIcon>
                        <AccessAlarmIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Réglages"/>
                </ListItem>
            </List>
        )
    }

    render() {
        return (
            <Drawer open={this.props.drawer} onClose={this.props.closeDrawer.bind(this)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.props.closeDrawer.bind(this)}
                    onKeyDown={this.props.closeDrawer.bind(this)}
                >
                </div>
                <div>
                    {this.renderDrawerList()}
                </div>
            </Drawer>
        )
    }
}

MainDrawer.propTypes = {
    drawer: PropTypes.bool,
    closeDrawer: PropTypes.func,
    restartGame: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        drawer: state.main.drawer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeDrawer: () => dispatch(toggleDrawer(false)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(MainDrawer)