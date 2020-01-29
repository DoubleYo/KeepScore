import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import {
    APP_BAR_ACTION_POSITION_MAIN,
    APP_BAR_ACTION_POSITION_MORE
} from '../reducers/appBarAction/constants'

const styles = theme => ({})

class MainMoreMenu extends React.PureComponent {

    constructor() {
        super()

        this.state = {
            moreMenuAnchor: null,
        }
    }

    handleMoreMenuButtonClick(event) {
        this.setState({moreMenuAnchor: event.currentTarget})
    }

    handleCloseMoreMenu() {
        this.setState({moreMenuAnchor: null})
    }

    renderAppBarActionMain() {
        const {appBarActionMain} = this.props
        return appBarActionMain.entrySeq().map(([key, element]) => {
            const {value} = element
            return <Fragment key={key}>{value}</Fragment>
        })
    }

    renderAppBarActionMore() {
        const {appBarActionMore} = this.props

        if (appBarActionMore.size === 0) {
            return null
        }

        return (
            <Fragment>
                <IconButton color="inherit"
                            aria-owns={this.state.moreMenuAnchor ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleMoreMenuButtonClick.bind(this)}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.moreMenuAnchor}
                    open={Boolean(this.state.moreMenuAnchor)}
                    onClose={this.handleCloseMoreMenu.bind(this)}>
                    {appBarActionMore.entrySeq().map(([key, element]) => {
                        const {value} = element
                        return <Fragment key={key}>{value}</Fragment>
                    })}
                </Menu>
            </Fragment>
        )
    }

    render() {
        return (
            <div>
                {this.renderAppBarActionMain()}
                {this.renderAppBarActionMore()}
            </div>
        )
    }
}

MainMoreMenu.propTypes = {
    history: PropTypes.object,
    pathname: PropTypes.string,
    objectsCount: PropTypes.number,
    appBarActionMain: PropTypes.object,
    appBarActionMore: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
        appBarActionMain: state.appBarAction[APP_BAR_ACTION_POSITION_MAIN],
        appBarActionMore: state.appBarAction[APP_BAR_ACTION_POSITION_MORE],
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(MainMoreMenu)