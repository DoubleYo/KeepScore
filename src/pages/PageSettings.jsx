import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

class PageSettings extends React.PureComponent {
    render() {
        return (
            <div className={this.props.classes.root}>
                Settings
            </div>
        )
    }
}

PageSettings.propTypes = {
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
)(PageSettings)