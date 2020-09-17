
import React from 'react'

export function MemberPreview(props) {

    function getInitials(name){
        const newName = name.split(' ')
        const firstLetter = newName[0].charAt(0)
        const secondLetter = newName[1].charAt(0)
        const initials = firstLetter + secondLetter
        return initials  
    }

    

    return (
        <div className="member-preview">
            {getInitials(props.name)}
        </div>
    )
}
