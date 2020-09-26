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
import { loadAllUsers } from '../../store/actions/userActions';
import { Notifications } from './Notifications';




export class _BoardHeader extends Component {

    async componentDidMount() {
        await this.props.loadAllUsers()
    }
    
    render() {
        
        return (
                <div className="boards-header-container" >
                    <h3>{this.props.title}</h3>
                    <div className="members-container">
                        <MemberList members={this.props.members} allUsers={this.props.allUsers}/>
                    </div>


                    <Filter onFilter={this.props.onFilter} />
                    
                    <Notifications board={this.props.board} lastUpdate={this.props.lastUpdate}/>
                    <div className="board-header-btn" onClick={() => this.props.onToggleSidebar(true)}>
                        <p>Show Menu</p>
                    </div>
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
