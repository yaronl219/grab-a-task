import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberPreview } from './BoardHeader/MemberPreview'


export class _AddMemberModal extends Component {

 

    render() {
        const { members } = this.props
        if(!members) return <div>loading</div>
        return (
            <div className="add-member-modal">
                <button onClick={ this.props.onCloseModal } className="close-modal-btn">x</button>
                <h3>Members</h3>
                <input type="search" name="search-member" id="" />
                <div className="add-members-container">
                    {members.map(member => {
                        return <div key={member._id} className="member-container">
                            <MemberPreview name={member.fullName} /> 
                            {member.fullName}
                        </div>
                    })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        members: state.boardReducer.board.members
    };
};
const mapDispatchToProps = {

};

export const AddMemberModal = connect(mapStateToProps, mapDispatchToProps)(_AddMemberModal);