
import { Popover, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { DatePicker } from '@material-ui/pickers'

export class CardDueDateSetter extends Component {

    state = {
        date: null,
        isPopperOpen: false,
        anchor: null
    }
    componentDidMount() {
        this.anchor = React.createRef();
        this.setState({ anchor: this.anchor })
        this.setDefaultDate()
    }

    setDefaultDate = () => {
        console.log(this.props.dueDate)
        if (!this.props.dueDate && !this.state.date) {
            this.setState({ date: Date.now() })
        } else {
            this.setState({ date: this.props.dueDate })
        }
    }
    openModal = () => {
        this.setState({ isPopperOpen: true })
    }

    closeModal = () => {
        this.setState({ isPopperOpen: false })
    }

    onSetDueDate = (ev) => {
        const formDate = ev.target.value
        const timestamp = new Date(formDate).getTime()
        this.setState({ date: timestamp },this.submitDueDate)
    }

    submitDueDate = () => {
        this.props.onUpdateDueDate(this.state.date)
    }

    parseDate = () => {
        // 2020-09-26T04:52
        const date = new Date(this.state.date)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1)
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let timeArray = [year, month, day, hour, minute]
        timeArray = timeArray.map(i => {
            i = i.toString()
            if (i.length === 1) i = `0${i}`
            return i
        })
        const parsedDate = `${year}-${timeArray[1]}-${timeArray[2]}T${timeArray[3]}:${timeArray[4]}`
        return parsedDate
    }

    render() {
        if (!this.state.anchor) return <React.Fragment />
        return (
            <div>
                <button onClick={this.openModal} ref={this.anchor}>Set Due Date</button>
                {(!this.state.anchor.current) ? <React.Fragment /> :
                    <Popover
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.isPopperOpen}
                        anchorEl={this.state.anchor.current}
                        onClose={this.closeModal}
                        onBackdropClick={this.closeModal}
                    >
                        <form noValidate>
                            <TextField
                                // onBlur={this.submitDueDate}
                                onChange={this.onSetDueDate}
                                id="datetime-local"
                                label="Set Due Date"
                                type="datetime-local"
                                value={this.parseDate()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Popover>
                }
            </div>
        )
    }
}
