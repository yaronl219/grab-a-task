import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views';
import userService from '../../services/userService';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import { UserDetails } from './UserDetails';
import { UserActivities } from './UserActivities';
import { UserCards } from './UserCards';
import { withRouter } from 'react-router';



class _Users extends Component {

    state = {
        view: 0,
        loggedInUser: null,
        userData: null,
        activities: null
    }


    async componentDidMount() {
        console.log(this)
        const loggedInUser = await userService.getLoggedInUser()
        this.setState({loggedInUser}, async() => {
            const userDeatils = await userService.getUserDetails()
            this.setState({userData:userDeatils.userData,activities:userDeatils.userActivities})
        })
    }
    
    setView = (idx) => {
        const view = Math.round(idx)
        this.setState({view})
    }

    render() {
        return (
            <div className="users-container">
                <BottomNavigation
                    className="home-nav"
                    value={this.state.view}
                    onChange={(event, newValue) => {
                        this.setView(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Details" icon={<PermIdentityOutlinedIcon />} />
                    <BottomNavigationAction label="Cards" icon={<ViewAgendaOutlinedIcon />} />
                    <BottomNavigationAction label="Activities" icon={<FormatListBulletedOutlinedIcon />} />
                </BottomNavigation>
                <SwipeableViews onSwitching={this.setView} index={this.state.view} containerStyle={{ height: '100vh' }}>
                    <UserDetails loggedInUser={this.state.loggedInUser} />
                    <UserCards onCloseUserDetails={this.props.onCloseUserDetails} history={this.props.history} userData={this.state.userData}/>
                    <UserActivities activities={this.state.activities} />
                </SwipeableViews>
            
            </div>
        )
    }
}

export const Users = withRouter(_Users)