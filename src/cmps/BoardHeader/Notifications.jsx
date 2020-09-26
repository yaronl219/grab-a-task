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
        onlyNonUserAlerts: false,
        isOpen: false,
        isRinging: false,
        alerts: 0,
        newActivities: null
    }

    ref = React.createRef()

    receiveUpdate() {
        const boardActivities = this.props.board.activities
        let newActivities = []
        const lastUpdated = notificationService.getUpdated(this.props.board._id)

        // loop over the activities until you reach the last updated timestamp
        for (let i = 0; i < boardActivities.length; i++) {
            if (boardActivities[i].createdAt >= lastUpdated) {
                newActivities.push(boardActivities[i])
            } else {
                break
            }
        }

        if (this.state.onlyNonUserAlerts) {
            const loggedInUser = userService.getLoggedInUser
            newActivities = newActivities.filter(activity => activity.byMember._id === loggedInUser._id)
        }

        this.setState({ alerts: newActivities.length, newActivities})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.lastUpdate !== this.props.lastUpdate) {
            this.receiveUpdate()
        }

        if (prevProps.board._id !== this.props.board._id) {
            notificationService.onLoad(this.props.board._id)
        }

        if (prevState.alerts !== this.state.alerts) {
            // if alerts are not zero
            if (this.state.alerts) {
                this.ringBell(3000)
            }
        }
    }

    onOpen = () => {
        this.setState({ alerts: 0,isOpen:true })
        notificationService.setUpdated(this.props.board._id)
    }

    onClose = () => {
        notificationService.setUpdated(this.props.board._id)
        this.setState({isOpen:false},() => setTimeout(() => {this.setState({newActivities:null})},500) )
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
                <Badge max={9} badgeContent={this.state.alerts} color="error">
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
