import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberPreview } from './BoardHeader/MemberPreview'
import { ClickAwayListener } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';


export class _AddMemberModal extends Component {

 

 
    getMembers=(id)=>{
        return this.props.members.find(member => {
            if (member._id === id) return true
            else return false
        })
    }

    render() {
        
        const { members, allExistingUsers } = this.props
        // console.log(this.props.allExistingUsers)
        
        if(!members) return <div>loading</div>
        return (
            <ClickAwayListener onClickAway={this.props.onCloseModal}>
                <div className="add-member-modal">
                    <h3>Members</h3>
                    <input type="search" name="search-member" id="" />

                    <div className="add-members-container">
                            {allExistingUsers.map(user => {
                                return <div key={user._id} className="member-container">
                                    <MemberPreview name={user.fullName} /> 
                                    <p>{user.fullName}</p>
                                    {this.getMembers(user._id) && <div><CheckIcon /></div>}
                                </div>
                            })}
                    </div>
                    
                </div>
            </ClickAwayListener>
        )
    }
}

const mapStateToProps = state => {
    return {
        members: state.boardReducer.board.members,
        allUsers: state.userReducer.users
    };
};
const mapDispatchToProps = {
    // loadAllUsers
};

export const AddMemberModal = connect(mapStateToProps, mapDispatchToProps)(_AddMemberModal);