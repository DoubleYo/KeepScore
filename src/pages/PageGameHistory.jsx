import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import {Trans, withTranslation} from 'react-i18next'
import {
    Avatar,
    Button,
    Checkbox,
    Dialog, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'

import {fr} from 'date-fns/locale'
import {format} from 'date-fns'

import {PAGE_PLAYERS_COUNT} from '../reducers/routing'
import {gameHistoryLoad, gameHistoryRematch, gameHistoryRemove} from '../reducers/game/actions'
import LongPress from '../components/LongPress/LongPress'
import {setAppBarActionMain} from '../reducers/appBarAction/actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        margin: `${theme.spacing(2)}px auto`
    },
})

class PageGameHistory extends PureComponent {
    constructor() {
        super()

        this.state = {
            open: false,
            checked: [],
        }
    }

    componentDidUpdate() {
        const {setAppBarActionMain} = this.props
        const {checked} = this.state
        if (checked.length > 0) {
            const DeleteButton = (
                <IconButton color="inherit" onClick={this.handleHistoryRemoveChecked.bind(this)} >
                    <DeleteIcon />
                </IconButton>
            )
            setAppBarActionMain('delete', {value: DeleteButton})
        }
    }

    handleItemPress(hash) {
        this.props.gameHistoryLoad(hash)
    }

    handleItemLongPress(hash) {
        this.setState({open: hash})
    }

    handleDialogClose() {
        this.setState({open: false})
    }

    handleHistoryRemove() {
        this.props.gameHistoryRemove(this.state.open)
        this.handleDialogClose()
    }

    handleHistoryRemoveChecked() {
        const {checked} = this.state
        console.log(checked)
        // this.props.gameHistoryRemove()
    }

    handleHistoryRematch() {
        this.props.gameHistoryRematch(this.state.open)
        this.handleDialogClose()
    }

    handleToggle(value, event) {
        event.stopPropagation()
        const {checked} = this.state
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        this.setState({
            checked: newChecked,
        })
    }

    renderGameHistory() {
        return this.props.history.map(game => {
            return this.renderGame(game)
        })
    }

    renderGame(game) {
        const primary = game.players.map((player) => player.name).join(', ')
        const secondary = format(game.updated, 'PPPp', {locale: fr})

        return (
            <ListItem key={game.hash}>
                <LongPress onPress={this.handleItemPress.bind(this, game.hash)}
                           onLongPress={this.handleItemLongPress.bind(this, game.hash)}>
                    <ListItemAvatar style={{color: 'red'}}>
                        <Avatar>{game.players.length}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={primary} secondary={secondary}/>
                </LongPress>
                <ListItemSecondaryAction>
                    <Checkbox
                        onChange={this.handleToggle.bind(this, game.hash)}
                        checked={this.state.checked.indexOf(game.hash) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>

        )
    }

    render() {
        const {classes, t} = this.props
        const {open} = this.state
        return (
            <div className={classes.root}>

                <Button variant="contained" className={classes.button}
                        component={Link} to={PAGE_PLAYERS_COUNT}>
                    <Trans i18nKey={'game.action.newGame'}/>
                </Button>

                <List>
                    {this.renderGameHistory()}
                </List>

                <Dialog open={(open !== false)} onClose={this.handleDialogClose.bind(this)}>
                    <List>
                        <ListItem button onClick={this.handleHistoryRemove.bind(this)}>
                            <ListItemText primary={t('history.action.remove')}/>
                        </ListItem>
                        <ListItem button onClick={this.handleHistoryRematch.bind(this)}>
                            <ListItemText primary={t('history.action.rematch')}/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }

}

PageGameHistory.propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
    history: PropTypes.array,
    gameHistoryLoad: PropTypes.func,
    gameHistoryRemove: PropTypes.func,
    gameHistoryRematch: PropTypes.func,
    setAppBarActionMain: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        history: state.game.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gameHistoryLoad: (hash) => dispatch(gameHistoryLoad(hash)),
        gameHistoryRemove: (hash) => dispatch(gameHistoryRemove(hash)),
        gameHistoryRematch: (hash) => dispatch(gameHistoryRematch(hash)),
        setAppBarActionMain: (key, element) => dispatch(setAppBarActionMain(key, element)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(PageGameHistory)