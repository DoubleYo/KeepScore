import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {
    HISTORY_BACK, PAGE_CHARTS,
    PAGE_PLAYERS_COUNT,
    PAGE_PLAYERS_NAME,
    PAGE_ROOT,
    PAGE_SCOREBOARD,
    PAGE_SETTINGS,
    PREVIOUS_PAGE
} from '../reducers/routing'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import MainMoreMenu from './MainMoreMenu'
import {toggleDrawer} from '../reducers/main/actions'

import history from '../history'
import {withTranslation} from 'react-i18next'

const styles = theme => ({
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
})

class MainAppBar extends PureComponent {


    handleArrowBackClick(previousPage) {
        if (previousPage === HISTORY_BACK) {
            history.goBack()
        } else {
            history.push(previousPage)
        }
    }

    renderMenuIcon() {
        const {classes, pathname, openDrawer} = this.props
        const previousPage = PREVIOUS_PAGE[pathname]
        if (null === previousPage) {
            return (
                <IconButton color="inherit" aria-label="Menu"
                            className={classes.menuButton}
                            onClick={openDrawer.bind(this)}>
                    <MenuIcon/>
                </IconButton>
            )
        }

        return (
            <IconButton color="inherit" aria-label="Back"
                        className={classes.menuButton}
                        onClick={this.handleArrowBackClick.bind(this, previousPage)}>
                <ArrowBackIcon/>
            </IconButton>
        )
    }

    renderPageTitle() {
        const {t, pathname} = this.props
        const pageTitles = {
            [PAGE_ROOT]: t('title.root'),
            [PAGE_SETTINGS]: t('title.settings'),
            [PAGE_PLAYERS_COUNT]: t('title.playersCount'),
            [PAGE_PLAYERS_NAME]: t('title.playersName'),
            [PAGE_SCOREBOARD]: t('title.scoreboard'),
            [PAGE_CHARTS]: t('title.charts'),
        }
        if (pageTitles.hasOwnProperty(pathname)) {
            return pageTitles[pathname]
        }
        return pageTitles[PAGE_ROOT]
    }

    render() {
        const {classes} = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    {this.renderMenuIcon()}
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                        {this.renderPageTitle()}
                    </Typography>
                    <MainMoreMenu/>
                </Toolbar>
            </AppBar>
        )
    }
}

MainAppBar.propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
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
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(MainAppBar)