
import React from 'react'

export function MemberPreview(props) {

    function getInitials(name){
        if (!name) return
        const newName = name.split(' ')
        const firstLetter = newName[0].charAt(0).toUpperCase()
        const secondLetter = newName[1].charAt(0).toUpperCase()
        const initials = firstLetter + secondLetter
        return initials  
    }

    return (
        <div className="member-preview">
            {getInitials(props.name)}
        </div>
    )
}
