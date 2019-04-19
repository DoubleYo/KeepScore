import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {PAGE_ROOT} from '../reducers/routing'

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

    render() {
        const menu = []

        if (PAGE_ROOT === this.props.pathname) {
            menu.push({
                lib: 'TEST',
                onClick: () => {console.log('TEST')},
            })
        }

        if (0 === menu.length) {
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

                    {menu.map((item) => {
                        return (
                            <MenuItem key={item.lib} onClick={item.onClick}>{item.lib}</MenuItem>
                        )
                    })}
                </Menu>
            </div>

        )
    }
}

MainMoreMenu.propTypes = {
    history: PropTypes.object,
    pathname: PropTypes.string,
    objectsCount: PropTypes.number,
}

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
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