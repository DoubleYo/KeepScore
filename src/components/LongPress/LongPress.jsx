import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'


class LongPress extends PureComponent {
    static defaultProps = {
        delay: 1000,
        moveTolerance: 100,
        rightClickAsLongPress: true,
    }

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        delay: PropTypes.number,
        moveTolerance: PropTypes.number,
        rightClickAsLongPress: PropTypes.bool,
    }

    constructor() {
        super()

        this.position = null
        this.timeoutId = null
        this.isLongPressTriggered = false
        this.isMoveToleranceExceed = false

        this.handlePointerDown = this.handlePointerDown.bind(this)
        this.handlePointerUp = this.handlePointerUp.bind(this)
        this.handlePointerMove = this.handlePointerMove.bind(this)
        this.handlePointerLeave = this.handlePointerLeave.bind(this)
        this.handleContextMenu = this.handleContextMenu.bind(this)
    }

    onLongPress() {
        const {onLongPress} = this.props
        if (onLongPress !== null) {
            this.isLongPressTriggered = true
            onLongPress()
        }
    }

    onPress() {
        const {onPress} = this.props
        if (onPress !== null &&
            this.isLongPressTriggered === false &&
            this.isMoveToleranceExceed === false) {
            onPress()
        }
    }

    handlePointerDown(event) {
        const {delay} = this.props
        this.position = {x: event.clientX, y: event.clientY}
        this.isLongPressTriggered = false
        this.isMoveToleranceExceed = false

        this.timeoutId = window.setTimeout(this.onLongPress.bind(this), delay)
    }

    handlePointerUp(event) {
        const {rightClickAsLongPress} = this.props
        if (event.button === 0) {
            this.clearTimeout()
            this.onPress()
        } else if (rightClickAsLongPress && event.button === 2) {
            this.onLongPress()
        }
    }

    handlePointerMove(event) {
        if (this.position !== null) {
            const {moveTolerance} = this.props
            const deltaX = Math.abs(this.position.x - event.clientX)
            const deltaY = Math.abs(this.position.y - event.clientY)

            if (deltaX >= moveTolerance || deltaY >= moveTolerance) {
                this.isMoveToleranceExceed = true
                this.clearTimeout()
            }
        }
    }

    handlePointerLeave(event) {
        this.clearTimeout()
    }

    handleContextMenu(event) {
        event.preventDefault()
    }

    clearTimeout() {
        if (this.timeoutId !== null) {
            window.clearTimeout(this.timeoutId)
        }
    }

    renderNode(child, index) {
        const key = child.key || index
        return React.cloneElement(child, {
            key, style: {...child.props.style, userSelect: 'none'},
            onPointerDown: this.handlePointerDown,
            onPointerUp: this.handlePointerUp,
            onPointerMove: this.handlePointerMove,
            onPointerLeave: this.handlePointerLeave,
            onContextMenu: this.handleContextMenu,
        })
    }

    render() {
        const {children} = this.props
        if (Array.isArray(children)) {
            return children.map(this.renderNode.bind(this))
        }
        return this.renderNode(children, 1)
    }
}

export default LongPress
