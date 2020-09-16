import React, { Component } from 'react'

export class AboutBoard extends Component {
    render() {
        const { description, createdBy, members } = this.props;
        return (
            <div className="about-board">
                <button onClick={this.props.onBackToMenu}>{'<'}</button>
                <h4>About this board</h4>
                <p>{description ? description : 'add a description...'}</p>

                <h5>Created By</h5>
                {createdBy.imgUrl
                    ? <div className='user-img-container' style={{ width: '20px' }}>
                        <img src={createdBy.imgUrl} alt={createdBy.fullName} style={{ width: '100%' }} />
                    </div>
                    : <span>{() => {
                        const names = createdBy.fullName.split(' ');
                        return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
                    }}</span>
                }
                <span>{createdBy.fullName}</span>

                <h5>Members</h5>
                <ul>
                    {members.map(member => (
                        <li key={member._id}>
                            {member.imgUrl && <div className='user-img-container' style={{ width: '20px' }}>
                                <img src={createdBy.imgUrl} alt={createdBy.fullName} style={{ width: '100%' }} />
                            </div>}
                            {member.fullName}
                        </li>))}
                </ul>
            </div>
        )
    }
}
