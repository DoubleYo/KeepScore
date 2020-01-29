import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Button, FormControl, Typography, TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import {Trans, withTranslation} from 'react-i18next'

import {setPlayersName} from '../reducers/game/actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        padding: theme.spacing()
    },
    button: {
        margin: `${theme.spacing(2)}px auto`
    },
})

class PagePlayersName extends React.PureComponent {

    constructor(props) {
        super(props)

        const players = props.players.map((player, index) => {
            const name = props.t('game.player.placeholder', {number: (index + 1)})
            return {...player, name, placeholder: name}
        })

        this.state = {players}
    }

    handleChange(event, value) {
        const {players} = this.state
        players.forEach((player, index) => {
            if (player.hash === event.target.name) {
                players[index].name = value
            }
        })
        this.setState({players: [...players]})
    }

    handleClick() {
        const {setPlayersName} = this.props
        const {players} = this.state

        players.forEach((player, index) => {
            delete players[index].placeholder
        })

        setPlayersName(players)
    }

    renderPlayersNameInputs() {
        const {classes, playersName} = this.props
        const {players} = this.state

        return players.map(player => {
            const renderInput = params => (
                <TextField {...params} margin="normal" fullWidth={true}
                           name={player.hash} placeholder={player.placeholder}
                />
            )

            return (
                <FormControl key={player.hash} fullWidth className={classes.formControl}>
                    <Autocomplete name={player.hash} options={playersName} freeSolo={true}
                                  disableOpenOnFocus={true}
                                  autoComplete={true} autoHighlight={true}
                                  onChange={this.handleChange.bind(this)}
                                  onInputChange={this.handleChange.bind(this)}
                                  renderInput={renderInput}/>
                </FormControl>
            )
        })
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Typography variant="h6" align="center">Noms des joueurs (optionnel)</Typography>
                {this.renderPlayersNameInputs()}
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={this.handleClick.bind(this)}>
                    <Trans i18nKey={'game.action.save'}/>
                </Button>
            </div>
        )
    }
}

PagePlayersName.propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
    players: PropTypes.array,
    playersName: PropTypes.array,
    setPlayersName: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        players: state.game.scoreboard.players,
        playersName: state.autocomplete.playersName,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPlayersName: (players) => dispatch(setPlayersName(players)),
    }
}

export default compose(
    withRouter,
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(PagePlayersName)