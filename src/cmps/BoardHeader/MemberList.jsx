import React, { Component } from 'react'
import { MemberPreview } from './MemberPreview';
import { AddUserModal } from '../AddUserModal';
import { render } from '@testing-library/react';

export class MemberList extends Component {


    state = {
        isModalShown: false
    }

    onShowModal = () => {
        this.setState({ isModalShown: true })
    }
    
    onCloseModal = () => {        
        this.setState({ isModalShown: false })
    }


    
    render(){
        const { members } = this.props
        if (!members) return <h4>loading</h4>

        return (
            <div className="members-container">
                {
                    members.map(member => {
                        return <MemberPreview key={member._id}
                            name={member.fullName} 
                            img={member.imgUrl}/>
                })
                }
                <div className="member-preview" onClick={ () => this.onShowModal() }
                >+</div>
                {this.state.isModalShown && <AddUserModal onCloseModal={ this.onCloseModal }/>}
            </div>
        )
    }
}
