import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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

    renderAppBarActionTop() {
        const {appBarActionTop} = this.props
        return appBarActionTop.entrySeq().map(([key, value]) => {
            return (
                <Fragment key={key}>
                    {value}
                </Fragment>
            )
        })
    }

    renderAppBarActionMore() {
        const {appBarActionMore} = this.props

        if (appBarActionMore.size === 0) {
            return null
        }

        return (
            <div>
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

                </Menu>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderAppBarActionTop()}
                {this.renderAppBarActionMore()}
            </div>
        )
    }
}

MainMoreMenu.propTypes = {
    history: PropTypes.object,
    pathname: PropTypes.string,
    objectsCount: PropTypes.number,
    appBarActionTop: PropTypes.object,
    appBarActionMore: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
        appBarActionTop: state.appBarAction.top,
        appBarActionMore: state.appBarAction.more,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(MainMoreMenu)