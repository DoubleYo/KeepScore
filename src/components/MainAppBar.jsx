import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {HISTORY_BACK, PAGE_TITLES, PREVIOUS_PAGE} from '../reducers/routing'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import MainMoreMenu from './MainMoreMenu'
import {toggleDrawer} from '../reducers/main/actions'

import history from '../history'

const styles = theme => ({
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
})

class MainAppBar extends React.PureComponent {

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    {this.renderMenuIcon()}
                    <Typography variant="h6" color="inherit"
                                className={this.props.classes.flex}>
                        {PAGE_TITLES[this.props.pathname]}
                    </Typography>

                    <MainMoreMenu/>
                </Toolbar>
            </AppBar>
        )
    }

    renderMenuIcon() {
        const previousPage = PREVIOUS_PAGE[this.props.pathname]
        if (null === previousPage) {
            return (
                <IconButton color="inherit" aria-label="Menu"
                            className={this.props.classes.menuButton}
                            onClick={this.props.openDrawer.bind(this)}>
                    <MenuIcon/>
                </IconButton>
            )
        }

        return (
            <IconButton color="inherit" aria-label="Back"
                        className={this.props.classes.menuButton}
                        onClick={this.onArrowBackClick.bind(this, previousPage)}>
                <ArrowBackIcon/>
            </IconButton>
        )
    }

    onArrowBackClick(previousPage) {
        if (previousPage === HISTORY_BACK) {
            history.goBack()
        } else {
            history.push(previousPage)
        }
    }
}

MainAppBar.propTypes = {
    classes: PropTypes.object,
    pathname: PropTypes.string,
    objectsCount: PropTypes.number,
    openDrawer: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: () => dispatch(toggleDrawer(true)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(MainAppBar)