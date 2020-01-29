import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Grid} from '@material-ui/core'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
})

class PageCharts extends Component {

    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root} spacing={1}>
                Charts
            </Grid>
        )
    }
}

PageCharts.propTypes = {
    classes: PropTypes.object,
    players: PropTypes.array,
}

function mapStateToProps(state) {
    return {
        players: state.game.scoreboard.players,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(PageCharts)