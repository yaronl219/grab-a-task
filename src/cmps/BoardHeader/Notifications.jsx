import React, { Component } from 'react'
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { Badge, IconButton, Popover } from '@material-ui/core';
import { notificationService } from '../../services/notificationService';
import userService from '../../services/userService';
import { ActivityLog } from '../Sidebar/ActivityLog';
import { CloseOutlined } from '@material-ui/icons';

export class Notifications extends Component {

    state = {

        isOpen: false,
        isRinging: false,
        newActivities: []
    }

    ref = React.createRef()

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.lastUpdate !== this.props.lastUpdate) {
            this.receiveUpdate()
        }

        if (prevProps.board._id !== this.props.board._id) {
            notificationService.onLoad(this.props.board._id)
        }

        if (prevState.newActivities.length !== this.state.newActivities.length) {
            // if new activities are not zero
            if (this.state.newActivities.length) {
                this.ringBell(3000)
            }
        }

    }


    receiveUpdate() {
        const { activities } = this.props.board
        const newActivities = []
        const lastCheckedNotificationsAt = notificationService.getUpdated(this.props.board._id)
        const loggedInUser = userService.getLoggedInUser()

        // Since this array is sorted by descending timestamps we can
        // loop over the activities until you reach the last updated timestamp
        for (let i = 0; i < activities.length; i++) {
            // once you reach the relevant timetamp - break out of the loop
            if (activities[i].createdAt <= lastCheckedNotificationsAt) break
            const isByAnotherUser = (activities[i].byMember._id !== loggedInUser._id)
            if (isByAnotherUser) newActivities.push(activities[i])
        }

        this.setState({ newActivities })
    }


    onOpen = () => {
        this.setState({ isOpen: true })
        notificationService.setUpdated(this.props.board._id)
    }

    onClose = () => {
        notificationService.setUpdated(this.props.board._id)
        this.setState({ isOpen: false,newActivities:[] })
    }

    ringBell(ms = 1500) {
        this.setState({ isRinging: true })
        setTimeout(() => { this.setState({ isRinging: false }) }, ms)
    }

    getIsRinging = () => {
        if (this.state.isRinging) return (<div className="bell">
            <NotificationsActiveOutlinedIcon />
        </div>)
        return (<div className="silent-bell">
            <NotificationsNoneOutlinedIcon />
        </div>)
    }

    getNotificationPreview() {

        if (!this.state.newActivities || !this.state.newActivities.length) return (<div className="notifications-empty-state-container">
            You're all caught up!
        </div>)

        return <div className="activity-log-container"><ActivityLog activities={this.state.newActivities} boardId={this.props.board._id} /></div>

    }

    render() {
        return (
            <React.Fragment>
                <div ref={this.ref} onClick={this.onOpen} className="notification board-header-btn">
                    <Badge max={9} badgeContent={(this.state.isOpen || !this.state.newActivities) ? 0 : this.state.newActivities.length} color="error">
                        {this.getIsRinging()}
                    </Badge>
                    {/* {(this.state.isOpen) ? <ActivityLog activities={this.state.newActivities} boardId={this.props.board._id} /> : <React.Fragment />} */}
                </div>
                <Popover
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.isOpen}
                    anchorEl={this.ref.current}
                    onClose={this.onClose}
                    onBackdropClick={this.onClose}
                >
                    <div className="notification-preview">
                        <div className="notification-preview-header">
                            <div></div>
                            <div><h6>Notifications</h6></div>
                            <IconButton onClick={this.onClose}>
                                <CloseOutlined />
                            </IconButton>
                        </div>
                        {this.getNotificationPreview()}
                    </div>
                </Popover>
            </React.Fragment>
        )
    }
}
