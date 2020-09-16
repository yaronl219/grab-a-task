import React from 'react'
import { MemberPreview } from './MemberPreview';

export function MemberList({ members }) {

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
            <div className="member-preview">+</div>
        </div>
    )
}
