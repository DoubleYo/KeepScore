import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import range from 'lodash/range'

import {setPlayersCount} from '../reducers/game/actions'
import {FilledInput, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: `${theme.spacing()}px auto`,
    },
    grid: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: (64 + theme.spacing(2)) * 3,
    },
    button: {
        width: 64,
        height: 64,
        padding: theme.spacing(),
        margin: theme.spacing(),
    },
    formControl: {
        minWidth: 120,
        marginTop: theme.spacing(2),
    },
})

class PagePlayersCount extends React.PureComponent {


    handleClick(count) {
        this.props.setPlayersCount(count)
    }

    handleChange(event) {
        this.props.setPlayersCount(event.target.value)
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.grid}>
                    {range(2, 11).map(count => {
                        return (
                            <Button key={count} variant="contained"
                                    onClick={this.handleClick.bind(this, count)}
                                    className={classes.button}>{count}</Button>
                        )
                    })}
                </div>

                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel>Plus</InputLabel>
                    <Select
                        value=""
                        onChange={this.handleChange.bind(this)}
                        input={<FilledInput/>}
                    >
                        <MenuItem value="" disabled>
                            <em>Plus</em>
                        </MenuItem>
                        {range(11, 31).map(count => {
                            return (
                                <MenuItem key={count} value={count}>{count}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

PagePlayersCount.propTypes = {
    classes: PropTypes.object,
    setPlayersCount: PropTypes.func,
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setPlayersCount: (count) => dispatch(setPlayersCount(count)),
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(PagePlayersCount)