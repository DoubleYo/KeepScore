import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles/index'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from '@material-ui/core'

const styles = theme => ({
    button: {
        margin: theme.spacing(0, 1)
    },
})

class ScoreInputDialog extends PureComponent {

    constructor() {
        super()

        this.state = {
            delta: 0,
        }
    }

    onInputChange(event) {
        this.setState({delta: event.target.value})
    }

    changeScore(multiplier, value) {
        this.setState((state) => {
            return {delta: state.delta + multiplier * value}
        })
    }

    onCancelClick() {
        this.setState({delta: 0})
        this.onClose()
    }

    onClose() {
        const {onClose} = this.props
        const {delta} = this.state

        onClose(delta)
    }

    render() {
        const {classes, open, title} = this.props
        const {delta} = this.state

        return (
            <Dialog open={open} onClose={this.onClose.bind(this)}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Input type="text" value={delta} className={classes.button}
                           onChange={this.onInputChange.bind(this)}/>
                    <Button variant="contained" className={classes.button}
                            onClick={this.changeScore.bind(this, -1, 1)}>
                        -1
                    </Button>
                    <Button variant="contained" className={classes.button}
                            onClick={this.changeScore.bind(this, 1, 1)}>
                        +1
                    </Button>
                    <Button variant="contained" className={classes.button}
                            onClick={this.changeScore.bind(this, 1, 5)}>
                        +5
                    </Button>
                    <Button variant="contained" className={classes.button}
                            onClick={this.changeScore.bind(this, 1, 10)}>
                        +10
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={this.onClose.bind(this)} color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

ScoreInputDialog.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
}

export default compose(
    withStyles(styles),
)(ScoreInputDialog)