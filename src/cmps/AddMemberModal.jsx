import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberPreview } from './BoardHeader/MemberPreview'
import { ClickAwayListener } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { addToMembers, removeMember } from '../store/actions/boardActions';


export class _AddMemberModal extends Component {


    toggleUser=(user)=>{

        if (!this.props.members.find(member => member._id === user._id)) {
            this.props.addToMembers(user, this.props.board)
        } else this.props.removeMember(user._id, this.props.board)
    }
 
    getMembers=(id)=>{
        return this.props.members.find(member => {
            if (member._id === id) return true
            else return false
        })
    }

    render() {
        
        const { members, allExistingUsers } = this.props
        console.log('render')
        
        if(!members) return <div>loading</div>
        return (
            <ClickAwayListener onClickAway={this.props.onCloseModal}>
                <div className="add-member-modal">
                    <h3>Members</h3>
                    <input type="search" name="search-member" id="" />

                    <div className="add-members-container">
                            {allExistingUsers.map(user => {
                                return <div key={user._id} className="member-container" onClick={() => this.toggleUser(user)}>
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
        board: state.boardReducer.board,
        members: state.boardReducer.board.members,
        allUsers: state.userReducer.users
    };
};
const mapDispatchToProps = {
    // loadAllUsers
    addToMembers,
    removeMember
};
export const AddMemberModal = connect(mapStateToProps, mapDispatchToProps)(_AddMemberModal);