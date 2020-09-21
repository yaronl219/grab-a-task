
import { Button, Popover, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { CardPreviewDueDate } from './CardPreviewDueDate';
import ScheduleIcon from '@material-ui/icons/Schedule';

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dueDate !== this.props.dueDate) return this.setDefaultDate()
    }

    setDefaultDate = () => {
        this.setState({ date: this.props.dueDate })
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
        this.setState({ date: timestamp })
    }

    submitDueDate = () => {
        this.props.onUpdateDueDate(this.state.date)
    }

    onRemoveDueDate = (ev) => {
        this.setState({ date: null }, this.submitDueDate)
        this.closeModal()
    }

    getDisplayDateBtn = () => {
        if (!this.props.displayDate) return <Button className="set-due-date-btn" onClick={this.openModal} ref={this.anchor}><ScheduleIcon /><span>Set Due Date</span></Button>

        return (
            <div onClick={this.openModal} ref={this.anchor} className="set-due-date-expanded">
                <CardPreviewDueDate dueDate={this.state.date} displayTime={this.props.displayTime} />
            </div>
        )
    }

    parseDate = () => {
        // 2020-09-26T04:52
        let date = new Date(this.state.date)
        if (!this.state.date) date = new Date(Date.now())
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
            <div className="due-date-container">
                {this.getDisplayDateBtn()}
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
                                onBlur={this.submitDueDate}
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
                        <div className="remove-date-btn-container">
                            <button className="cancel-btn" onClick={this.onRemoveDueDate}>Remove Due Date</button>
                        </div>
                    </Popover>
                }
            </div>
        )
    }
}
