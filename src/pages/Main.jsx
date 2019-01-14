import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Route, Switch} from 'react-router'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
    PAGE_ROOT
} from '../reducers/routing'

import MainDrawer from '../components/MainDrawer'
import MainAppBar from '../components/MainAppBar'

import PageGameHistory from './PageGameHistory'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

class Main extends React.PureComponent {

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <CssBaseline/>

                <MainAppBar/>

                <MainDrawer/>

                <Switch>
                    <Route exact path={PAGE_ROOT} component={PageGameHistory}/>
                </Switch>
            </div>
        )
    }

}

Main.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string,
    ]),
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
)(Main)