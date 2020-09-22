// this contains:
// Board name
// Board Members
// Filter (search)
// Link to Statistics
// Menu hamburger

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberList } from './MemberList';
import { Filter } from './Filter';
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import userService from '../../services/userService'
import { loadAllUsers } from '../../store/actions/userActions';


export class _BoardHeader extends Component {

    async componentDidMount() {
        await this.props.loadAllUsers()
    }
    
    render() {

        // console.log(this.props.allUsers)
        
        return (
                <div className="boards-header-container" >
                    <h3>{this.props.title}</h3>
                    <div className="members-container">
                    <MemberList members={this.props.members} allUsers={this.props.allUsers}/>
                    </div>
                    <Filter onFilter={this.props.onFilter} />
                    <Button onClick={() => this.props.onToggleSidebar(true)}>
                        <MenuIcon />
                    </Button>

                    <Filter onFilter={this.props.onFilter} />
                    <Button onClick={() => this.props.onToggleSidebar(true)}>
                        <MenuIcon />
                    </Button>
                </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardReducer.board,
        allUsers: state.userReducer.users
    };
};

const mapDispatchToProps = {
    loadAllUsers
};

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);
