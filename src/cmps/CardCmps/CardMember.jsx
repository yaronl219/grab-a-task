import { Avatar } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import React from 'react'

export function CardMember(props) {

    const splitName = props.boardMember.fullName.split(' ')
    const initials = splitName.map(name => name[0])

    let isUserChecked;
    if (!props.cardMembers || !props.cardMembers.length ) {
        isUserChecked = false
    }   else {
        isUserChecked = Boolean(props.cardMembers.find(member => member._id === props.boardMember._id))
    }
    
    return (
        <div onClick={() => {props.toggleMember(props.boardMember,!isUserChecked)}} className="board-member">
            <Avatar>{initials}</Avatar>
            <div>{props.boardMember.fullName}</div>
            {(isUserChecked) ? <CheckIcon /> : <div style={{width:'24px'}}/>}
        </div>
    )
}
